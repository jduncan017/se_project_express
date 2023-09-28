// Error codes
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const TOO_MANY_REQUESTS = 429;
const INTERNAL_SERVER_ERROR = 500;

// Error handling function
const handleErrors = (err, res) => {
  switch (err.name) {
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
  handleErrors,
};
