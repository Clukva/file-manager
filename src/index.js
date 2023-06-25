import * as baseFunctions from "./base-functions.js";
import * as basicOperations from "./basic-operations.js";
import * as nwd from "./nwd.js";

baseFunctions.startManager();

process.on("SIGINT", () => {
  baseFunctions.exit();
});

process.stdin.on("data", async (data) => {
  const str = data.toString().trim().split(" ");
  const inputCom = [...str];

  switch (inputCom[0]) {
    case ".exit":
      baseFunctions.exit();
      break;
    case "up":
      nwd.up();
      break;
    case `cd`:
      nwd.cd(inputCom[1]);
      break;
    case `ls`:
      nwd.ls();
      break;
    case `cat`:
      basicOperations.cat(inputCom[1]);
      break;
    default:
      process.stdout.write("\nInvalid input\n\n");
  }
});
