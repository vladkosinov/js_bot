const { exec } = require("./exec");

async function testCompilatrionError(code) {
  const result = await exec(code);
  if (!result.compilationError) {
    throw result;
  }
}

// const compilationErrorCode = ["/", "/asd", "=-1", "fil-+"];
// const compilationErrors = Promise.all(
//   compilationErrorCode.map(testCompilatrionError)
// )
//   .then(() => {
//     console.log("Suite [compileErrors] success: compilation error catched");
//   })
//   .catch(error => {
//     console.error(
//       "Suite [compileErrors] failed: expected compilation error",
//       error
//     );
//   });

async function testSuccessRun([code, expectedResult]) {
  const result = await exec(code);
  result._originalCode = code;

  if (result.lastResult !== expectedResult) {
    const errorMessage =
      "result.lastResult !== expectedResult " +
      JSON.stringify(result.lastResult) +
      " !== " +
      JSON.stringify(expectedResult);
    console.log("result", result);
    throw new Error(errorMessage);
  }

  return result.lastResult;
}

const validCode = [
  // ["123", 123],
  // ["asd", "undefined"]
  ["{}", "{}"]
  // ["a=2", 2]
];
Promise.all(validCode.map(testSuccessRun))
  .then(() => {
    console.log("Suite [validCode] success");
  })
  .catch(error => {
    console.error("Suite [validCode] failed:", error);
  });
