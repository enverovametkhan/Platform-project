const {
  resetPasswordReq,
  checkResetPasswordToken,
  resetPassword,
} = require("./resetPass.service");

async function resetPasswordReqController(req, res, next) {
  try {
    const { email } = req.body;
    const response = await resetPasswordReq(email);
    res.ourResponse = response;
    next();
  } catch (error) {
    console.error(error);

    const errorMessage = {
      error: error.message,
      function: "resetPasswordReqController",
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

async function resetPasswordController(req, res, next) {
  try {
    const { token } = req.params;
    const { password, confirmedPassword } = req.body;
    const response = await resetPassword(token, password, confirmedPassword);
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

module.exports = {
  resetPasswordReqController,
  checkResetPasswordTokenController,
  resetPasswordController,
};
