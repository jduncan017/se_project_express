const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { ServerError } = require("./error-handler/error-handler");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(ServerError("AUTH_HEADER"));
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return next(ServerError("INVALID_TOKEN"));
  }
};

module.exports = auth;
