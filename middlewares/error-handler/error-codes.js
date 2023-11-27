const ERROR_CODES = {
  BAD_REQUEST: {
    status: 400,
    message: "Invalid data provided.",
    name: "BadRequestError",
  },
  NOT_FOUND: {
    status: 404,
    message: "Resource not found.",
    name: "NotFoundError",
  },
  TOO_MANY_REQUESTS: {
    status: 429,
    message: "Rate Limit Exceeded.",
    name: "RateLimitExceededError",
  },
  EMAIL_EXISTS: {
    status: 409,
    message: "Email already exists.",
    name: "EmailExistsError",
  },
  USER_NOT_FOUND: {
    status: 404,
    message: "User not found.",
    name: "UserNotFoundError",
  },
  INVALID_PASSWORD: {
    status: 400,
    message: "Password does not meet complexity requirements.",
    name: "InvalidPasswordError",
  },
  INCORRECT_CREDENTIALS: {
    status: 401,
    message: "Incorrect Email or Password.",
    name: "IncorrectCredentialsError",
  },
  USER_PERMISSION: {
    status: 403,
    message: "Forbidden: You do not have permission to perform this action.",
    name: "UserPermissionError",
  },
  AUTH_HEADER: {
    status: 401,
    message: "Authorization header must be provided.",
    name: "AuthHeaderError",
  },
  INVALID_TOKEN: {
    status: 401,
    message: "Invalid token.",
    name: "InvalidTokenError",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "An error occurred on the server.",
    name: "InternalServerError",
  },
};

module.exports = { ERROR_CODES };
