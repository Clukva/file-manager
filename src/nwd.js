import * as baseFunctions from "./base-functions.js";
import { stat, readdirSync, existsSync } from "fs";

export const up = () => {
  let path = baseFunctions.basePath.path.toString();
  if (path.includes(`\\`)) {
    baseFunctions.basePath.path = path.slice(0, path.lastIndexOf(`\\`));
  }
  baseFunctions.showCurDir();
};

export const cd = (path) => {
  if (!path) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  } else if (path.includes(`\\`)) {
    stat(path, (err) => {
      if (!err) {
        baseFunctions.basePath.path = path;
        baseFunctions.showCurDir();
      } else if (err.code === "ENOENT") {
        process.stdout.write(`\nInvalid input\n\n`);
      }
    });
  } else if (path === "C:" || path === "D:" || path === "c:" || path === "d:") {
    baseFunctions.basePath.path = path + "\\";
    baseFunctions.showCurDir();
  } else if (!path.includes(`\\`)) {
    const newPath = baseFunctions.basePath.path + "\\" + path;
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
