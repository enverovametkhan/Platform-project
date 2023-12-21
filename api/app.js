const moduleAlias = require("module-alias");
moduleAlias.addAlias("@root", __dirname);
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const { createNamespace } = require("cls-hooked");
const namespace = createNamespace("req");
const redis = require("redis");
const cors = require("cors");

require("dotenv").config();

function contextMiddleware(req, res, next) {
  namespace.run(() => {
    namespace.set("req", req);
    next();
  });
}

let redisClient;

(async () => {
  redisClient = redis.createClient({
    url: "redis://default:I2cVxjQXj4v07UAWPjQcfVrJND4lfDKh@redis-13093.c302.asia-northeast1-1.gce.cloud.redislabs.com:13093",
  });

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

app.use(contextMiddleware);
app.use(bodyParser.json());
app.use(cors());
app.use(express.json({ limit: "5mb" }));

require("./interceptors/interceptorIn")(app);
require("./routes/routes")(app);
require("./interceptors/interceptorOut")(app);
require("./error.handlers/exception.filter.js")(app);
require("./error.handlers/system.error.js");
require("./database/db");

app.listen(port, (err) => {
  if (err) {
    console.error(`Error starting the server: ${err.message}`);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});

module.exports = { app, redisClient };
