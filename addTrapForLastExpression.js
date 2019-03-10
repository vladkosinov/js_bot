const ivm = require("isolated-vm");
const fs = require("fs");
const cherowScriptContent = fs.readFileSync(
  __dirname + "/generated/cherow.iife.js",
  { encoding: "UTF8" }
);

function parseCodeAndModify() {
  const ast = cherow.parse(originalCode, { ranges: true });
  const lastNode = ast.body[ast.body.length - 1];
  const lastNodeCode = originalCode.slice(lastNode.start);

  let isLastNodeIsExpression = lastNode.type === "ExpressionStatement";
  if (!isLastNodeIsExpression && lastNode.type === "BlockStatement") {
    try {
      cherow.parseExpression(lastNodeCode);
      isLastNodeIsExpression = true;
    } catch (error) {
      return null;
    }
  }
  if (!isLastNodeIsExpression) {
    return null;
  }

  const preExpressionCode = originalCode.slice(0, lastNode.start);
  const modifiedLastExpression =
    ";this.JS_BOT_LAST_EXPRESSION_RESULT=" + lastNodeCode;
  return preExpressionCode + modifiedLastExpression;
}

module.exports = async function preprocessUserScript(userScriptContent) {
  const isolate = new ivm.Isolate({ memoryLimit: 8 });
  const context = await isolate.createContext();

  const cherowScript = await isolate.compileScript(cherowScriptContent);
  await cherowScript.run(context);

  const externalCopyUserContent = new ivm.ExternalCopy(userScriptContent);
  await context.global.set("originalCode", externalCopyUserContent.copyInto());

  const processUserContentScript = await isolate.compileScript(
    "" + parseCodeAndModify + ";parseCodeAndModify()"
  );

  const result = await processUserContentScript.run(context);
  return result || userScriptContent;
};
