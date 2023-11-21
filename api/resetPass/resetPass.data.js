const { miniDatabase } = require("@root/database/miniDatabase");
const mongoose = require("mongoose");
const { resetPassSchema } = require("./schemas/resetPassSchema");

let ResetPasswordHashModel = mongoose.model(
  "ResetPass",
  resetPassSchema,
  "ResetPass"
);

module.exports = {
  ResetPasswordHashModel,
};
