const logdna = require("@logdna/logger");

class CustomLogger {
  constructor() {
    const options = {
      app: "Blogs App",
      levels: ["trace", "info", "warn", "debug", "fatal", "http", "error"],
      tags: "Empty",
    };
    const ingestionKey = process.env.MEZMO_KEY;
    this.logger = logdna.createLogger(ingestionKey, options);
    this.isLocalEnv = process.env.CURRENT_ENV === "local" ? true : false;
    console.log(process.env.CURRENT_ENV);
  }

  localMiddleware(message, metadata, type) {
    if (this.isLocalEnv) {
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
      const isLocal = this.localInfo(message, metadata);
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
    if (this.isLocalEnv) {
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
      const isLocal = this.localError(message, metadata);
      if (isLocal) return;
      const logObject = {
        message,
        indexMeta: true,
        _meta: {
          message: message,
          ...metadata,
        },
      };
      this.logger.error(logObject);
    } catch (e) {
      console.log(e);
    }
  }

  localError(message, metadata) {
    if (this.isLocalEnv) {
      const redColor = "\x1b[31m";
      console.error(
        `[${redColor}Local Error${"\x1b[0m"}]: ${message}`,
        metadata
      );
      return true;
    }
    return false;
  }
}

const customLogger = new CustomLogger();
// const customLogger = new CustomLogger();

module.exports = {
  customLogger,
};
