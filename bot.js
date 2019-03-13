const Telegraf = require("telegraf");
const { exec } = require("./exec");

const bot = new Telegraf("DELETED_BEFORE_PUBLISH");

bot.start(ctx => ctx.reply("Send me JS and I'll execute it😎"));

bot.catch(err => {
  console.log("Ooops", err);
});

function filterOutput(message = "") {
  return message.replace(/isolated\-vm/g, "vm");
}

function extractHumanOutputFromExecResult(execResult) {
  const {
    lastResult,
    output,
    errorMessage,
    errorStack,
    executionError,
    compilationError
  } = execResult;

  if (compilationError) {
    return compilationError.message;
  }
  if (executionError) {
    return String("Uncaught: " + error.message || error);
  }
  if (errorMessage) {
    return `${output || ""}${errorStack || errorMessage}`;
  }

  return `${output || ""}${lastResult}`;
}

function logRunCodeResult(execResult) {
  const {
    lastResult,
    errorMessage,
    errorStack,
    executionError,
    compilationError
  } = execResult;

  if (compilationError) {
    console.log("Compilation Error", ctx.message, error);
    return;
  }
  if (executionError) {
    console.log("Execution Error", ctx.message, error);
  }
  if (errorMessage) {
    console.log(
      "Completed with exception",
      ctx.message,
      errorMessage,
      errorStack
    );
  }
}

bot.on("text", async function(ctx) {
  console.log("Message", ctx.message);

  const inputCode = ctx.message.text;
  const execResult = await exec(inputCode);
  logRunCodeResult(ctx, execResult);
  const replyMessage = extractHumanOutputFromExecResult(execResult);

  ctx.reply(filterOutput(replyMessage));
});

bot.launch();
