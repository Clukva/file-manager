import fs from "fs";
const { promises: fsProm, createReadStream, createWriteStream, stat } = fs;
import { basePath, showCurDir } from "./base-functions.js";
import pathNode from "path";

export const cat = async (path) => {
  if (!path) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }
  let pathToFile = "";

  if (path.includes("\\")) {
    pathToFile = path;
  } else {
    pathToFile = pathNode.join(basePath.path + path);
  }

  try {
    const content = await fsProm.readFile(pathToFile, "utf-8");
    console.log("\n" + content);
  } catch (err) {
    process.stdout.write(`\nFS operation failed\n`);
  }
  showCurDir();
};

export const add = async (data) => {
  const filePath = pathNode.join(basePath.path + "\\" + data.toString());

  try {
    if (fs.existsSync(filePath)) {
      process.stdout.write(`\nFS operation failed\n`);
    } else {
      await fsProm.writeFile(filePath, "");
      console.log("\nFile created");
    }
  } catch (err) {
    process.stdout.write(`\nFS operation failed\n`);
  }
  showCurDir();
};

export const rn = async (renameFrom, renameTo) => {
  if (!renameFrom || !renameTo) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }

  const renameFolder = renameFrom
    .toString()
    .slice(0, renameFrom.lastIndexOf("\\"));
  renameTo = pathNode.join(renameFolder, renameTo);

  if (fs.existsSync(renameTo) || !fs.existsSync(renameFrom)) {
    process.stdout.write("\nFS operation failed\n\n");
    return;
  }

  try {
    await fsProm.rename(renameFrom, renameTo);
    console.log("\nFile renamed");
  } catch (err) {
    process.stdout.write("\nFS operation failed\n");
  }
  showCurDir();
};

export const cp = async (sourcePath, destinPath) => {
  if (!sourcePath || !destinPath) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }
  if (!fs.existsSync(sourcePath)) {
    process.stdout.write("\nFS operation failed\n\n");
    return;
  }

  stat(destinPath, (err, stats) => {
    if (err) {
      process.stdout.write(`\nInvalid input3\n\n`);

      return;
    }

    if (!stats.isDirectory()) {
      process.stdout.write("\nFS operation failed\n");
    }
  });

  const fileName = sourcePath.toString().slice(sourcePath.lastIndexOf("\\"));

  if (fs.existsSync(pathNode.join(destinPath + fileName))) {
    process.stdout.write("\nFS operation failed\n\n");
    return;
  } else {
    try {
      const readableStream = createReadStream(sourcePath);
      const writableStream = createWriteStream(destinPath + fileName);

      readableStream.pipe(writableStream);

      console.log("\nFile copied");
    } catch (e) {
      if (!fs.existsSync(sourcePath) || fs.existsSync(destinPath)) {
        process.stdout.write("\nFS operation failed\n");
      }
    }
  }

  showCurDir();
};

export const mv = async (sourcePath, destinPath) => {
  if (!sourcePath || !destinPath) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }
  if (!fs.existsSync(sourcePath)) {
    process.stdout.write("\nFS operation failed\n\n");
    return;
  }

  stat(destinPath, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }

    if (!stats.isDirectory()) {
      process.stdout.write("\nFS operation failed\n");
    }
  });

  const fileName = sourcePath.toString().slice(sourcePath.lastIndexOf("\\"));

  if (fs.existsSync(pathNode.join(destinPath + fileName))) {
    process.stdout.write("\nFS operation failed\n\n");
    return;
  } else {
    try {
      const readableStream = createReadStream(sourcePath);
      const writableStream = createWriteStream(destinPath + fileName);

      readableStream.pipe(writableStream);

      readableStream.on("end", () => {
        fs.unlink(sourcePath, (err) => {
          if (err) {
            process.stdout.write("\nFS operation failed\n");
          } else {
            console.log("\n File moved successfully \n");
          }
        });
      });
    } catch (e) {
      if (!fs.existsSync(sourcePath) || fs.existsSync(destinPath)) {
        process.stdout.write("\nFS operation failed\n");
      }
    }
  }

  showCurDir();
};

export const rm = async (deletePath) => {
  if (!deletePath) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }

  if (!deletePath.includes("\\")) {
    deletePath = pathNode.join(basePath.path + "\\" + deletePath);
  }

  try {
    await fsProm.unlink(deletePath);
    console.log("\nFile removed");
  } catch (err) {
    if (!fs.existsSync(deletePath)) {
      process.stdout.write("\nFS operation failed\n");
    }
  }
  showCurDir();
};
