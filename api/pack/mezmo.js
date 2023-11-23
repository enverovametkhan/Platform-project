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

  localInfo(message, metadata) {
    if (process.env.NODE_ENV === "local") {
      console.log(`[Local Info]: ${message}`.green, metadata);
    }
  }

  localError(message, metadata) {
    if (process.env.NODE_ENV === "local") {
      console.error(`[Local Error]: ${message}`.red, metadata);
    }
  }

  mezmoError(message, metadata) {
    if (process.env.NODE_ENV !== "local") {
      this.localError(message, metadata);
    } else {
      console.error(`[Mezmo Error]: ${message}`.red, metadata);
    }
  }

  mezmoInfo(message, metadata) {
    if (process.env.NODE_ENV !== "local") {
      this.localInfo(`[Mezmo Info]: ${message}`, metadata);
    } else {
      console.log(`[Mezmo Info]: ${message}`.cyan, metadata);
    }
  }

  mezmoMiddleware(message, metadata, type) {
    if (process.env.NODE_ENV !== "local") {
      this.localMiddleware(`[Mezmo Middleware ${type}]: ${message}`, metadata);
    } else {
      if (type === "IN") {
        console.log(`[Mezmo Middleware IN]: ${message}`.green, metadata);
      } else if (type === "OUT") {
        console.log(`[Mezmo Middleware OUT]: ${message}`.yellow, metadata);
      } else {
        console.log(`[Mezmo Middleware]: ${message}`.blue, metadata);
      }
    }
  }
}

const customLogger = new CustomLogger();

module.exports = {
  customLogger,
};
