const jwt = require("jsonwebtoken");
const { decryptToken } = require("@root/utilities/jwt");
const { refreshAccessToken } = require("@root/auth/auth.service");

async function authMiddleware(req, res, next) {
  try {
    let accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      throw new Error("Unauthorized");
    }
    const userData = await decryptToken(accessToken);

    req.userData = { ...userData };
    next();
  } catch (err) {
    try {
      let refreshToken = req.headers.refreshtoken?.split(" ")[1];
      if (!refreshToken) {
        throw new Error("Unauthorized");
      }

      if (err.name === "TokenExpiredError") {
        const updatedTokens = await refreshAccessToken(refreshToken);

        res.refreshData = {
          accessToken: updatedTokens.accessToken,
          refreshToken: updatedTokens.refreshToken,
        };

        const userData = await decryptToken(updatedTokens.accessToken);

        req.userData = { ...userData };
        next();
        return;
      }
    } catch (errorHandlers) {
      console.log("error In Token Expired");
    }

    const errorMessage = {
      error: err.message,
      function: "AuthMiddleware",
      errorMessage: "Unauthorized",
    };
    next(errorMessage);
  }
}

module.exports = { authMiddleware };
