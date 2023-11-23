const { customLogger } = require("../pack/mezmo");

process.on("uncaughtException", (error) => {
  customLogger.consoleError("Server shutting down", {
    message: "Dealing with Unhandled Exception in a unique way",
    error: error.stack,
  });

  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  customLogger.consoleError("Server shutting down", {
    message: "Dealing with Unhandled Rejection in a unique way",
    error: reason.stack,
    reason: reason,
  });

  process.exit(1);
});
