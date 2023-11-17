const mongoose = require("mongoose");

try {
  mongoose.connect(
    "mongodb+srv://dev_user:RgxCczNMN1B5IPRi@blogsclusterdb.u3yzwcr.mongodb.net/?retryWrites=true&w=majority",
    { dbName: "dev_user" }
  );

  const db = mongoose.connection;

  db.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

  db.once("open", () => {
    console.log("Connected to MongoDB");
  });
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
  process.exit(1);
}

module.exports = mongoose;
