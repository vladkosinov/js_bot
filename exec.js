const ivm = require("isolated-vm");
const fs = require("fs");
const addTrapForLastExpression = require("./addTrapForLastExpression");

const runtimeTemplate = fs.readFileSync(__dirname + "/runtimeTemplate.js", {
  encoding: "UTF8"
});

async function execInRuntime(isolate, context, inputCode) {
  const scriptContent = runtimeTemplate.replace("// USER_CODE", inputCode);

  console.log("scriptContent", scriptContent);
  let userScript;
  try {
    userScript = await isolate.compileScript(scriptContent, {
      filename: "message.js"
    });
  } catch (error) {
    return {
      compilationError: error
    };
  }

  let output;
  let lastResult;
  let errorMessage;
  let errorStack;

  function handleIsolateResult(scriptOutput, scriptLastResult) {
    output = scriptOutput;
    lastResult = scriptLastResult;
  }

  function handleIsolateException(
    scriptOutput,
    scriptErrorMessage,
    scriptErrorStack
  ) {
    output = scriptOutput;
    errorMessage = scriptErrorMessage;
    errorStack = scriptErrorStack;
  }

  const global = context.global;
  global.setSync("global", global.derefInto());
  global.setSync("_ivm", ivm);
  global.setSync(
    "_handleIsolateResult",
    new ivm.Reference(handleIsolateResult)
  );
  global.setSync(
    "_handleIsolateException",
    new ivm.Reference(handleIsolateException)
  );

  try {
    await userScript.run(context, {
      timeout: 1000
    });
  } catch (error) {
    return {
      executionError: error
    };
  }

  return {
    output,
    lastResult,
    errorMessage,
    errorStack,
    executionError: false,
    compilationError: false
  };
}

async function prepareAndExec(inputCode) {
  const isolate = new ivm.Isolate({ memoryLimit: 8 });

  let inputCodeWithTrap = inputCode;

  try {
    const context = await isolate.createContext();
    inputCodeWithTrap = await addTrapForLastExpression(
      isolate,
      context,
      inputCode
    );
  } catch (error) {
    // console.log("addTrapForLastExpression error", error);
    // ignore transformation error
    // because I want to show original v8 error message to user
  }

  const context = await isolate.createContext();
  return execInRuntime(isolate, context, inputCodeWithTrap);
}

module.exports.execInRuntime = execInRuntime;
module.exports.exec = prepareAndExec;
