import * as baseFunctions from "./base-functions.js";
import { stat } from "fs";

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
  } else if (path == "C:" || "D:" || "c:" || "d:") {
    baseFunctions.basePath.path = path;
    baseFunctions.showCurDir();
  } /*  else if (path == "D:") {
    baseFunctions.basePath.path = path;
    baseFunctions.showCurDir();
  } */ else {
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
