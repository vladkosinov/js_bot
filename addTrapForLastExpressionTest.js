const assert = require("assert");
const preprocessUserScript = require("./addTrapForLastExpression");

// crash on invalid code
const promise0 = preprocessUserScript("asda=").catch(error => {
  // ok
});

// not modified
const promise1 = preprocessUserScript("if(1){}").then(result => {
  assert(result === "if(1){}");
});

// custom code added corrected
const promise2 = preprocessUserScript("a;if(1){};;a").then(result => {
  assert(result === "a;if(1){};;;this.JS_BOT_LAST_EXPRESSION_RESULT=a");
});

const promise3 = preprocessUserScript("1").then(result => {
  assert(result === ";this.JS_BOT_LAST_EXPRESSION_RESULT=1");
});

const promise4 = preprocessUserScript("{}").then(result => {
  assert(result === ";this.JS_BOT_LAST_EXPRESSION_RESULT={}");
});

Promise.all([promise0, promise1, promise2, promise3, promise4]).then(() => {
  console.log("pass");
});
