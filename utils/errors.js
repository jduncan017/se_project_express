// Error codes
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const TOO_MANY_REQUESTS = 429;
const INTERNAL_SERVER_ERROR = 500;
const EMAIL_EXISTS = "EmailAlreadyExists";
const USER_NOT_FOUND = "UserNotFound";
const INCORRECT_CREDENTIALS = "IncorrectCredentials";
const USER_PERMISSION =
  "Forbidden: You do not have permission to perform this action.";

// Error handling function
const handleErrors = (err, res) => {
  if (err.name === "Error") {
    err.name = null;
  }
  console.log(`name: ${err.name}`, `message: ${err.message}`);
  switch (err.name || err.message) {
    case "ValidationError":
      res.status(BAD_REQUEST).send({ message: "Invalid data provided." });
      break;
    case "CastError":
      res.status(BAD_REQUEST).send({ message: "Resource not found." });
      break;
    case "DocumentNotFoundError":
      res.status(NOT_FOUND).send({ message: "Item Id not found." });
      break;
    case "RateLimitError":
      res.status(TOO_MANY_REQUESTS).send({ message: err.message });
      break;
    case EMAIL_EXISTS:
      res.status(409).send({ message: "Email already exists." });
      break;
    case USER_NOT_FOUND:
      res.status(NOT_FOUND).send({ message: "User not found." });
      break;
    case INCORRECT_CREDENTIALS:
      res.status(401).send({ message: "Incorrect Email or Password" });
      break;
    case USER_PERMISSION:
      res.status(403).send({ message: USER_PERMISSION });
      break;
    default:
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server." });
  }
};

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  TOO_MANY_REQUESTS,
  INTERNAL_SERVER_ERROR,
  EMAIL_EXISTS,
  USER_NOT_FOUND,
  INCORRECT_CREDENTIALS,
  USER_PERMISSION,
  handleErrors,
};
