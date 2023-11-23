const logdna = require("@logdna/logger");
const colors = require("colors");

class CustomLogger {
  constructor() {
    const options = {
      app: "Blogs App",
      levels: ["trace", "info", "warn", "debug", "fatal", "http"],
      tags: "Empty",
    };
    const ingestionKey = "9b8776a902e87b8494e67a420ba2e943";
    this.logger = logdna.createLogger(ingestionKey, options);
    this.isLocalEnv = process.env.NODE_ENV === "local";
  }

  localMiddleware(message, metadata, type) {
    if (this.isLocalEnv) {
      if (type === "IN") {
        console.log(`[Local Middleware IN]: ${message}`.green, metadata);
      } else if (type === "OUT") {
        console.log(`[Local Middleware OUT]: ${message}`.yellow, metadata);
      } else {
        console.log(`[Local Middleware]: ${message}`.blue, metadata);
      }
    }
  }

  consoleMiddleware(message, metadata, type) {
    try {
      this.localMiddleware(message, metadata, type);
      const logObject = {
        message,
        indexMeta: true,
        _meta: {
          message: message,
          ...metadata,
        },
      };
      this.logger.info(logObject);
    } catch (e) {
      console.log(e);
    }
  }
}

const customLogger = new CustomLogger();

module.exports = {
  customLogger,
};
