const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { createToken, decryptToken } = require("@root/utilities/jwt");
const { getAccessToUserData } = require("@root/utilities/getUserData");
let userModel = miniDatabase.Users;
let resetPasswordHashModel = miniDatabase.ResetPasswordHash;
let swapEmailHashModel = miniDatabase.SwapEmailHash;
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
    userData,
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

  const token = await createToken({ user_id: "" }, "300d");

  const newUser = {
    id: "",
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
    `Sending verification email, please verify your email at localhost:4000/api/user/verifyEmail/${token}`
  );

  return {
    message: "Signup successful",
    newUser,
  };
}

async function verifyEmail(token) {
  let userData = await decryptToken(token);
  const userIndex = userModel.findIndex((user) => user.id === userData.userId);

  if (userIndex === -1) {
    throw new Error("User has not been found");
  }
  console.log("Email has been verifed");

  userModel[userIndex].verifyEmail = "";

  let response = {
    message: "Email verified successfully",
    status: 200,
  };
  return response;
}

async function logout() {
  try {
    const userData = await getAccessToUserData();

    if (!userData || !userData.userId) {
      throw new Error("Invalid user data");
    }

    const userIndex = userModel.findIndex(
      (user) => user.id === userData.userId
    );

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    const user = userModel[userIndex];

    user.accessToken = "";
    user.refreshToken = "";

    userModel[userIndex] = user;

    return { message: "User logged out successfully", userData };
  } catch (error) {
    throw error;
  }
}

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

async function refreshAccessToken() {
  const userData = await getAccessToUserData();
  const index = userModel.findIndex((user) => user.id === userData.userId);

  if (index === -1) {
    throw new Error("User not found");
  }

  const user = userModel[index];

  let userDataToUpdate = {
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

async function resetPassword(email) {
  let userData = userModel.find((eachUser) => eachUser.email === email);

  let checkExistingResetPasswordHash = resetPasswordHashModel.find(
    (each) => each.userId === userData.userId
  );

  if (checkExistingResetPasswordHash) {
    const index = resetPasswordHashModel.findIndex(
      (each) => each.id === checkExistingResetPasswordHash.id
    );
    resetPasswordHashModel.splice(index, 1)[0];

    console.log("Password reset link already used, removing it.");
  }
  let token = await createToken({ userId: userData.userId }, "7d");
  let resetPasswordHash = {
    id: "",
    userId: userData.id,
    token: token,
    expiresAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  resetPasswordHashModel.push(resetPasswordHash);

  return {
    status: 200,
    message: "Check your email for the link",
  };
}

async function checkResetPasswordToken(token) {
  const existResetPasswordHashModel = resetPasswordHashModel.find(
    (each) => each.token === token
  );

  if (!existResetPasswordHashModel) {
    throw new Error("Invalid token");
  }

  return {
    status: 200,
    message: "Token is valid",
  };
}

async function changePassword(token, password, confirmedPassword) {
  if (!resetPasswordHashModel) {
    throw new Error("resetPasswordHashModel is undefined");
  }

  const resetToken = resetPasswordHashModel.find(
    (each) => each.token === token
  );

  if (!resetToken) {
    throw new Error("Invalid token");
  }

  if (password !== confirmedPassword) {
    throw new Error("Passwords do not match");
  }

  if (!userModel) {
    throw new Error("userModel is undefined");
  }

  const user = userModel.find((eachUser) => eachUser.id === resetToken.userId);

  if (!user) {
    throw new Error("User not found");
  }

  const newPassword = await bcrypt.hash(password, saltRounds);

  user.password = newPassword;

  const index = userModel.findIndex((eachUser) => eachUser.id === user.id);

  if (index !== -1) {
    userModel[index] = user;
  }

  return {
    status: 200,
    message: "Password changed successfully",
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
  login,
  signup,
  verifyEmail,
  logout,
  getUser,
  deleteUser,
  updateUser,
  refreshAccessToken,
  resetPassword,
  checkResetPasswordToken,
  changePassword,
  swapEmail,
  confirmEmailSwap,
};
