const { miniDatabase } = require("@root/database/miniDatabase");

let userModel = miniDatabase.Users;
let swapEmailHashModel = miniDatabase.SwapEmailHash;

module.exports = {
  userModel,
  swapEmailHashModel,
};
