// utils/logger.js
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');
const logFile = path.join(logDir, 'app.log');

// Ensure logs directory exists
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Open a persistent append stream — non-blocking, no memory accumulation
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

function formatLog(level, message, meta = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
  return JSON.stringify(entry) + '\n';
}

function info(message, meta) {
  logStream.write(formatLog('INFO', message, meta));
}

function error(message, meta) {
  logStream.write(formatLog('ERROR', message, meta));
}

module.exports = { info, error };