const jwt = require("jsonwebtoken");

const jwtSecretKey = "super_secret_key";

async function authMiddleware(req, res, next) {
  try {
    // we accept the token from Headers in the postman but for the sake of this example we use the hardcoded data
    let accessToken =
      req.headers.accesstoken ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDUwOWY0ZWQ0Zjk5MTg3YmRlNDdjM2MiLCJlbWFpbCI6Imphc29uYmk5M3FAaG90bWFpbC5jb20iLCJ1c2VybmFtZSI6Imphc29uYmk5MyIsImlhdCI6MTY5Njk0NjE1MSwiZXhwIjoxNzIyODY2MTUxfQ.GG33Rzip7s8NMLrMdg8GNfAXMMFZYxJ-9JwchQXJAyk";

    //   we decrypt JWT token here and save the result in customData
    let userData = await jwt.verify(accessToken, jwtSecretKey);

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
    let errorMessage = {
      ...err,
      function: "AuthMiddleware",
      customMessage: "Unauthorized",
    };

    // if an error occured we passed a modifed error object and its passed down to exception filter
    // In "errorHandlers/exceptionFilter.js"
    next(errorMessage); // Pass the error to the error handling middleware
  }
}

module.exports = { authMiddleware };
