const Telegraf = require("telegraf");
const { exec } = require("./exec");

const bot = new Telegraf(process.env.BOT_TOKEN);

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

async function execCode(inputCode, ctx) {
  const execResult = await exec(inputCode);
  console.log("execResult", execResult);
  logRunCodeResult(ctx, execResult);

  const replyMessage = extractHumanOutputFromExecResult(execResult);
  const filteredOutput = filterOutput(replyMessage);

  return filteredOutput;   
}

bot.on("text", async function(ctx) {
  const inputCode = ctx.message.text;

  const result = await execCode(inputCode, ctx);
  console.log("result", result);

  ctx.reply(result);
});

bot.on('inline_query', async (ctx) => {
  const resultCode = await execCode(ctx.update.inline_query.query, ctx);

  const code = ctx.update.inline_query.query;
  const result = [{
    type: "article",
    id: ctx.update.inline_query.query.slice(0,64) || "/0",
    title: "> " +  code,
    description: "< " + resultCode,
    input_message_content: {
      message_text: `<b>&gt;</b> <pre><code class="language-javascript">${code}</code></pre>\n<b>&lt;</b> <pre><code class="language-javascript">${resultCode}</code></pre>`,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    },
    reply_markup: {
      inline_keyboard: [
        [
          // {text: 'Edit', switch_inline_query_current_chat: code}
        ]
      ]
    }
  }]

  ctx.answerInlineQuery(result)
})

bot.launch();
