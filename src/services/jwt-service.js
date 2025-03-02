require('dotenv').config();

const jwt = require("jsonwebtoken");
const { SIGN } = process.env;

const createToken = (userId, role) => {
  console.log(SIGN);
  
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

module.exports = { createToken, verifyToken, getClaimFromToken }