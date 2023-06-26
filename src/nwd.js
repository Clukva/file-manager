import * as baseFunctions from "./base-functions.js";
import { stat, readdirSync, existsSync } from "fs";
import path from "path";

export const up = (pathArg) => {
  let pathUp = baseFunctions.basePath.path.toString();
  if (pathArg) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  } else if (pathUp.includes(`\\`)) {
    baseFunctions.basePath.path = pathUp.slice(0, pathUp.lastIndexOf(`\\`));
    if (baseFunctions.basePath.path.length === 2) {
      baseFunctions.basePath.path += "\\";
    }
  }

  baseFunctions.showCurDir();
};

export const cd = (pathArg) => {
  if (!pathArg || pathArg.startsWith(".")) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  } else if (pathArg.includes(`\\`)) {
    stat(pathArg, (err) => {
      if (!err) {
        baseFunctions.basePath.path = pathArg;
        baseFunctions.showCurDir();
      } else if (err.code === "ENOENT") {
        process.stdout.write(`\nInvalid input\n\n`);
      }
    });
  } else if (
    pathArg === "C:" ||
    pathArg === "D:" ||
    pathArg === "c:" ||
    pathArg === "d:"
  ) {
    baseFunctions.basePath.path = path.join(pathArg + "\\");
    baseFunctions.showCurDir();
  } else if (!pathArg.includes(`\\`)) {
    let newPath = "";
    if (baseFunctions.basePath.path.length === 3) {
      newPath = path.join(baseFunctions.basePath.path + pathArg);
    } else {
      newPath = path.join(baseFunctions.basePath.path + "\\" + pathArg);
    }

    stat(newPath, (err) => {
      if (!err) {
        baseFunctions.basePath.path = newPath;
        baseFunctions.showCurDir();
      } else if (err.code === "ENOENT") {
        process.stdout.write(`\nInvalid input\n\n`);
      }
    });
  }
};

export const ls = async () => {
  const sourceFrom = baseFunctions.basePath.path;

  if (!existsSync(sourceFrom)) {
    throw new Error("FS operation failed");
  }

  const files = readdirSync(sourceFrom, { withFileTypes: true });
  let arrFiles = [];

  files.forEach((fileChunk) => {
    arrFiles.push({
      Name: fileChunk.name,
      Type: fileChunk.isFile() ? "file" : "directory",
    });
  });
  let arrFile = arrFiles
    .filter((a) => a.Type === "file")
    .sort((a, b) => {
      a.Type.localeCompare(b.Type, "en", { numeric: true });
    });
  let arrFolder = arrFiles
    .filter((a) => a.Type === "directory")
    .sort((a, b) => {
      a.Type.localeCompare(b.Type, "en", { numeric: true });
    });

  console.table([...arrFolder, ...arrFile]);
  baseFunctions.showCurDir();
};
