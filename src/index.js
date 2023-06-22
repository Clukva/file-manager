import * as baseFunctions from "./base-functions.js";

baseFunctions.startManager();

process.on("SIGINT", () => {
  baseFunctions.exit();
});

process.stdin.on("data", async (data) => {
  switch (data.toString().trim()) {
    case ".exit":
      baseFunctions.exit();
      break;
    default:
      process.stdout.write("\nInvalid input\n\n");
  }
});
