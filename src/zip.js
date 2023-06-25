import fs from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";

export const compress = async (filePath) => {
  const compressedPath = filePath.slice(0, filePath.lastIndexOf(".")) + ".br";
  if (!filePath || !fs.existsSync(filePath) || fs.existsSync(compressedPath)) {
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
};

export const decompress = async (filePath) => {
  const decompressedPath =
    filePath.slice(0, filePath.lastIndexOf(".")) + ".txt";
  if (
    !filePath ||
    !fs.existsSync(filePath) ||
    fs.existsSync(decompressedPath)
  ) {
    process.stdout.write(`\nInvalid input\n\n`);
    return;
  }
  try {
    const gunzip = createBrotliDecompress();
    const inputStream = fs.createReadStream(filePath);
    const outputStream = fs.createWriteStream(decompressedPath);

    inputStream.pipe(gunzip).pipe(outputStream);
  } catch (e) {
    process.stdout.write(`\nInvalid input\n\n`);
  }
};
