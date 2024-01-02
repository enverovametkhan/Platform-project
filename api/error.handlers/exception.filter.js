// const { customLogger } = require("../pack/mezmo");

// module.exports = (app) => {
//   app.use((err, req, res, next) => {
//     console.error("Error Handling Middleware");
//     console.error("Error handling");
//     console.error(err);

//     const timeTaken = (Date.now() - req.timeStarted) / 1000;
//     console.log(`Time taken to process the request: ${timeTaken} seconds`);

//     customLogger.consoleError(
//       `[EXCEPTION FILTER] - (ERROR) | Error caught in Exception Filter: ${req.originalUrl}`,
//       {
//         timeTaken: `${timeTaken} seconds`,
//         originURL: req.originalUrl,
//         method: req.method,
//         error: err,
//       }
//     );

//     res
//       .status(500)
//       .send({ message: err.errorMessage || "Internal Server Error" });
//   });
// };

module.exports = (app) => {
  app.use((err, req, res, next) => {
    try {
      const timeTaken = (Date.now() - req.timeStarted) / 1000;

      const sensitiveErrors = [
        "Invalid Signature",
        "Invalid JWT",
        "jwt expired",
      ];

      const processErrorMessage = (originalErrorMessage) =>
        sensitiveErrors.some((error) => originalErrorMessage.includes(error))
          ? "Internal Server Error"
          : originalErrorMessage;

      let proccessedErrorMessage = processErrorMessage(
        err.originalErrorMessage
      );

      customLogger.consoleError(
        "[EXCEPTION FILTER] (OUT) | Oops something went wrong, sending an Exception Filter Error",
        {
          message: processErrorMessage,
          timeTaken: `Time taken to process the request: ${timeTaken} seconds`,
          requestedUrl: req.originalUrl,
          origin: req.headers.origin,
          ip: req.headers["cf-connecting-ip"],
          method: req.method,
          // ...err,
        }
      );
      // custom error message needed when Invalid unauth token
      // yet to find out when i need original Error Message

      res
        .status(500)
        .send({ message: proccessedErrorMessage || "Internal Server Error" });
    } catch (e) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
};
