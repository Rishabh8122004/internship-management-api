// Runs when no route matched the request.
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
}

// Every thrown error ends up here. Express recognizes an error handler
// by its 4 parameters (err, req, res, next), so keep all 4 even if "next" is unused.
function errorHandler(err, req, res, next) {
  // express.json() throws this when the body is not valid JSON (e.g. a missing comma).
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid JSON in request body' });
  }

  const statusCode = err.statusCode || 500;

  // Unexpected errors: log the details for us, but don't leak them to the client.
  if (statusCode === 500) {
    console.error(err);
  }
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;

  res.status(statusCode).json({ success: false, message });
}

module.exports = { notFoundHandler, errorHandler };