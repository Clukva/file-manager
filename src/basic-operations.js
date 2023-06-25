import fs from "fs";
const { promises: fsProm } = fs;
import { basePath } from "./base-functions.js";

export const cat = async (path) => {
  if (!path) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }
  const pathToFile = basePath.path + "\\" + path;

  try {
    const content = await fsProm.readFile(pathToFile, "utf-8");
    console.log("\n" + content + "\n");
  } catch (err) {
    process.stdout.write(`\nFS operation failed\n\n`);
  }
};
