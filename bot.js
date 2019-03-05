const Telegraf = require("telegraf");
const SocksProxyAgent = require("./socks-proxy-agent");
let ivm = require("isolated-vm");

const bot = new Telegraf("DELETED_BEFORE_PUBLISH", {
  telegram: {
    agent: new SocksProxyAgent("socks://deleted:deleted@before.publish/")
  }
});

bot.start(ctx => ctx.reply("Send me JS and I'll execute it😎"));

bot.on("text", async function(ctx) {
  let isolate = new ivm.Isolate({ memoryLimit: 32 });
  let context = isolate.createContextSync();

  // Get a Reference{} to the global object within the context.
  let jail = context.global;
  jail.setSync("_ivm", ivm);
  jail.setSync("global", jail.derefInto());
  jail.setSync(
    "_log",
    new ivm.Reference(function(...args) {
      console.log(...args);
      ctx.reply(args[0]);
    })
  );

  const bootstrapScript = await isolate.compileScript(
    "new " +
      function() {
        // Grab a reference to the ivm module and delete it from global scope. Now this closure is the
        // only place in the context with a reference to the module. The `ivm` module is very powerful
        // so you should not put it in the hands of untrusted code.
        let ivm = _ivm;
        delete _ivm;

        // Now we create the other half of the `log` function in this isolate. We'll just take every
        // argument, create an external copy of it and pass it along to the log function above.
        let log = _log;
        delete _log;
        global.console = {
          log: function(...args) {
            // We use `copyInto()` here so that on the other side we don't have to call `copy()`. It
            // doesn't make a difference who requests the copy, the result is the same.
            // `applyIgnored` calls `log` asynchronously but doesn't return a promise-- it ignores the
            // return value or thrown exception from `log`.
            log.applyIgnored(
              undefined,
              args.map(arg => new ivm.ExternalCopy(arg).copyInto())
            );
          }
        };
      }
  );

  await bootstrapScript.run(context);

  let userScript;
  try {
    console.log("User message", ctx.message.text);
    userScript = await isolate.compileScript("" + ctx.message.text);
  } catch (error) {
    console.log("Compilation error", error.message);
    ctx.reply(error.message);
    return;
  }

  try {
    const userScriptResult = await userScript.run(context);
    ctx.reply(userScriptResult);
  } catch (error) {
    console.log("Runtime error", error.message);
    ctx.reply(error.message);
  }
});

bot.launch();
