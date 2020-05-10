(function(messageFunction) {
  const ivm = _ivm;
  const handleIsolateResult = _handleIsolateResult;
  const handleIsolateException = _handleIsolateException;
  delete _ivm;
  delete _handleIsolateResult;
  delete _handleIsolateException;

  let output = "";
  global.console = {
    log: function(...args) {
      if (output.length === 4096) {
        return;
      }

      try {
        output +=
          args.map(message => JSON.stringify(message, null, 2)).join("\n") +
          "\n";
      } catch (error) {
        output += args.join(", ") + "\n";
      }

      if (output.length > 4096) {
        output = output.slice(0, 4096 - 3) + "...";
      }
    }
  };

  class MessageContext {}
  const messageContext = new MessageContext();
  let messageFunctionReturn;

  try {
    messageFunctionReturn = messageFunction.call(messageContext);
  } catch (error) {
    return handleIsolateException.applySync(undefined, [
      new ivm.ExternalCopy(output).copyInto(),
      new ivm.ExternalCopy(
        (error && error.message) || "Uncaught: " + error
      ).copyInto(),
      new ivm.ExternalCopy(error && error.stack).copyInto()
    ]);
  }

  const messageFunctionLastExpression =
    messageContext.JS_BOT_LAST_EXPRESSION_RESULT;

  const runtimeResult = messageFunctionReturn || messageFunctionLastExpression;

  handleIsolateResult.applySync(undefined, [
    new ivm.ExternalCopy(output).copyInto(),
    new ivm.ExternalCopy(runtimeResult).copyInto()
  ]);
})(function root() {
  // USER_CODE
});
