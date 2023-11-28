const { ERROR_CODES } = require("./error-codes");

class ServerError extends Error {
  constructor(code) {
    super(ERROR_CODES[code].message);
    this.status = ERROR_CODES[code].status;
    this.name = ERROR_CODES[code].name;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof ServerError) {
    return res
      .status(err.status)
      .send({ name: err.name, message: err.message });
  }
  return res.status(500).send({
    name: "Unknown error",
    message: "An error occurred on the server.",
  });
};

module.exports = { ServerError, errorHandler };
