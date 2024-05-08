const { customLogger } = require("../pack/mezmo");
process.on("uncaughtException", (error) => {
  customLogger.consoleError("Server shutting down", {
    message: "Dealing with Unhandled Exception in a unique way",
    error: error.stack,
  });

  process.exit(1);
});


  process.exit(1);
});
