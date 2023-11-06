// const jwt = require("jsonwebtoken");
// const { decryptToken } = require("@root/utilities/jwt");
// const { refreshAccessToken } = require("@root/auth/auth.service");

// async function authMiddleware(req, res, next) {
//   try {
//     const accessToken = req.headers.authorization?.split(" ")[1];
//     console.log(accessToken);

//     if (!accessToken) {
//       throw new Error("Unauthorized");
//     }

//     const userData = await decryptToken(accessToken);

//     req.userData = {
//       ...userData,
//     };

//     next();
//   } catch (err) {
//     try {
//       const refreshToken = req.headers.refreshtoken?.split(" ")[1];
//       if (err.name === "TokenExpiredError") {
//         console.log("Token expired");
//         const updatedTokens = await refreshAccessToken(refreshToken);

//         res.refreshData = {
//           accessToken: updatedTokens.accessToken,
//           refreshToken: updatedTokens.refreshToken,
//         };

//         const userData = await decryptToken(updatedTokens.accessToken);

//         req.userData = {
//           ...userData,
//         };

//         return next();
//       }
//     } catch (refreshError) {
//       console.log(refreshError);
//       const errorMessage = {
//         error: refreshError.message,
//         function: "AuthMiddleware",
//         errorMessage: "Unauthorized",
//       };
//       return next(errorMessage);
//     }

//     console.log(err);
//     const errorMessage = {
//       error: err.message,
//       function: "AuthMiddleware",
//       errorMessage: "Unauthorized",
//     };

//     next(errorMessage);
//   }
// }

// module.exports = { authMiddleware };

const jwt = require("jsonwebtoken");
const { decryptToken } = require("@root/utilities/jwt");
const { refreshAccessToken } = require("@root/auth/auth.service");

async function authMiddleware(req, res, next) {
  try {
    let accessToken = req.headers.authorization?.split(" ")[1];
    let refreshToken = req.headers.refreshtoken?.split(" ")[1];

    if (!accessToken && !refreshToken) {
      throw new Error("Unauthorized");
    }

    if (accessToken) {
      const userData = await decryptToken(accessToken);
      req.userData = { ...userData };
      next();
    } else if (refreshToken) {
      console.log("Token expired");
      const updatedTokens = await refreshAccessToken(refreshToken);

      res.refreshData = {
        accessToken: updatedTokens.accessToken,
        refreshToken: updatedTokens.refreshToken,
      };

      const userData = await decryptToken(updatedTokens.accessToken);

      req.userData = { ...userData };
      next();
    }
  } catch (err) {
    console.log(err);
    const errorMessage = {
      error: err.message,
      function: "AuthMiddleware",
      errorMessage: "Unauthorized",
    };
    next(errorMessage);
  }
}

module.exports = { authMiddleware };
