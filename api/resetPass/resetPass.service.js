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
  const userData = await decryptToken(token);

  if (!userData || !userData.userId) {
    throw new Error("Invalid token");
  }

  if (password !== confirmedPassword) {
    throw new Error("Invalid passwords");
  }

  const checkExistingResetPasswordHash = await ResetPasswordHashModel.findOne({
    userId: userData.userId,
  });

  if (!checkExistingResetPasswordHash) {
    throw new Error("Invalid token");
  }

  const user = await UserModel.findById(checkExistingResetPasswordHash.userId);
  console.log("User:", user);

  if (!user) {
    throw new Error("User not found");
  }

  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) {
    throw new Error("Failed to hash the password");
  }

  user.password = hashedPassword;

  await user.save();
  await ResetPasswordHashModel.findByIdAndDelete(
    checkExistingResetPasswordHash._id
  );

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
