const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { createToken, decryptToken } = require("@root/utilities/jwt");
let userModel = miniDatabase.Users;
let resetPasswordHashModel = miniDatabase.ResetPasswordHash;

async function resetPasswordReq(email) {
  const userData = userModel.find((eachUser) => eachUser.email === email);

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

  const token = await createToken({ userId: userData.userId }, "7d");
  const resetPasswordHash = {
    id: "",
    userId: userData.id,
    token: token,
    expiresAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  resetPasswordHashModel.push(resetPasswordHash);
  console.log("askdjasd");

  return {
    status: 200,
    message: "Check your email for the link",
  };
}

async function checkResetPasswordToken(token) {
  const userData = await decryptToken(token);
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

  let checkExistingResetPasswordHashIndex = resetPasswordHashModel.findIndex(
    (each) => each.userId === userData.userId
  );
  let checkExistingResetPasswordHash =
    resetPasswordHashModel[checkExistingResetPasswordHashIndex];

  if (!checkExistingResetPasswordHash) {
    throw new Error("Invalid token");
  }
  if (password !== confirmedPassword) {
    throw new Error("Password dont match");
  }
  let userIndex = userModel.findIndex(
    (eachUser) => eachUser.id === checkExistingResetPasswordHash.userId
  );
  let user = userModel[userIndex];

  let salt = await bcrypt.genSalt();
  let newPassword = await bcrypt.hash(password, salt);
  user.password = newPassword;

  resetPasswordHashModel.splice(checkExistingResetPasswordHashIndex, 1)[0];

  return {
    status: 200,
    message: "Have successfuly changed your password",
  };
}

module.exports = {
  resetPasswordReq,
  checkResetPasswordToken,
  resetPassword,
};
