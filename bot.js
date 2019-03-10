const Telegraf = require("telegraf");
const ivm = require("isolated-vm");
const addTrapForLastExpression = require("./addTrapForLastExpression");

const bot = new Telegraf("DELETED_BEFORE_PUBLISH");

bot.start(ctx => ctx.reply("Send me JS and I'll execute it😎"));

bot.catch(err => {
  console.log("Ooops", err);
});

function filterOutput(message = "") {
  return message.replace(/isolated\-vm/g, "vm");
}

bot.on("text", async function(ctx) {
  console.log("Message", ctx.message);

  let userCodeToExecute;
  try {
    userCodeToExecute = await addTrapForLastExpression("" + ctx.message.text);
  } catch (error) {
    console.log("addTrapForLastExpression error", ctx.message, error);
    ctx.reply(filterOutput(error.message));
    return;
  }

  let isolate = new ivm.Isolate({ memoryLimit: 8 });
  let context = await isolate.createContext();

  let global = context.global;
  global.setSync("_ivm", ivm);
  global.setSync("global", global.derefInto());

  const userScriptWrapped = `
    (function (messageFunction) {
      const ivm = _ivm;
      const handleIsolateResult = _handleIsolateResult;
      const handleIsolateException = _handleIsolateException;
      delete _ivm;
      delete _handleIsolateResult;
      delete _handleIsolateException;

      let output = "";
      global.console = {
        log: function(...args) {
          if (output.length === 4096) {
            return;
          }

          const message = args.join(", ");
          const messageLength = message.length;
          output += message + "\\n";

          if (output.length > 4096) {
            output = output.slice(0, 4096 - 3) + "...";
          }
        }
      };

      class MessageContext {};
      const messageContext = new MessageContext();
      try {
        messageFunction.call(messageContext);
      } catch(error) {
        return handleIsolateException.applySync(
          undefined,
          [
            new ivm.ExternalCopy(output).copyInto(),
            new ivm.ExternalCopy((error && error.message) || "Error: " + error).copyInto(),
            new ivm.ExternalCopy((error && error.stack)).copyInto(),
          ],
        );
      }

      const messageFunctionLastExpression = messageContext.JS_BOT_LAST_EXPRESSION_RESULT;

      handleIsolateResult.applySync(
        undefined,
        [
          new ivm.ExternalCopy(output).copyInto(),
          new ivm.ExternalCopy(messageFunctionLastExpression).copyInto(),
        ],
      );
    }(function root () {
      'use strict';
      ${userCodeToExecute}
    }));
    `;

  let userScript;
  try {
    userScript = await isolate.compileScript(userScriptWrapped, {
      filename: "message.js"
    });
  } catch (error) {
    console.log("isolate.compileScript error", ctx.message, error.message);
    ctx.reply(filterOutput(error.message));
    return;
  }

  try {
    await global.set(
      "_handleIsolateResult",
      new ivm.Reference((output, lastResult) => {
        const message = `${output || ""}${lastResult}`;
        console.log("Reply success", ctx.message, message);
        ctx.reply(filterOutput(message));
      })
    );

    await global.set(
      "_handleIsolateException",
      new ivm.Reference((output, errorMessage, errorStack) => {
        const message = `${output || ""}${errorStack || errorMessage}`;
        console.log("Reply exception", ctx.message, message);
        ctx.reply(filterOutput(message));
      })
    );

    await userScript.run(context, {
      timeout: 1000
    });
  } catch (error) {
    console.log("userScript.run error", ctx.message, error);
    ctx.reply(filterOutput(String(error)));
  }
});

bot.launch();
