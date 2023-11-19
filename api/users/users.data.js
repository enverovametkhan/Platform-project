const { miniDatabase } = require("@root/database/miniDatabase");
const mongoose = require("mongoose");
const { userSchema } = require("./schemas/userSchema");
const { swapEmailHashSchema } = require("./schemas/swapEmailHashSchema");

let UserModel = mongoose.model("Users", userSchema, "Users");
let SwapEmailHashModel = mongoose.model(
  "SwapEmailHash",
  swapEmailHashSchema,
  "SwapEmailHash"
);

module.exports = {
  UserModel,
  SwapEmailHashModel,
};
