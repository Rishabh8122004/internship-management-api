const express = require('express');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const { requestLogger } = require('./middleware/loggerMiddleware');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware runs in this order for every request:
// logger -> JSON parser -> routes -> (not found) -> (error handler)
app.use(requestLogger);
app.use(express.json());

// Health check route: lets us (and later, other services) confirm the API is alive.
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
  });
});

// Every URL starting with /api/students is handled by studentRoutes (same idea for the others).
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/applications', applicationRoutes);

// ORDER MATTERS: these two must come after all routes.
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;