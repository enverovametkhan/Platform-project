const jwt = require("jsonwebtoken");
const { decryptToken } = require("@root/utilities/jwt");

async function authMiddleware(req, res, next) {
  try {
    // we accept the token from Headers in the postman but for the sake of this example we use the hardcoded data
    const accessToken = req.headers.authorization?.split(" ")[1];
    console.log(accessToken);

    //   we decrypt JWT token here and save the result in customData
    const userData = await decryptToken(accessToken);

    // then we create a new object inside of the requst object called customData
    // this will ensure that we can have access to it anywhere in the application where req object is present
    // -
    // For TAG:001, thats where we set customData object
    req.userData = {
      ...userData,
    };

    next(); // Continue to the next middleware or route handler
  } catch (err) {
    console.log(err);
    const errorMessage = {
      error: err.message,
      function: "AuthMiddleware",
      errorMessage: "Unauthorized",
    };

    // if an error occured we passed a modifed error object and its passed down to exception filter
    // In "errorHandlers/exceptionFilter.js"
    next(errorMessage); // Pass the error to the error handling middleware
  }
}

module.exports = { authMiddleware };
