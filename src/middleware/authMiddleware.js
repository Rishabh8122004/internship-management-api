const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

// Protects a route: only requests with a valid JWT may continue.
function authMiddleware(req, res, next) {
  // 1. Read the Authorization header (Node lowercases header names).
  const authHeader = req.headers.authorization;

  // 2. It must look like: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError('Access denied. No token provided', 401);
  }
  const token = authHeader.split(' ')[1];

  // 3. Verify the signature and expiry. jwt.verify throws if anything is wrong.
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new AppError('Token has expired. Please log in again', 401);
    }
    throw new AppError('Invalid token', 401);
  }

  // 4. Attach the token's data to the request for later code to use.
  req.user = decoded;

  // 5. Allow the request to continue to the route's controller.
  next();
}

module.exports = { authMiddleware };