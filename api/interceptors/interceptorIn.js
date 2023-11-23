const { customLogger } = require("../pack/mezmo");

// module.exports = (app) => {
//   app.use((req, res, next) => {
//     customLogger.consoleMiddleware()
//     res.setHeader("x-custom-header", Date.now());

//     console.log(`Incoming Request: ${req.originalUrl}`);
//     req.timeStarted = Date.now();
//     next();
//   });
// };

module.exports = (app) => {
  app.use((req, res, next) => {
    customLogger.consoleMiddleware(
      `[INTERCEPTOR] - (IN) | Incoming Request: ${req.originalUrl}`,
      {
        origin: req.headers.origin,
        requestedURL: req.originalUrl,
        method: req.method,
        ip: req.headers["cf-connecting-ip"],
      },
      "IN"
    );

    req.timeStarted = Date.now();
    next();
  });
};
