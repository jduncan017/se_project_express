// Custom Error Classes
class BadRequestError extends Error {
  constructor(message) {
    super(message || "Invalid data provided.");
    this.status = 400;
    this.name = "BadRequestError";
  }
}

class IncorrectCredentialsError extends Error {
  constructor(message) {
    super(message || "Incorrect Email or Password.");
    this.status = 401;
    this.name = "IncorrectCredentialsError";
  }
}

class UserPermissionError extends Error {
  constructor(message) {
    super(
      message ||
        "Forbidden: You do not have permission to perform this action.",
    );
    this.status = 403;
    this.name = "UserPermissionError";
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message || "Resource not found.");
    this.status = 404;
    this.name = "NotFoundError";
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message || "Resource already exists.");
    this.status = 409;
    this.name = "ConflictError";
  }
}

class InternalServerError extends Error {
  constructor(message) {
    super(message || "An error occurred on the server.");
    this.status = 500;
    this.name = "InternalServerError";
  }
}

// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    return res
      .status(err.status || 500)
      .send({ name: err.name, message: err.message });
  }
  return res.status(500).send({
    name: "UnknownError",
    message: "An unexpected server error occurred.",
  });
};

module.exports = {
  BadRequestError,
  NotFoundError,
  ConflictError,
  IncorrectCredentialsError,
  UserPermissionError,
  InternalServerError,
  errorHandler,
};
