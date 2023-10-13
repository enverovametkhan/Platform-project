const {
  resetPassword,
  checkResetPasswordToken,
  changePassword,
} = require("./resetPass.service");

async function resetPasswordController(req, res, next) {
  try {
    const { email } = req.params;
    const response = await resetPassword(email);
    res.ourResponse = response;
    next();
  } catch (error) {
    console.error(error);

    const errorMessage = {
      error: error.message,
      function: "resetPasswordController",
      errorMessage: error.message,
    };
    next(errorMessage);
  }
}

async function checkResetPasswordTokenController(req, res, next) {
  try {
    const { token } = req.params;
    const response = await checkResetPasswordToken(token);
    res.ourResponse = response;
    next();
  } catch (error) {
    console.error(error);
    const errorMessage = {
      error: error.message,
      function: "checkResetPasswordTokenController",
      errorMessage: error.message,
    };
    next(errorMessage);
  }
}

async function changePasswordController(req, res, next) {
  try {
    const { token, password, confirmedPassword } = req.body;
    const response = await changePassword(token, password, confirmedPassword);
    res.ourResponse = response;
    next();
  } catch (error) {
    console.error(error);

    const errorMessage = {
      error: error.message,
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
