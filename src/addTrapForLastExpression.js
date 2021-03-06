const ivm = require("isolated-vm");
const fs = require("fs");
const cherowScriptContent = fs.readFileSync(
  __dirname + "/generated/cherow.iife.js",
  { encoding: "UTF8" }
);

function parseCodeAndModify() {
  const ast = cherow.parse(originalCode, { ranges: true, experimental: true });
  const lastNode = ast.body[ast.body.length - 1];
  const lastNodeCode = originalCode.slice(lastNode.start);

  let isLastNodeIsExpression = lastNode.type === "ExpressionStatement";
  if (
    !isLastNodeIsExpression &&
    ast.body.length === 1 &&
    lastNode.type === "BlockStatement"
  ) {
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

module.exports = async function addTrap(isolate, context, script) {
  const cherowScript = await isolate.compileScript(cherowScriptContent);
  await cherowScript.run(context);

  const externalCopyUserContent = new ivm.ExternalCopy(script);
  await context.global.set("originalCode", externalCopyUserContent.copyInto());

  const processUserContentScript = await isolate.compileScript(
    "" + parseCodeAndModify + ";parseCodeAndModify()"
  );

  try {
    const result = await processUserContentScript.run(context);
    return result || script;
  } catch (error) {
    // return null;
    return Promise.reject(error);
  }
};
