const { miniDatabase } = require("@root/database/miniDatabase");

const userModel = miniDatabase.Users;
const swapEmailHashModel = miniDatabase.SwapEmailHash;

module.exports = {
  userModel,
  swapEmailHashModel,
};
