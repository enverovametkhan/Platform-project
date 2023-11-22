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

  localMiddleware(message, metadata, type) {
    if (process.env.NODE_ENV === "local") {
      if (type === "IN") {
        console.log(`[Local Middleware IN]: ${message}`, metadata);
      } else if (type === "OUT") {
        console.log(`[Local Middleware OUT]: ${message}`, metadata);
      } else {
        console.log(`[Local Middleware]: ${message}`, metadata);
      }
    }
  }
}
