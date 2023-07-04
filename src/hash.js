import { showCurDir } from "./base-functions.js";
import crypto from "crypto";
import { promises as fsProm } from "fs";
import fs from "fs";

export const printHash = async (pathToHash) => {
  if (!pathToHash) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }
  if (!fs.existsSync(pathToHash)) {
    process.stdout.write("\nFS operation failed\n\n");
    return;
  }

  try {
    const data = await fsProm.readFile(pathToHash, { encoding: "utf-8" });
    const hash = crypto.createHash("sha256");
    hash.update(data);
    const hashHex = hash.digest("hex");
    console.log("\n" + hashHex);
  } catch (err) {
    console.log(err);
  }
  showCurDir();
};
