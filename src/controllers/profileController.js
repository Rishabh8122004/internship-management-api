const AppError = require('../utils/AppError');
const userModel = require('../models/userModel');

// GET /api/profile   (authMiddleware has already put the token data in req.user)
function getProfile(req, res) {
  const user = userModel.findUserById(req.user.id);

  // The token can be valid for a user who no longer exists in the file.
  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Send back safe fields only (never passwordHash).
  res.status(200).json({
    success: true,
    data: { id: user.id, name: user.name, email: user.email },
  });
}

module.exports = { getProfile };