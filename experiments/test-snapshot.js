const ivm = require("isolated-vm");
const fs = require("fs");
const cherowScriptContent = fs.readFileSync(
  // __dirname + "/node_modules/cherow/dist/umd/cherow.js",
  // __dirname + "/bundle.js",
  "/Users/user/projects/workspace/cherow/dist/cherow.iife.js",
  { encoding: "UTF8" }
);

const cherowSnapshot = ivm.Isolate.createSnapshot([
  { code: cherowScriptContent }
]);
