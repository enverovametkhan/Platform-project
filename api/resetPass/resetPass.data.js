const { miniDatabase } = require("@root/database/miniDatabase");

let userModel = miniDatabase.Users;
let resetPasswordHashModel = miniDatabase.ResetPasswordHash;

module.exports = {
  userModel,
  resetPasswordHashModel,
};
