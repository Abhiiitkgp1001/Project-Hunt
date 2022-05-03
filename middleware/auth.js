const jwt = require("jsonwebtoken");
const config = require("config");
const jwtTokenKey = config.get("jwtTokenKey");
const protection = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(251).json({ error: "No token, Authorisation failed" });
  }
  try {
    const decriypted = jwt.verify(token, jwtTokenKey);
    req.user = decriypted.user;
    next();
  } catch (err) {
    return res.status(251).json({ error: "Token Expired" });
  }
};

module.exports = protection;
