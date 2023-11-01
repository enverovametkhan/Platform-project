const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { getAccessToUserData } = require("@root/utilities/getUserData");
const { createToken, decryptToken } = require("@root/utilities/jwt");
const { v4: uuidv4 } = require("uuid");
const userModel = miniDatabase.Users;
const saltRounds = 10;

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

  const user = userModel.find((user) => user.email === email);

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

  const userData = {
    userId: user.id,
    email: user.email,
    username: user.username,
  };

  const accessToken = await createToken(userData, "300d");
  const refreshToken = await createToken(userData, "500h");

  user.accessToken = accessToken;
  user.refreshToken = refreshToken;

  return {
    message: "Login successful",
    accessToken,
    refreshToken,
    userId: user.id,
    email: user.email,
    username: user.username,
  };
}

async function signup(username, email, password, confirmedPassword) {
  const user = userModel.find((user) => user.email === email);

  if (user) {
    throw new Error("Email already exists.");
  }

  if (password !== confirmedPassword) {
    throw new Error("Passwords do not match.");
  }

  const hashedPassword = await hashPassword(password);

  const token = await createToken({ useremail: email }, "300d");

  const newUser = {
    id: uuidv4(),
    username: username,
    email: email,
    password: hashedPassword,
    verifyEmail: token,
    accessToken: "",
    refreshToken: "",
    deletedAt: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  userModel.push(newUser);

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
  console.log(userData);
  const userIndex = userModel.findIndex(
    (user) => user.email === userData.useremail
  );

  if (userIndex === -1) {
    throw new Error("User has not been found");
  }
  console.log("Email has been verifed");

  userModel[userIndex].verifyEmail = "";

  const response = {
    message: "Email verified successfully",
    status: 200,
  };
  return response;
}

async function logout() {
  const userData = await getAccessToUserData();

  const userIndex = userModel.findIndex((user) => user.id === userData.userId);

  if (userIndex === -1) {
    throw new Error("User not found");
  }

  userModel[userIndex].accessToken = "";
  userModel[userIndex].refreshToken = "";

  return { message: "Logged out successfully" };
}

async function refreshAccessToken() {
  const userData = await getAccessToUserData();
  const index = userModel.findIndex((user) => user.id === userData.userId);

  if (index === -1) {
    throw new Error("User not found");
  }

  const user = userModel[index];

  const userDataToUpdate = {
    userId: user.id,
    email: user.email,
    username: user.username,
  };

  const newRefreshToken = await createToken(userDataToUpdate, "100d");
  const newAccessToken = await createToken(userDataToUpdate, "300h");

  user.accessToken = newAccessToken;
  user.refreshToken = newRefreshToken;

  userModel[index] = user;

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
