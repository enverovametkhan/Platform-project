const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { createToken, decryptToken } = require("@root/utilities/jwt");
const { getAccessToUserData } = require("@root/middleware/getUserData");
let userModel = miniDatabase.Users;
// let resetPasswordHashModel = miniDatabase.ResetPasswordHash;
let swapEmailHashModel = miniDatabase.SwapEmailHash;
const saltRounds = 10;

// async function hashPassword(password) {
//   return await bcrypt.hash(password, saltRounds);
// }

async function getUser() {
  const userData = await getAccessToUserData();

  const user = userModel.find((user) => user.id === userData.userId);

  if (!user) {
    throw new Error(`User not found for userId: ${userData.userId}`);
  }

  return {
    message: "User data retrieved successfully",
    userData,
  };
}

async function deleteUser() {
  const userData = await getAccessToUserData();

  if (!userData || !userData.userId) {
    throw new Error("Invalid user data");
  }

  const userIndex = userModel.findIndex((user) => user.id === userData.userId);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  const user = userModel[userIndex];

  user.password = "";
  user.username = "";
  user.deletedAt = Date.now();

  console.log("User has been deleted with ID:", userData.userId);

  userModel[userIndex] = user;

  return {
    message: "User deleted successfully",
    userData,
  };
}

async function updateUser(updatedUserData) {
  const userData = await getAccessToUserData();
  const userIndex = userModel.findIndex((user) => user.id === userData.userId);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  const user = userModel[userIndex];

  if (!updatedUserData.username && !updatedUserData.email) {
    throw new Error("Either username or email should be provided");
  }

  if (updatedUserData.email && updatedUserData.email !== user.email) {
    user.email = updatedUserData.email;
  }

  if (updatedUserData.username) {
    user.username = updatedUserData.username;
  }

  user.updatedAt = Date.now();
  userModel[userIndex] = user;

  return {
    message: "User updated successfully",
    userData: user,
  };
}

async function swapEmail(newEmail) {
  const userData = await getAccessToUserData();
  const user = userModel.find((eachUser) => eachUser.id === userData.userId);

  if (!user) {
    throw new Error("User not found");
  }

  const existEmailSwap = swapEmailHashModel.find(
    (each) => each.userId === user.id
  );

  if (existEmailSwap) {
    const index = swapEmailHashModel.findIndex(
      (each) => each.id === existEmailSwap.id
    );
    swapEmailHashModel.splice(index, 1);
  }

  const token = await createToken({ user_id: user.id }, "1d");

  const swapEmailData = {
    id: "",
    userId: user.id,
    newEmail: newEmail,
    token: token,
    expiresAt: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  swapEmailHashModel.push(swapEmailData);

  return {
    status: 200,
    message: "Please check your email for the link",
  };
}

async function confirmEmailSwap(token) {
  let userData = await decryptToken(token);

  let userIndex = userModel.findIndex(
    (eachUser) => eachUser.id === userData.userId
  );
  let user = userModel[userIndex];
  if (!user) throw new Error("No new user found");

  let checkEmailSwapIndex = swapEmailHashModel.findIndex(
    (each) => each.userId === user.id
  );
  let checkEmailSwap = swapEmailHashModel[checkEmailSwapIndex];
  console.log(checkEmailSwap);
  if (!checkEmailSwap)
    throw new Error("Something went wrong when trying to swap emails");

  let message = `Swapped email from ${user.email} to ${checkEmailSwap.newEmail}`;
  console.log(message);
  user.email = checkEmailSwap.newEmail;

  swapEmailHashModel.splice(checkEmailSwapIndex, 1);
  return {
    status: 200,
    message,
  };
}

module.exports = {
  getUser,
  deleteUser,
  updateUser,
  swapEmail,
  confirmEmailSwap,
};
