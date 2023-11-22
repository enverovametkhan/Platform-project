const logdna = require("@logdna/logger");

class CustomLogger {
  constructor() {
    const options = {
      app: "Blogs App",
      levels: ["info", "error", "warn", "debug", "verbose", "http", "fatal"],
      tags: "Empty",
    };
    const ingestionKey = "9b8776a902e87b8494e67a420ba2e943";
    this.logger = logdna.createLogger(ingestionKey, options);
    this.isLocalEnv = "local";
  }
}
