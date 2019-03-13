const ivm = require("isolated-vm");
const preprocessUserScript = require("./addTrapForLastExpression");

function test(code, expected) {
  const isolate = new ivm.Isolate({ memoryLimit: 8 });
  const context = isolate.createContextSync();

  preprocessUserScript(isolate, context, code).then(result => {
    if (result !== expected) {
      console.log("Expteced", expected, "got:", result);
      throw new Error(result + "!==" + expected);
    }
  });
}

Promise.all([
  test("if(1){}", "if(1){}"),
  test("a;if(1){};;a", "a;if(1){};;;this.JS_BOT_LAST_EXPRESSION_RESULT=a"),
  test("1", ";this.JS_BOT_LAST_EXPRESSION_RESULT=1"),
  test("{}", ";this.JS_BOT_LAST_EXPRESSION_RESULT={}")
]).then(() => {
  console.log("Success:", "transforms");
});

{
  const isolate = new ivm.Isolate({ memoryLimit: 8 });
  const context = isolate.createContextSync();

  preprocessUserScript(isolate, context, "asda=")
    .then(() => {
      console.log("Failed:", "should not resolve on invalid code");
    })
    .catch(error => {
      console.log("Success:", "crash on invalid code");
    });
}
