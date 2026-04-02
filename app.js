// app.js
const express = require('express');
const { requestLogger, errorLogger } = require('./middleware/requestLogger');

const app = express();
app.use(express.json());

// ✅ Mount request logger FIRST (before routes)
app.use(requestLogger);

// Example routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.get('/error-test', (req, res, next) => {
  // Simulate an error
  next(new Error('Something went wrong!'));
});

// ✅ Mount error logger LAST (after all routes)
app.use(errorLogger);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});