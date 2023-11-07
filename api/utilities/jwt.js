const jwt = require("jsonwebtoken");

const jwtSecretKey = "super_secret_key";

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
