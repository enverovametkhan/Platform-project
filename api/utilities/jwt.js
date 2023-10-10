const jwt = require("jsonwebtoken");

const jwtSecretKey = "super_secret_key";

async function createToken(payload, expiration) {
  try {
    return await jwt.sign(payload, jwtSecretKey, { expiresIn: expiration });
  } catch (error) {
    throw new Error("Error creating JWT token");
  }
}

async function decryptToken(jwtToken) {
  try {
    return await jwt.verify(jwtToken, jwtSecretKey);
  } catch (error) {
    throw new Error("Error decrypting JWT token");
  }
}

module.exports = { createToken, decryptToken };
