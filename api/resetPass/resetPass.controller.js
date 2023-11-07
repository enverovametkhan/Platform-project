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
    res.apiResponse = response;
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
    const { passwordData } = req.body;
    const response = await resetPassword(
      token,
      passwordData.password,
      passwordData.confirmedPassword
    );
    res.apiResponse = response;
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
