const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://dev_user:RgxCczNMN1B5IPRi@blogsclusterdb.u3yzwcr.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
