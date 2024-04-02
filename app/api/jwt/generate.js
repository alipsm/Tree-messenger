const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

function generateJWT(data) {
  dotenv.config();
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
  return token;
}

function decodeJWT(token) {
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decode;
}

module.exports = { generateJWT, decodeJWT };