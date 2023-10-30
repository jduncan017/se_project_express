// ERROR CODES
const ERROR_CODES = {
  BAD_REQUEST: { status: 400, message: "Invalid data provided." },
  NOT_FOUND: { status: 404, message: "Router resource not found." },
  TOO_MANY_REQUESTS: { status: 429, message: "Rate Limit Exceeded." },
  EMAIL_EXISTS: { status: 409, message: "Email already exists." },
  USER_NOT_FOUND: { status: 404, message: "User not found." },
  INVALID_PASSWORD: {
    status: 400,
    message: "Password does not meet complexity requirements.",
  },
  INCORRECT_CREDENTIALS: {
    status: 401,
    message: "Incorrect Email or Password.",
  },
  USER_PERMISSION: {
    status: 403,
    message: "Forbidden: You do not have permission to perform this action.",
  },
  AUTH_HEADER: {
    status: 401,
    message: "Authorization header must be provided.",
  },
  INVALID_TOKEN: {
    status: 401,
    message: "Invalid token.",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "An error occurred on the server.",
  },
};

// ERROR HANDLING FUNCTION
const handleErrors = (err, res) => {
  let errorObject;
  if (err instanceof Error) {
    switch (err.name) {
      case "ValidationError":
        errorObject = ERROR_CODES.BAD_REQUEST;
        break;
      case "CastError":
        errorObject = ERROR_CODES.BAD_REQUEST;
        break;
      case "DocumentNotFoundError":
        errorObject = ERROR_CODES.NOT_FOUND;
        break;
      case "RateLimitError":
        errorObject = ERROR_CODES.TOO_MANY_REQUESTS;
        break;
      default:
        errorObject = ERROR_CODES.INTERNAL_SERVER_ERROR;
        break;
    }
  } else {
    errorObject = ERROR_CODES[err];
  }
  if (errorObject) {
    res.status(errorObject.status).send({ message: errorObject.message });
  } else {
    res.status(500).send({ message: "Internal server error." });
  }
};

module.exports = {
  ERROR_CODES,
  handleErrors,
};
