const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { createToken, decryptToken } = require("@root/utilities/jwt");
const { UserModel } = require("../users/users.data");
const { ResetPasswordHashModel } = require("./resetPass.data");

const saltRounds = 10;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function resetPasswordReq(email) {
  const userData = await UserModel.findOne({ email });

  if (!userData) {
    return {
      status: 404,
      message: "User not found",
    };
  }

  const checkExistingResetPasswordHash = await ResetPasswordHashModel.findOne({
    userId: userData.id,
  });

  if (checkExistingResetPasswordHash) {
    await ResetPasswordHashModel.findByIdAndDelete(
      checkExistingResetPasswordHash.id
    );
    console.log("Password reset link already used, removing it.");
  }

  const token = await createToken({ userId: userData.id }, "5d");
  const resetPasswordHash = new ResetPasswordHashModel({
    userId: userData.id,
    token: token,
    expiresAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await resetPasswordHash.save();

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

  const checkExistingResetPasswordHash = await ResetPasswordHashModel.findOne({
    userId: userData.userId,
  });

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
