const bcrypt = require("bcrypt");
const { deleteUsersBlogs } = require("@root/blogs/blogs.services");
const { miniDatabase } = require("@root/database/miniDatabase");
const { createToken, decryptToken } = require("@root/utilities/jwt");
const { getAccessToUserData } = require("@root/utilities/getUserData");
const mongoose = require("mongoose");
const { UserModel, SwapEmailHashModel } = require("./users.data");
const { customLogger } = require("../pack/mezmo");

const saltRounds = 10;

// async function hashPassword(password) {
//   return await bcrypt.hash(password, saltRounds);
// }

async function getUser() {
  const userData = await getAccessToUserData();
  const user = await UserModel.findOne({ _id: userData.userId });

  if (!user) {
    customLogger.consoleError("User has not been found");
    throw new Error("User has not been found");
  }

  customLogger.consoleInfo("User data retrieved successfully", {
    userData,
    userId: user._id,
    username: user.username,
    email: user.email,
  });

  return {
    id: user._id,
    username: user.username,
    email: user.email,
  };
}

async function deleteUser() {
  const userData = await getAccessToUserData();
  const user = await UserModel.findById(userData.userId);

  if (!user) {
    throw new Error("User not found");
  }

  // const { deletedBlogs, deletedComments } = await deleteUsersBlogs(user.id);

  user.password = "";
  user.refreshToken = "";
  user.accessToken = "";
  user.deletedAt = Date.now();

  await user.save();

  console.log("User has been deleted with ID:", user.userId);
  // console.log(`Deleted ${deletedBlogs} blogs and ${deletedComments} comments`);

  return {
    message: "User deleted successfully",
  };
}

async function updateUser(updatedUserData) {
  const userData = await getAccessToUserData();

  const user = await UserModel.findById(userData.userId);

  if (!user) {
    throw new Error("User not found");
  }

  let response;

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

  await user.save();

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
  const user = await UserModel.findById(userData.userId);

  if (!user) {
    throw new Error("User not found");
  }

  const existEmailSwap = await SwapEmailHashModel.findOne({ userId: user._id });

  if (existEmailSwap) {
    await SwapEmailHashModel.findByIdAndDelete(existEmailSwap._id);
  }

  const token = await createToken({ userId: user.id }, "5d");

  const swapEmailData = new SwapEmailHashModel({
    userId: user._id,
    newEmail: newEmail,
    token: token,
    expiresAt: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  await swapEmailData.save();

  return {
    status: 200,
    message: "Please check your email for the link",
  };
}

async function confirmEmailSwap(token) {
  const userData = await decryptToken(token);

  const user = await UserModel.findOne({ _id: userData.userId });

  if (!user) {
    throw new Error("No new user found");
  }

  const checkEmailSwap = await SwapEmailHashModel.findOne({ userId: user._id });

  if (!checkEmailSwap) {
    throw new Error("Something went wrong when trying to swap emails");
  }

  const message = `Swapped email from ${user.email} to ${checkEmailSwap.newEmail}`;
  console.log(message);

  user.email = checkEmailSwap.newEmail;

  await SwapEmailHashModel.findByIdAndDelete(checkEmailSwap._id);

  await user.save();

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
