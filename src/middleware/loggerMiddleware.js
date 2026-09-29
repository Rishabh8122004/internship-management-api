// Logs one line per request, for example: GET /api/students 200 - 3ms
function requestLogger(req, res, next) {
  const startTime = Date.now();

  // "finish" fires when the response has been sent, so the status code is known by then.
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
  });

  // Pass control to the next middleware. Without this the request would hang.
  next();
}

module.exports = { requestLogger };