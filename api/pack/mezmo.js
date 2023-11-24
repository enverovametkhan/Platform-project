const logdna = require("@logdna/logger");
const colors = require("colors");

class CustomLogger {
  constructor() {
    const options = {
      app: "Blogs App",
      levels: ["trace", "info", "warn", "debug", "fatal", "http"],
      tags: "Empty",
    };
    const ingestionKey = process.env.MEZMO_KEY;
    this.logger = logdna.createLogger(ingestionKey, options);
    this.isLocalEnv = process.env.IS_LOCAL;
    console.log(process.env.IS_LOCAL);
  }

  localMiddleware(message, metadata, type) {
    if (this.isLocalEnv === "local") {
      const greenColor = "\x1b[32m";
      const yellowColor = "\x1b[33m";

      if (type === "IN") {
        console.log(
          `[${greenColor}INTERCEPTOR${"\x1b[0m"}]: ${message}`,
          metadata
        );
      } else {
        console.log(
          `[${yellowColor}INTERCEPTOR${"\x1b[0m"}]: ${message}`,
          metadata
        );
        return true;
      }
      return false;
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

  consoleInfo(message, metadata) {
    try {
      const isLocal = this.localInfo(message, metadata, type);
      if (isLocal) return;
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
    if (this.isLocalEnv === "local") {
      const greenColor = "\x1b[32m";
      console.log(
        `[${greenColor}Local Info${"\x1b[0m"}]: ${message}`,
        metadata
      );
      return true;
    }
    return false;
  }

  consoleError(message, metadata) {
    try {
      const isLocal = this.localError(message, metadata, type);
      if (isLocal) return;
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

  localError(message, metadata) {
    if (this.isLocalEnv === "local") {
      const redColor = "\x1b[31m";
      console.error(
        `[${redColor}Local Error${"\x1b[0m"}]: ${message}`,
        metadata
      );
      return true;
    }
    return false;
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
      console.log(`[Mezmo Info]: ${message}`.green, metadata);
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
