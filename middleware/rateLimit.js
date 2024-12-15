const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes window
    max: 200, // Limit each IP to 200 requests per window
    message: {
      status: 'error',
      message: 'Too many requests from this IP, please try again after 10 minutes'
    }
  });

  module.exports = limiter;