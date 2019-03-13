const cherow = require("/Users/user/cherow/dist/cherow.cjs.js");
const originalCode = `asd`;

const ast = cherow.parse(originalCode, {
  ranges: true
});
// const lastRange = ast.body[ast.body.length - 1];
// const { start, end } = lastRange;
// originalCode.slice(0, 46) + ";evaluated=" + originalCode.slice(46);
debugger;
