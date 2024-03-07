const bcrypt = require("bcrypt");
const { miniDatabase } = require("@root/database/miniDatabase");
const { createToken, decryptToken } = require("@root/utilities/jwt");
const { UserModel } = require("../users/users.data");
const { ResetPasswordHashModel } = require("./resetPass.data");
const { customLogger } = require("../pack/mezmo");
const { GoogleTemplate } = require("../pack/sendEmail");
const { googleEmailer } = require("../pack/sendEmail");

const saltRounds = 5;

async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function resetPasswordReq(email) {
  const userData = await UserModel.findOne({ email });
  if (!userData) {
    customLogger.consoleError("User not found for password reset", {
      email,
      function: "resetPasswordReq",
    });
    throw new Error("User not found for password reset");
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

  const payload = {
    url: `http://123myblog.work/resetpassword/${token}`,
  };

  await googleEmailer.sendEmail(
    userData.email,
    GoogleTemplate.RESET_PASSWORD,
    payload
  );

  customLogger.consoleInfo("Password reset link sent successfully", {
    email,
    emailVerificationLink: `http://123myblog.work/resetpassword/${token}`,
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
    customLogger.consoleError("Invalid reset password token", {
      token,
      function: "checkResetPasswordToken",
    });
    throw new Error("Invalid reset password token");
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
    customLogger.consoleError("Invalid reset password token", {
      token,
      function: "resetPassword",
    });
    throw new Error("Invalid reset password token");
  }

  if (password !== confirmedPassword) {
    customLogger.consoleError("Passwords do not match", {
      function: "resetPassword",
    });
    throw new Error("Passwords do not match");
  }

  const checkExistingResetPasswordHash = await ResetPasswordHashModel.findOne({
    userId: userData.userId,
  });

  if (!checkExistingResetPasswordHash) {
    customLogger.consoleError("Invalid reset password token", {
      token,
      function: "resetPassword",
    });
    throw new Error("Invalid reset password token");
  }

  const user = await UserModel.findById(checkExistingResetPasswordHash.userId);

  if (!user) {
    customLogger.consoleError("User not found", {
      userId: checkExistingResetPasswordHash.userId,
      function: "resetPassword",
    });
    throw new Error("User not found");
  }

  const hashedPassword = await hashPassword(password);

  if (!hashedPassword) {
    customLogger.consoleError("Failed to hash the password", {
      function: "resetPassword",
    });
    throw new Error("Failed to hash the password");
  }

  user.password = hashedPassword;

  await UserModel.findByIdAndUpdate(user._id, {
    new: true,
    runValidators: true,
  });
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
