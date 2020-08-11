const { verify } = require("../utils/jwtService");

const alreadyLogin = (req, res, next) => {
  const payload = verify(req.cookies.jwt);
  if (payload) {
    res.redirect("/friends");
  }
  next();
};

module.exports = alreadyLogin;
