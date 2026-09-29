const AppError = require('./AppError');

// Basic format check: something@something.something (no spaces).
function isValidEmail(email) {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

// Turn a URL id like "5" into the number 5. Reject "abc", "-1", "1.5", "".
function parseId(value, label) {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(`Invalid ${label} ID`, 400);
  }
  return id;
}

module.exports = { isValidEmail, isNonEmptyString, parseId };