const jwt = require("jsonwebtoken");

const jwtSecretKey = process.env.JWT_KEY;

async function createToken(payload, expiration) {
  try {
    return await jwt.sign(payload, jwtSecretKey, { expiresIn: expiration });
  } catch (error) {
    throw new Error("Error creating JWT token");
  }
}

async function decryptToken(token) {
  try {
    return await jwt.verify(token, jwtSecretKey);
  } catch (error) {
    throw error;
  }
}

module.exports = { createToken, decryptToken };
