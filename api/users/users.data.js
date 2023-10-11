const { miniDatabase } = require("@root/database/miniDatabase");

let userModel = miniDatabase.Users;
let resetPasswordHashModel = miniDatabase.ResetPasswordHash;
let swapEmailHashModel = miniDatabase.SwapEmailHash;

module.exports = {
  userModel,
  resetPasswordHashModel,
  swapEmailHashModel,
};
