import os from "os";
import { showCurDir } from "./base-functions.js";

export const osInf = async (data) => {
  let inf = "";
  try {
    switch (data) {
      case "--EOL":
        inf = JSON.stringify(os.EOL);
        showCurDir();
        break;
      case "--username":
        inf = os.userInfo().username;
        showCurDir();
        break;
      case "--architecture":
        inf = os.arch();
        showCurDir();
        break;
      case "--homedir":
        inf = os.homedir();
        showCurDir();
        break;
      case "--cpus":
        let cpusInf = os.cpus();
        process.stdout.write(`\namount cpus ${cpusInf.length}\n`);
        cpusInf = cpusInf.map((core) => ({
          Model: core.model.trim(),
          "Clock rate": `${(core.speed / 1000).toFixed(2)} GHz`,
        }));
        console.table(cpusInf);
        showCurDir();
        return;
      default:
        process.stdout.write("\nInvalid input\n\n");
        return;
    }
    process.stdout.write(`\n${inf}\n`);
  } catch (e) {
    process.stdout.write(`${error}${os.EOL}`);
  }

  showCurDir();
};
