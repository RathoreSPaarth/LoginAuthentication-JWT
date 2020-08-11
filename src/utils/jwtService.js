const jwt = require("jsonwebtoken");

const sign = (payload) => {
  return jwt.sign(payload, "!@#$qwerty", {
    expiresIn: "3 hours"
  });
};

const verify = (token) => {
  try {
    return jwt.verify(token, "!@#$qwerty");
  } catch (e) {
    console.error(e);
    return false;
  }
};

exports.sign = sign;
exports.verify = verify;
