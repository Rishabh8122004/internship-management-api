const AppError = require('./AppError');
const { isValidEmail, isNonEmptyString } = require('./validation');

// Checks the request body and returns a clean student object.
// Only the fields we know are copied, so a client can't sneak in extra fields (like "id").
function validateStudentInput(body) {
  const data = body || {}; // body is undefined if no JSON was sent

  if (!isNonEmptyString(data.name)) {
    throw new AppError('Name is required', 400);
  }
  if (!isValidEmail(data.email)) {
    throw new AppError('Valid email is required', 400);
  }
  if (!isNonEmptyString(data.phone) || !/^\+?[0-9]{10,15}$/.test(data.phone.trim())) {
    throw new AppError('Valid phone number is required (10 to 15 digits)', 400);
  }
  if (!isNonEmptyString(data.college)) {
    throw new AppError('College is required', 400);
  }
  if (!isNonEmptyString(data.course)) {
    throw new AppError('Course is required', 400);
  }
  if (!Number.isInteger(data.graduationYear) || data.graduationYear < 2000 || data.graduationYear > 2100) {
    throw new AppError('Graduation year must be a valid year, for example 2027', 400);
  }

  // skills is optional, but if it is given it must be an array of non-empty text.
  let skills = [];
  if (data.skills !== undefined) {
    const isValidList = Array.isArray(data.skills) && data.skills.every(isNonEmptyString);
    if (!isValidList) {
      throw new AppError('Skills must be an array of non-empty text values', 400);
    }
    skills = data.skills.map((skill) => skill.trim());
  }

  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(), // lowercase so duplicate checks are reliable
    phone: data.phone.trim(),
    college: data.college.trim(),
    course: data.course.trim(),
    graduationYear: data.graduationYear,
    skills: skills,
  };
}

module.exports = { validateStudentInput };