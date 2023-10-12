const {
  login,
  signup,
  verifyEmail,
  logout,
  refreshAccessToken,
} = require("./auth.service");

async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);

    if (user) {
      res.json(user);
      next();
    } else {
      const error = new Error("Authentication failed");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    const { id } = req.params;
    const errorMessage = {
      error: { ...error },
      function: "loginController",
      errorMessage: error.message || "Internal Server Error",
      id,
    };

    next(errorMessage);
  }
}

async function signupController(req, res, next) {
  try {
    const { username, email, password, confirmedPassword } = req.body;
    if (!username || !email || !password || !confirmedPassword) {
      const error = new Error(
        "Username, email, password, and confirmedPassword are required."
      );
      error.status = 400;
      throw error;
    }

    const newUser = await signup(username, email, password, confirmedPassword);
    res.status(201).json(newUser);
    next();
  } catch (error) {
    const errorMessage = {
      function: "signupController",
      errorMessage: error.message || "Internal Server Error",
    };

    next(errorMessage);
  }
}

async function verifyEmailController(req, res, next) {
  try {
    const { token } = req.params;
    await verifyEmail(token);

    res.json({ message: "Email has been verified" });
    next();
  } catch (error) {
    const errorMessage = {
      error: { ...error },
      function: "verifyEmailController",
      errorMessage: error.message || "Internal Server Error",
    };

    next(errorMessage);
  }
}

async function logoutController(req, res, next) {
  try {
    const userId = "";
    await logout(userId);
    res.status(200).json({ message: "Logged out successfully" });
    next();
  } catch (error) {
    const errorMessage = {
      error: { ...error },
      function: "logoutController",
      errorMessage: error.message || "Internal Server Error",
    };

    next(errorMessage);
  }
}

async function refreshAccessTokenController(req, res, next) {
  try {
    const response = await refreshAccessToken();
    res.send(response);
    next();
  } catch (error) {
    const errorMessage = {
      error: { ...error },
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
