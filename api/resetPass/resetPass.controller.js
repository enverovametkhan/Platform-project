const {
  resetPassword,
  checkResetPasswordToken,
  changePassword,
} = require("./resetPass.service");

async function resetPasswordController(req, res, next) {
  try {
    const { email } = req.params;

    const response = await resetPassword(email);

    res.status(response.status).json({ message: response.message });
    next();
  } catch (error) {
    console.error(error);

    const errorMessage = {
      error: { ...error },
      function: "resetPasswordController",
      errorMessage: error.message,
    };
    next(errorMessage);
  }
}

async function checkResetPasswordTokenController(req, res, next) {
  try {
    const { token } = req.params;
    console.log("Check Reset Password Token:", token);
    await checkResetPasswordToken(token);
    res.json({ message: "Token is valid" });
    next();
  } catch (error) {
    console.error(error);
    const errorMessage = {
      error: { ...error },
      function: "checkResetPasswordTokenController",
      errorMessage: error.message,
    };
    next(errorMessage);
  }
}

async function changePasswordController(req, res, next) {
  try {
    const { token, password, confirmedPassword } = req.body;

    await changePassword(token, password, confirmedPassword);

    res.json({ message: "Password changed successfully" });
    next();
  } catch (error) {
    console.error(error);

    const errorMessage = {
      error: { ...error },
      function: "changePasswordController",
      errorMessage: error.message,
    };
    next(errorMessage);
  }
}

module.exports = {
  resetPasswordController,
  checkResetPasswordTokenController,
  changePasswordController,
};
