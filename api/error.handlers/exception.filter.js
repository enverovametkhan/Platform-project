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
const { customLogger } = require("../pack/mezmo");
module.exports = (app) => {
  app.use((err, req, res, next) => {
    try {
      const timeTaken = (Date.now() - req.timeStarted) / 1000;

      const sensitiveErrors = [
        "Invalid Signature",
        "Invalid JWT",
        "jwt expired",
      ];

      const processErrorMessage = (error) =>
        sensitiveErrors.some((error) => error.includes(error))
          ? "Internal Server Error"
          : error;

      let proccessedErrorMessage = processErrorMessage(err.error);

      customLogger.consoleError(
        "[EXCEPTION FILTER] (OUT) | Oops something went wrong, sending an Exception Filter Error",
        {
          message: proccessedErrorMessage,
          timeTaken: `Time taken to process the request: ${timeTaken} seconds`,
          requestedUrl: req.originalUrl,
          method: req.method,
          // ...err,
        }
      );

      res
        .status(500)
        .send({ message: proccessedErrorMessage || "Internal Server Error" });
    } catch (e) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  });
};
