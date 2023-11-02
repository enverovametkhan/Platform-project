const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { createToken, decryptToken } = require("@root/utilities/jwt");
const { getAccessToUserData } = require("@root/utilities/getUserData");
let userModel = miniDatabase.Users;
let swapEmailHashModel = miniDatabase.SwapEmailHash;
// let resetPasswordHashModel = miniDatabase.ResetPasswordHash;

const saltRounds = 10;

// async function hashPassword(password) {
//   return await bcrypt.hash(password, saltRounds);
// }

async function getUser() {
  const userData = await getAccessToUserData();
  const userIndex = userModel.findIndex((user) => user.id === userData.userId);
  const user = userModel[userIndex];

  if (userIndex === -1) {
    throw new Error("User has not been found");
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
}

async function deleteUser() {
  const userData = await getAccessToUserData();
  const userIndex = userModel.findIndex((user) => user.id === userData.userId);
  const user = userModel[userIndex];

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  user.password = "";
  user.username = "";
  user.refreshToken = "";
  user.accessToken = "";
  user.deletedAt = Date.now();

  console.log("User has been deleted with ID:", user.userId);

  return {
    message: "User deleted successfully",
  };
}

async function updateUser(updatedUserData) {
  const userData = await getAccessToUserData();
  let response;
  const userIndex = userModel.findIndex((user) => user.id === userData.userId);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  const user = userModel[userIndex];

  if (!updatedUserData.username && !updatedUserData.email) {
    throw new Error("Either username or email should be provided");
  }

  if (updatedUserData.email && updatedUserData.email !== user.email) {
    await swapEmail(updatedUserData.email);

    response = {
      email: "Check your email",
    };
  }

  if (updatedUserData.username) {
    user.username = updatedUserData.username;
  }

  user.updatedAt = Date.now();
  userModel[userIndex] = user;
  const token = await createToken({ userId: userData.userId }, "7d");
  console.log(
    `Sending verification email, please verify your email at localhost:3000/swapemail/${token}`
  );
  return {
    username: "Updated username",
    userData: user,
    ...response,
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

  const token = await createToken({ userId: user.id }, "1d");

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
  const userData = await decryptToken(token);

  const userIndex = userModel.findIndex(
    (eachUser) => eachUser.id === userData.userId
  );
  const user = userModel[userIndex];
  if (!user) throw new Error("No new user found");

  const checkEmailSwapIndex = swapEmailHashModel.findIndex(
    (each) => each.userId === user.id
  );
  const checkEmailSwap = swapEmailHashModel[checkEmailSwapIndex];
  console.log(checkEmailSwap);
  if (!checkEmailSwap)
    throw new Error("Something went wrong when trying to swap emails");

  const message = `Swapped email from ${user.email} to ${checkEmailSwap.newEmail}`;
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
