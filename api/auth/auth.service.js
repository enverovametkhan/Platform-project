const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { getAccessToUserData } = require("@root/utilities/getUserData");
const { createToken, decryptToken } = require("@root/utilities/jwt");
const { v4: uuidv4 } = require("uuid");
const userModel = miniDatabase.Users;
const saltRounds = 10;
const mongoose = require("mongoose");
const { UserModel, SwapEmailHashModel } = require("../users/users.data");

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function login(email, password) {
  if (!email) {
    return {
      message: "Email is required",
    };
  }

  if (!password) {
    return {
      message: "Password is required",
    };
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return {
      message: "Incorrect login credentials",
    };
  }

  if (user.verifyEmail) {
    return {
      message: "Please verify your email address to continue",
    };
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return {
      message: "Incorrect login credentials",
    };
  }

  const userDataJwt = {
    userId: user.id,
    email: user.email,
    username: user.username,
  };

  const accessJwtToken = await createToken(userDataJwt, "300d");
  const refreshJwtToken = await createToken(userDataJwt, "500h");

  user.accessToken = accessJwtToken;
  user.refreshToken = refreshJwtToken;

  await user.save();

  return {
    message: "Login successful",
    accessToken: accessJwtToken,
    refreshToken: refreshJwtToken,
    userId: user.id,
    email: user.email,
    username: user.username,
  };
}

async function signup(username, email, password, confirmedPassword) {
  const user = await UserModel.findOne({ email });

  if (user) {
    throw new Error("Email already exists.");
  }

  if (password !== confirmedPassword) {
    throw new Error("Passwords do not match.");
  }

  const hashedPassword = await hashPassword(password);

  const token = await createToken({ useremail: email }, "300d");

  const newUser = await new UserModel({
    username,
    email,
    password: hashedPassword,
    verifyEmail: token,
    accessToken: "",
    refreshToken: "",
  });
  await newUser.save();
  console.log(
    `Sending verification email, please verify your email at localhost:3000/confirmemail/${token}`
  );

  return {
    message: "Signup successful",
    newUser,
  };
}

async function verifyEmail(token) {
  const userData = await decryptToken(token);

  const user = await UserModel.findOne({ email: userData.useremail });

  if (!user) {
    throw new Error("User has not been found");
  }

  console.log("Email has been verified");

  user.verifyEmail = "";

  await user.save();

  const response = {
    message: "Email verified successfully",
    status: 200,
  };
  return response;
}

async function logout() {
  const userData = await getAccessToUserData();

  const user = await UserModel.findById(userData.userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.accessToken = "";
  user.refreshToken = "";

  await user.save();

  return { message: "Logged out successfully" };
}

async function refreshAccessToken(token) {
  const userData = await decryptToken(token);

  const user = await UserModel.findById(userData.userId);

  if (!user) {
    throw new Error("User not found");
  }

  const userDataJwt = {
    userId: user.id,
    email: user.email,
    username: user.username,
  };

  const refreshToken = await createToken(userDataJwt, "100d");
  const accessToken = await createToken(userDataJwt, "300h");

  user.accessToken = accessToken;
  user.refreshToken = refreshToken;

  await user.save();

  console.log("Success refresh");
  return {
    ...userData,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    message: "Token refreshed successfully",
  };
}

module.exports = {
  login,
  signup,
  verifyEmail,
  logout,
  refreshAccessToken,
};
