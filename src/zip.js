import fs from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import path from "path";
import { showCurDir } from "./base-functions.js";

export const compress = async (filePath, destinFolder) => {
  if (
    !filePath ||
    !destinFolder ||
    !fs.existsSync(filePath) ||
    !fs.existsSync(destinFolder)
  ) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }
  const compressedPath = path.join(
    destinFolder,
    filePath.slice(filePath.lastIndexOf("\\"), filePath.lastIndexOf(".")) +
      ".br"
  );

  if (fs.existsSync(compressedPath)) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }

  try {
    const gzip = createBrotliCompress();
    const inputStream = fs.createReadStream(filePath);
    const outputStream = fs.createWriteStream(compressedPath);
    inputStream.pipe(gzip).pipe(outputStream);
    process.stdout.write(`\nFile compressed\n\n`);
  } catch (e) {
    process.stdout.write(`\nInvalid input\n\n`);
  }
  showCurDir();
};

export const decompress = async (filePath, destinFolder) => {
  if (
    !filePath ||
    !destinFolder ||
    !fs.existsSync(filePath) ||
    !fs.existsSync(destinFolder)
  ) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }
  const decompressedPath = path.join(
    destinFolder,
    filePath.slice(filePath.lastIndexOf("\\"), filePath.lastIndexOf(".")) +
      ".txt"
  );
  if (fs.existsSync(decompressedPath)) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }

  try {
    const gunzip = createBrotliDecompress();
    const inputStream = fs.createReadStream(filePath);
    const outputStream = fs.createWriteStream(decompressedPath);

    inputStream.pipe(gunzip).pipe(outputStream);
    process.stdout.write(`\nFile decompressed\n\n`);
  } catch (e) {
    process.stdout.write(`\nInvalid input\n\n`);
  }
  showCurDir();
};
