const jwt = require("jsonwebtoken");
const { decryptToken } = require("@root/utilities/jwt");
const { refreshAccessToken } = require("@root/auth/auth.service");

async function getBlogMiddleware(req, res, next) {
  try {
    let accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) {
      req.userData = { userId: "public" };
      next();
      return;
    }
    const userData = await decryptToken(accessToken);

    req.userData = { ...userData };
    next();
  } catch (err) {
    try {
      let refreshToken = req.headers.refreshtoken?.split(" ")[1];
      if (!refreshToken) {
        req.userData = { userId: "public" };
        next();
        return;
      }
      const userData = await decryptToken(refreshToken);

      req.userData = { ...userData };
      next();
    } catch (errorHandlers) {}

    req.userData = { userId: "public" };
    next();
  }
}

module.exports = { getBlogMiddleware };
