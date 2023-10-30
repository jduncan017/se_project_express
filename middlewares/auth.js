const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleErrors } = require("../utils/errors");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return handleErrors("AUTH_HEADER", res);
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return handleErrors("INVALID_TOKEN", res);
  }
};

module.exports = auth;
