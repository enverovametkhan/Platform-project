const {
  resetPasswordReq,
  checkResetPasswordToken,
  resetPassword,
} = require("./resetPass.service");

async function resetPasswordReqController(req, res, next) {
  try {
    const { email } = req.params;

    const response = await resetPasswordReq(email);
    res.apiResponse = response;
    next();
  } catch (error) {
    console.log(error);
    const errorMessage = {
      error: error.message,
      function: "resetPasswordReqController",
      errorMessage: `Something went wrong when trying to reset password`,
    };
    next(errorMessage);
  }
}

async function checkResetPasswordTokenController(req, res, next) {
  try {
    const { token } = req.params;
    const response = await checkResetPasswordToken(token);
    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "checkResetPasswordTokenController",
      errorMessage: `Something went wrong when trying to check a token for password reset`,
    };
    next(errorMessage);
  }
}

module.exports = {
  resetPasswordReqController,
  checkResetPasswordTokenController,
  resetPasswordController,
};
