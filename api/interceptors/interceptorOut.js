module.exports = (app) => {
  app.use((req, res) => {
    console.log(`About to send response for ${req.originalUrl}`);
    const timeTaken = (Date.now() - req.timeStarted) / 1000;
    console.log(
      `Time taken to process the request on ${req.originalUrl} is ${timeTaken} seconds`
    );
    res.send(res.ourResponse);
  });
};
