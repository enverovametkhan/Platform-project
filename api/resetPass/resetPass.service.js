const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { createToken, decryptToken } = require("@root/utilities/jwt");
const { UserModel } = require("../users/users.data");
const { ResetPasswordHashModel } = require("./resetPass.data");
const { customLogger } = require("../pack/mezmo");

const saltRounds = 10;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function resetPasswordReq(email) {
  const userData = await UserModel.findOne({ email });

  if (!userData) {
    customLogger.consoleError("User not found for password reset", { email });
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

  customLogger.consoleInfo("Password reset link sent successfully", {
    userId: userData.id,
    email,
    emailVerificationLink: `localhost:3000/resetpassword/${token}`,
  });

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
    customLogger.consoleError("Invalid reset password token", { token });
    return {
      status: 400,
      error: "Invalid token",
    };
  }

  customLogger.consoleInfo("Reset password token validated successfully", {
    userId: userData.userId,
  });

  return {
    status: 200,
  };
}

async function resetPassword(token, password, confirmedPassword) {
  const userData = await decryptToken(token);

  if (!userData || !userData.userId) {
    customLogger.consoleError("Invalid reset password token", { token });
    return {
      status: 400,
      error: "Invalid token",
    };
  }

  if (password !== confirmedPassword) {
    customLogger.consoleError("Passwords do not match");
    return {
      status: 400,
      error: "Passwords do not match",
    };
  }

  const checkExistingResetPasswordHash = await ResetPasswordHashModel.findOne({
    userId: userData.userId,
  });

  if (!checkExistingResetPasswordHash) {
    customLogger.consoleError("Invalid reset password token", { token });
    return {
      status: 400,
      error: "Invalid token",
    };
  }

  const user = await UserModel.findById(checkExistingResetPasswordHash.userId);

  if (!user) {
    customLogger.consoleError("User not found", {
      userId: checkExistingResetPasswordHash.userId,
    });
    return {
      status: 404,
      error: "User not found",
    };
  }

  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) {
    customLogger.consoleError("Failed to hash the password");
    return {
      status: 500,
      error: "Failed to hash the password",
    };
  }

  user.password = hashedPassword;

  await user.save();
  await ResetPasswordHashModel.findByIdAndDelete(
    checkExistingResetPasswordHash._id
  );

  customLogger.consoleInfo("Password reset successful", {
    userId: userData.userId,
  });

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
