const moduleAlias = require("module-alias");
moduleAlias.addAlias("@root", __dirname);
require("dotenv").config({ path: "./env" });
const express = require("express");
const app = express();
const port = process.env.PORT || 4004;
const bodyParser = require("body-parser");
const { createNamespace } = require("cls-hooked");
const namespace = createNamespace("req");

const cors = require("cors");

function contextMiddleware(req, res, next) {
  namespace.run(() => {
    namespace.set("req", req);
    next();
  });
}
app.use(cors());
app.use(contextMiddleware);
app.use(bodyParser.json());
app.use(cors());
// app.use(express.json({ limit: "100mb" }));
app.use(express.json({ limit: "500mb" }));
app.use(
  express.urlencoded({
    limit: "500mb",
    extended: true,
    parameterLimit: 550000000,
  })
);

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

module.exports = { app };
