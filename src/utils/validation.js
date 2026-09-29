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

// Case-insensitive text comparison, so ?course=cse matches "CSE".
// String() protects us if someone sends ?course=a&course=b (which becomes an array).
function sameText(a, b) {
  return String(a).toLowerCase() === String(b).toLowerCase();
}

// If value matches one of the allowed options (ignoring case), return the official spelling.
// Otherwise return null. Example: "remote" -> "Remote".
function normalizeChoice(value, allowedOptions) {
  if (typeof value !== 'string') {
    return null;
  }
  const found = allowedOptions.find((option) => sameText(option, value.trim()));
  return found || null;
}

// Optional list of text values. Missing -> []. Wrong shape -> 400 error with the given message.
function cleanStringList(value, errorMessage) {
  if (value === undefined) {
    return [];
  }
  if (!Array.isArray(value) || !value.every(isNonEmptyString)) {
    throw new AppError(errorMessage, 400);
  }
  return value.map((item) => item.trim());
}

module.exports = {
  isValidEmail,
  isNonEmptyString,
  parseId,
  sameText,
  normalizeChoice,
  cleanStringList,
};