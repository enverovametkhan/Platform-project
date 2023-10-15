const { miniDatabase } = require("@root/database/miniDatabase");

const userModel = miniDatabase.Users;
const resetPasswordHashModel = miniDatabase.ResetPasswordHash;

module.exports = {
  userModel,
  resetPasswordHashModel,
};
