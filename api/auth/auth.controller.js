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
    res.ourResponse = response;

    next();
  } catch (error) {
    const { id } = req.params;
    const errorMessage = {
      error: error.message,
      function: "loginController",
      errorMessage: error.message || "Internal Server Error",
      id,
    };

    next(errorMessage);
  }
}

async function signupController(req, res, next) {
  try {
    const { email, username, password, confirmedPassword } = req.body;
    const response = await signup(username, email, password, confirmedPassword);
    res.ourResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "signupController",
      errorMessage: error.message || "Internal Server Error",
    };

    next(errorMessage);
  }
}

async function verifyEmailController(req, res, next) {
  try {
    const { token } = req.params;
    const response = await verifyEmail(token);
    res.ourResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "verifyEmailController",
      errorMessage: error.message || "Internal Server Error",
    };

    next(errorMessage);
  }
}

async function logoutController(req, res, next) {
  try {
    const response = await logout();
    res.ourResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "logoutController",
      errorMessage: error.message || "Internal Server Error",
    };

    next(errorMessage);
  }
}

async function refreshAccessTokenController(req, res, next) {
  try {
    const { token } = req.params;
    const response = await refreshAccessToken(token);
    res.ourResponse = response;
    next();
  } catch (error) {
    const errorMessage = {
      error: error.message,
      function: "refreshAccessTokenController",
      errorMessage: error.message || "Internal Server Error",
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
