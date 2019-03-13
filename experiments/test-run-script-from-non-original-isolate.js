const ivm = require("isolated-vm");

async function main() {
  const isolateWhoCreatedScript = new ivm.Isolate({ memoryLimit: 8 });
  const originalScript = await isolateWhoCreatedScript.compileScript("557");

  const isolate1 = new ivm.Isolate({ memoryLimit: 8 });
  const context1 = await isolate1.createContext();

  try {
    await originalScript.run(context1);
  } catch (error) {
    if (error.message === "Invalid context") {
      console.log("pass");
      return;
    } else {
      console.log("failed", error);
    }
  }

  console.log("failed");
}

main();
