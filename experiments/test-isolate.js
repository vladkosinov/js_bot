const ivm = require("isolated-vm");
const isolate = new ivm.Isolate({ memoryLimit: 8 });
const context = isolate.createContextSync();

const scriptContent = "(function(factory) {})(function() {;this.x = asd})";

userScript = isolate.compileScriptSync(scriptContent, {
  filename: "message.js"
});

userScript.runSync(context, {
  timeout: 1000
});
