// middleware/requestLogger.js
const logger = require('../utils/logger');

function requestLogger(req, res, next) {
  const start = Date.now(); // Capture start time

  // Intercept the response 'finish' event
  res.on('finish', () => {
    const duration = Date.now() - start;

    logger.info('Request handled', {
      method: req.method,
      path: req.originalUrl,
      status: res.statusCode,
      duration_ms: duration,
    });
  });

  next();
}

function errorLogger(err, req, res, next) {
  logger.error('Unhandled error', {
    method: req.method,
    path: req.originalUrl,
    message: err.message,
    stack: err.stack,         // Full stack trace saved to file
  });

  res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = { requestLogger, errorLogger };