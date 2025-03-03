require("dotenv").config();

const jwt = require("jsonwebtoken");
const { SIGN } = process.env;

const revokedTokens = new Set();

const createToken = (userId, role) => {
  return jwt.sign({ userId: userId, roles: role }, SIGN, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, SIGN);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

const getClaimFromToken = (token, claim) => {
  try {
    const decoded = jwt.verify(token, SIGN);
    return decoded[claim];
  } catch (error) {
    return { valid: false, error: error.message };
  }
};

const revokeToken = (token) => {
  revokedTokens.add(token);
};

const isRevokedToken = (token) => {
  return revokedTokens.has(token);
}

module.exports = { createToken, verifyToken, getClaimFromToken, revokeToken, isRevokedToken};
