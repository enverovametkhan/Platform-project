const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { createToken, decryptToken } = require("@root/utilities/jwt");
let userModel = miniDatabase.Users;
let resetPasswordHashModel = miniDatabase.ResetPasswordHash;

const saltRounds = 10;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function resetPasswordReq(email) {
  const userData = userModel.find((eachUser) => eachUser.email === email);
  console.log(userData);
  const checkExistingResetPasswordHash = resetPasswordHashModel.find(
    (each) => each.userId === userData.userId
  );

  if (checkExistingResetPasswordHash) {
    const index = resetPasswordHashModel.findIndex(
      (each) => each.id === checkExistingResetPasswordHash.id
    );
    resetPasswordHashModel.splice(index, 1)[0];

    console.log("Password reset link already used, removing it.");
  }

  const token = await createToken(userData, "7d");
  const resetPasswordHash = {
    id: "",
    userId: userData.userId,
    token: token,
    expiresAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  resetPasswordHashModel.push(resetPasswordHash);
  console.log(
    `Sending verification email, please verify your email at localhost:3000/resetpassword/${token}`
  );

  return {
    status: 200,
    message: "Check your email for the link",
  };
}

async function checkResetPasswordToken(token) {
  const userData = await decryptToken(token);
  console.log(userData);
  const checkExistingResetPasswordHash = resetPasswordHashModel.find(
    (each) => each.userId === userData.userId
  );
  if (!checkExistingResetPasswordHash) {
    throw new Error("Invalid token");
  }

  return {
    status: 200,
  };
}

async function resetPassword(token, password, confirmedPassword) {
  let userData = await decryptToken(token);
  console.log(password, confirmedPassword);
  console.log("userData");
  if (!userData || !userData.id) {
    throw new Error("Invalid token");
  }

  if (password !== confirmedPassword) {
    throw new Error("Invalid passwords");
  }

  let checkExistingResetPasswordHashIndex = resetPasswordHashModel.findIndex(
    (each) => each.userId === userData.id
  );
  let checkExistingResetPasswordHash =
    resetPasswordHashModel[checkExistingResetPasswordHashIndex];

  if (!checkExistingResetPasswordHash) {
    throw new Error("Invalid token");
  }

  let userIndex = userModel.findIndex(
    (eachUser) => eachUser.id === checkExistingResetPasswordHash.userId
  );
  let user = userModel[userIndex];

  if (!user) {
    throw new Error("User not found");
  }
  const hashedPassword = await hashPassword(password);
  user.password = hashedPassword;

  resetPasswordHashModel.splice(checkExistingResetPasswordHashIndex, 1);

  return {
    status: 200,
    message: "Successfully changed your password",
  };
}

module.exports = {
  resetPasswordReq,
  checkResetPasswordToken,
  resetPassword,
};
