module.exports = class InternalServerError extends Error {
  constructor(message) {
    super(message || "An error occurred on the server.");
    this.status = 500;
    this.name = "InternalServerError";
  }
};
