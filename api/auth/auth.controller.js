const {
  login,
  signup,
  verifyEmail,
  logout,
  refreshAccessToken,
} = require("./auth.service");

async function loginController(req, res, next) {
  try {
    const { password, email } = req.body;
    const response = await login(email, password);
    res.apiResponse = response;

    next();
  } catch (error) {
    const { id } = req.params;
    const errorMessage = {
      error: error.message,
      function: "loginController",
      errorMessage: `Something went wrong during a login`,
      id,
    };

    next(errorMessage);
  }
}

async function signupController(req, res, next) {
  try {
    const { email, username, password, confirmedPassword } = req.body;
    const response = await signup(username, email, password, confirmedPassword);
    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "signupController",
      errorMessage: `Something went wrong during sign up`,
    };

    next(errorMessage);
  }
}

async function verifyEmailController(req, res, next) {
  try {
    const { token } = req.params;
    const response = await verifyEmail(token);
    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "verifyEmailController",
      errorMessage: `Something went wrong during email verification`,
    };

    next(errorMessage);
  }
}

async function logoutController(req, res, next) {
  try {
    const response = await logout();
    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "logoutController",
      errorMessage: `Something went wrong when trying to log out`,
    };

    next(errorMessage);
  }
}

async function refreshAccessTokenController(req, res, next) {
  try {
    const { token } = req.params;
    const response = await refreshAccessToken(token);
    res.apiResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "refreshAccessTokenController",
      errorMessage: `Something went wrong when trying to refresh access token`,
    };
    next(errorMessage);
  }
}

module.exports = {
  loginController,
  signupController,
  verifyEmailController,
  logoutController,
  refreshAccessTokenController,
};
