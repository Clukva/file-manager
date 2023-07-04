import path from "path";

export const startManager = () => {
  process.stdout.write(`\nWelcome to the File Manager, ${getUsername()}!\n`);
  showCurDir();
};

export const getUsername = () => {
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i].startsWith("--username")) {
      return process.argv[i].slice(11);
    }
  }
};

export const exit = () => {
  process.stdout.write(
    `\nThank you for using File Manager, ${getUsername()}, goodbye!\n\n`
  );
  process.exit();
};

export const showCurDir = () => {
  process.stdout.write(
    `\nYou are currently in ${path.resolve(basePath.path)}\n\n`
  );
};

export const getArr = (dataString) => [...dataString.split(" ")];

export const basePath = {
  path: process.env.HOME,
};
