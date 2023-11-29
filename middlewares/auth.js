const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { InvalidCredentialsError } = require("./error-handler/error-handler");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(InvalidCredentialsError("Authorization token not provided"));
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return next(InvalidCredentialsError("Invalid token"));
  }
};

module.exports = auth;
