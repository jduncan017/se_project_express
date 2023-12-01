module.exports = class UserPermissionError extends Error {
  constructor(message) {
    super(
      message ||
        "Forbidden: You do not have permission to perform this action.",
    );
    this.status = 403;
    this.name = "UserPermissionError";
  }
};
