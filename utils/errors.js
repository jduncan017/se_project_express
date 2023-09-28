// Error codes
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

// Error handling function
const handleErrors = (err, res) => {
  switch (err.name) {
    case "ValidationError":
      res.status(BAD_REQUEST).send({ message: "Invalid data provided.", err });
      break;
    case "CastError":
      res.status(BAD_REQUEST).send({ message: "Resource not found.", err });
      break;
    case "DocumentNotFoundError":
      res.status(NOT_FOUND).send({ message: "Item Id not found.", err });
      break;
    default:
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "An error occurred on the server.", err });
  }
};

module.exports = {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  handleErrors,
};
