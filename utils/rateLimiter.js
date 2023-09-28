const { rateLimit } = require("express-rate-limit");

class RateLimitError extends Error {
  constructor(message) {
    super(message);
    this.name = "RateLimitError";
  }
}

const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 2000,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new RateLimitError("Too many requests, please try again in an hour."));
  },
});

module.exports = { rateLimiter, RateLimitError };
