const AppError = require('./AppError');
const { normalizeChoice } = require('./validation');
const { isRealDate } = require('./dateUtils');

const ALLOWED_STATUSES = ['Applied', 'Under Review', 'Selected', 'Rejected', 'Completed'];

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

// Checks the shape of the request body. It does NOT check that the student/internship
// exist; the controller does that, because it needs the models.
// applicationDate and status are null when not sent (the controller picks the default).
function validateApplicationInput(body) {
  const data = body || {};

  if (!isPositiveInteger(data.studentId)) {
    throw new AppError('Valid studentId is required', 400);
  }
  if (!isPositiveInteger(data.internshipId)) {
    throw new AppError('Valid internshipId is required', 400);
  }

  let status = null;
  if (data.status !== undefined) {
    status = normalizeChoice(data.status, ALLOWED_STATUSES);
    if (!status) {
      throw new AppError(`Status must be one of: ${ALLOWED_STATUSES.join(', ')}`, 400);
    }
  }

  let applicationDate = null;
  if (data.applicationDate !== undefined) {
    if (!isRealDate(data.applicationDate)) {
      throw new AppError('applicationDate must be a valid date in YYYY-MM-DD format', 400);
    }
    applicationDate = data.applicationDate;
  }

  return {
    studentId: data.studentId,
    internshipId: data.internshipId,
    applicationDate: applicationDate,
    status: status,
  };
}

module.exports = { validateApplicationInput };