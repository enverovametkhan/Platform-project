const { customLogger } = require("../pack/mezmo");

module.exports = (app) => {
  app.use((req, res) => {
    // console.log(`About to send response for ${req.originalUrl}`);
    const timeTaken = (Date.now() - req.timeStarted) / 1000;
    // console.log(
    //   `Time taken to process the request on ${req.originalUrl} is ${timeTaken} seconds`
    // );

    customLogger.consoleMiddleware(
      `[INTERCEPTOR] - (OUT) | Outgoing Response: ${req.originalUrl}`,
      {
        timeTaken: `${timeTaken} seconds`,
        originURL: req.originalUrl,
        method: req.method,
      },
      "OUT"
    );

    let response = {
      processedResponse: res.apiResponse,
      refreshData: res.refreshData,
    };
    res.send(response);
  });
};
