const AppError = require('./AppError');
const { isValidEmail, isNonEmptyString } = require('./validation');

// Checks the register request body and returns clean values.
function validateRegisterInput(body) {
  const data = body || {};

  if (!isNonEmptyString(data.name)) {
    throw new AppError('Name is required', 400);
  }
  if (!isValidEmail(data.email)) {
    throw new AppError('Valid email is required', 400);
  }
  if (typeof data.password !== 'string' || data.password.length < 6) {
    throw new AppError('Password must be at least 6 characters', 400);
  }

  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    password: data.password, // never trim or change a password
  };
}

// Checks the login request body.
function validateLoginInput(body) {
  const data = body || {};

  if (!isValidEmail(data.email)) {
    throw new AppError('Valid email is required', 400);
  }
  if (typeof data.password !== 'string' || data.password === '') {
    throw new AppError('Password is required', 400);
  }

  return {
    email: data.email.trim().toLowerCase(),
    password: data.password,
  };
}

module.exports = { validateRegisterInput, validateLoginInput };