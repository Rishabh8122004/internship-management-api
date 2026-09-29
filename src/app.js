const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware: parse incoming JSON bodies into req.body.
app.use(express.json());

// Health check route: lets us (and later, other services) confirm the API is alive.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
  });
});

// Every URL starting with /api/students is handled by studentRoutes.
app.use('/api/students', studentRoutes);

// ORDER MATTERS: these two must come after all routes.
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;