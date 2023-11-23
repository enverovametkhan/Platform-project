const { customLogger } = require("../pack/mezmo");

module.exports = (app) => {
  app.use((req, res, next) => {
    customLogger.consoleMiddleware(
      `[INTERCEPTOR] - (IN) | Incoming Request: ${req.originalUrl}`,
      {
        origin: req.headers.origin,
        requestedURL: req.originalUrl,
        method: req.method,
      }
    );

    req.timeStarted = Date.now();
    next();
  });
};
