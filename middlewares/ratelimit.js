const rateLimit = require('express-rate-limit');

// Create a rate limiter middleware
const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 login requests per `window` (here, per minute)
  message: 'Too many login attempts from this IP, please try again after a minute'
});


module.exports = {loginLimiter}