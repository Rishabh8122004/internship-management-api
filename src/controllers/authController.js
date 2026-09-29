const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { validateRegisterInput, validateLoginInput } = require('../utils/authValidator');
const userModel = require('../models/userModel');

// POST /api/auth/register
async function register(req, res) {
  const { name, email, password } = validateRegisterInput(req.body);

  if (userModel.findUserByEmail(email)) {
    throw new AppError('A user with this email already exists', 409);
  }

  // Store only the hash, never the real password.
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = userModel.addUser({ name, email, passwordHash });

  // Send back safe fields only (no passwordHash).
  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
}

// POST /api/auth/login
async function login(req, res) {
  const { email, password } = validateLoginInput(req.body);

  // Same message for "no such email" and "wrong password", so attackers learn nothing.
  const user = userModel.findUserByEmail(email);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  // bcrypt hashes the attempt with the same salt and compares it to the stored hash.
  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    throw new AppError('Invalid email or password', 401);
  }

  // Create a signed token containing who the user is. It expires after JWT_EXPIRES_IN.
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });

  res.status(200).json({ success: true, message: 'Login successful', token });
}

module.exports = { register, login };