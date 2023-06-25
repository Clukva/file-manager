import * as baseFunctions from "./base-functions.js";
import * as basicOperations from "./basic-operations.js";
import * as systemOperations from "./system-operations.js";
import * as nwd from "./nwd.js";
import * as zip from "./zip.js";
import { printHash } from "./hash.js";

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
      nwd.up(inputCom[1]);
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
    case `add`:
      basicOperations.add(inputCom[1]);
      break;
    case `rn`:
      basicOperations.rn(inputCom[1], inputCom[2]);
      break;
    case `rm`:
      basicOperations.rm(inputCom[1]);
      break;
    case `cp`:
      basicOperations.cp(inputCom[1], inputCom[2]);
      break;
    case `mv`:
      basicOperations.mv(inputCom[1], inputCom[2]);
      break;
    case `os`:
      systemOperations.osInf(inputCom[1]);
      break;
    case `hash`:
      printHash(inputCom[1]);
      break;
    case `compress`:
      zip.compress(inputCom[1]);
      break;
    case `decompress`:
      zip.decompress(inputCom[1]);
      break;
    default:
      process.stdout.write("\nInvalid input\n\n");
  }
});
