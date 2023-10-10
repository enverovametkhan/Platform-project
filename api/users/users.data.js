const { miniDatabase } = require("@root/database/miniDatabase");

let userModel = miniDatabase.Users;
let resetPasswordHash = miniDatabase.ResetPasswordHash;
let swapEmailHashModel = miniDatabase.SwapEmailHash;

module.exports = {
  userModel,
  resetPasswordHash,
  swapEmailHashModel,
};
