const { customLogger } = require("../pack/mezmo");

module.exports = (app) => {
  app.use((err, req, res, next) => {
    console.error("Error Handling Middleware");
    console.error("Error handling");
    console.error(err);

    const timeTaken = (Date.now() - req.timeStarted) / 1000;
    console.log(`Time taken to process the request: ${timeTaken} seconds`);

    customLogger.consoleMiddleware(
      `[EXCEPTION FILTER] - (ERROR) | Error caught in Exception Filter: ${req.originalUrl}`,
      {
        timeTaken: `${timeTaken} seconds`,
        originURL: req.originalUrl,
        method: req.method,
        error: err,
      }
    );

    res
      .status(500)
      .send({ message: err.errorMessage || "Internal Server Error" });
  });
};
