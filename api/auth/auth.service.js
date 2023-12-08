const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { getAccessToUserData } = require("@root/utilities/getUserData");
const { createToken, decryptToken } = require("@root/utilities/jwt");

const saltRounds = 10;
const mongoose = require("mongoose");
const { UserModel } = require("../users/users.data");
const { customLogger } = require("../pack/mezmo");

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function login(email, password) {
  if (!email) {
    customLogger.consoleError("Email is required", {
      function: "login",
    });
    throw new Error("Email is required");
  }

  if (!password) {
    customLogger.consoleError("Password is required", {
      function: "login",
    });
    throw new Error("Password is required");
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    customLogger.consoleError("Incorrect login credentials", {
      function: "login",
    });
    throw new Error("Incorrect login credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    customLogger.consoleError("Incorrect login credentials", {
      function: "login",
    });
    throw new Error("Incorrect login credentials");
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

  await UserModel.findByIdAndUpdate(user._id, {
    new: true,
    runValidators: true,
  });

  customLogger.consoleInfo("Login successful", {
    email: user.email,
    username: user.username,
  });

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
    customLogger.consoleError("Email already exists.");
    throw new Error("Email already exists.", {
      function: "signup",
    });
  }

  if (password !== confirmedPassword) {
    customLogger.consoleError("Passwords do not match.", {
      function: "signup",
    });
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
  customLogger.consoleInfo("Signup successful", { newUser });

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
    customLogger.consoleError("User has not been found", {
      function: "verifyEmail",
    });
    throw new Error("User has not been found");
  }

  console.log("Email has been verified");
  customLogger.consoleInfo("Email verified successfully", {
    userEmail: user.email,
  });

  user.verifyEmail = "";

  await UserModel.findByIdAndUpdate(user._id, {
    new: true,
    runValidators: true,
  });

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
    customLogger.consoleError("User not found during logout", {
      function: "logout",
    });
    throw new Error("User not found");
  }

  user.accessToken = "";
  user.refreshToken = "";

  await UserModel.findByIdAndUpdate(user._id, {
    new: true,
    runValidators: true,
  });

  customLogger.consoleInfo("Logged out successfully", {
    userId: userData.userId,
  });

  return { message: "Logged out successfully" };
}

async function refreshAccessToken(token) {
  const userData = await decryptToken(token);
  const user = await UserModel.findById(userData.userId);

  if (!user) {
    customLogger.consoleError("User not found during token refresh", {
      function: "refreshAccessToken",
    });
    throw new Error("User not found");
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

  await UserModel.findByIdAndUpdate(user._id, {
    new: true,
    runValidators: true,
  });

  customLogger.consoleInfo("Token refreshed successfully", {
    userId: userData.userId,
  });

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
