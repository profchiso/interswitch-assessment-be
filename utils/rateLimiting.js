const { rateLimit } = require("express-rate-limit");

const rateLimiter = (limit = 10, minutes = 10) => {
  return rateLimit({
    windowMs: minutes * 60 * 1000,
    limit,
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false,
  });
};

module.exports = { rateLimiter };
