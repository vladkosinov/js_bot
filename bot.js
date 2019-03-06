const Telegraf = require("telegraf");
const SocksProxyAgent = require("./socks-proxy-agent");
let ivm = require("isolated-vm");

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
const options = {
  telegram: {
    agent: new SocksProxyAgent("socks://deleted:deleted@before.publish/")
  }
};

const bot = new Telegraf("DELETED_BEFORE_PUBLISH");

bot.start(ctx => ctx.reply("Send me JS and I'll execute it😎"));

bot.on("text", async function(ctx) {
  let isolate = new ivm.Isolate({ memoryLimit: 32 });
  let context = await isolate.createContext();

  // Get a Reference{} to the global object within the context.
  let jail = context.global;
  await jail.set("_ivm", ivm);
  await jail.set("global", jail.derefInto());
  await jail.set(
    "_log",
    new ivm.Reference(function(...args) {
      ctx.reply(args.join(", "));
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

  await bootstrapScript.run(context, {
    timeout: 2000
  });

  let userScript;
  try {
    console.log(ctx.message, "message", ctx.message.text);
    userScript = await isolate.compileScript("" + ctx.message.text);
  } catch (error) {
    console.log(ctx.message, "compilation error", error.message);
    ctx.reply(error.message.replace(/\ \[\<isolated-vm.*/, ""));
    return;
  }

  try {
    const userScriptResult = await userScript.run(context);
    ctx.reply(userScriptResult);
  } catch (error) {
    console.log(ctx.message, "runtime error", error.message);
    ctx.reply(error.message.replace(/\ \[\<isolated-vm.*/, ""));
  }
});

bot.launch();
