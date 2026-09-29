const AppError = require('./AppError');
const { isNonEmptyString, normalizeChoice, cleanStringList } = require('./validation');

const ALLOWED_MODES = ['Remote', 'Onsite', 'Hybrid'];
const ALLOWED_STATUSES = ['Open', 'Closed'];

// Checks the request body and returns a clean internship object.
function validateInternshipInput(body) {
  const data = body || {};

  if (!isNonEmptyString(data.title)) {
    throw new AppError('Title is required', 400);
  }
  if (!isNonEmptyString(data.domain)) {
    throw new AppError('Domain is required', 400);
  }
  if (!isNonEmptyString(data.duration)) {
    throw new AppError('Duration is required (for example "8 weeks")', 400);
  }
  if (!isNonEmptyString(data.description)) {
    throw new AppError('Description is required', 400);
  }

  const mode = normalizeChoice(data.mode, ALLOWED_MODES);
  if (!mode) {
    throw new AppError(`Mode must be one of: ${ALLOWED_MODES.join(', ')}`, 400);
  }

  // status is optional and defaults to "Open"; if it is sent it must be valid.
  let status = 'Open';
  if (data.status !== undefined) {
    status = normalizeChoice(data.status, ALLOWED_STATUSES);
    if (!status) {
      throw new AppError(`Status must be one of: ${ALLOWED_STATUSES.join(', ')}`, 400);
    }
  }

  const skillsRequired = cleanStringList(
    data.skillsRequired,
    'skillsRequired must be an array of non-empty text values'
  );

  return {
    title: data.title.trim(),
    domain: data.domain.trim(),
    duration: data.duration.trim(),
    description: data.description.trim(),
    skillsRequired: skillsRequired,
    mode: mode,
    status: status,
  };
}

module.exports = { validateInternshipInput };