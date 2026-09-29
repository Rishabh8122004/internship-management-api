const { readData, writeData, getNextId } = require('../utils/jsonDb');

const FILE_NAME = 'applications';

function getAllApplications() {
  return readData(FILE_NAME);
}

function findApplicationById(id) {
  return readData(FILE_NAME).find((application) => application.id === id);
}

// Used to stop the same student applying to the same internship twice.
function findApplicationByPair(studentId, internshipId) {
  return readData(FILE_NAME).find(
    (application) => application.studentId === studentId && application.internshipId === internshipId
  );
}

function addApplication(applicationData) {
  const applications = readData(FILE_NAME);
  const newApplication = { id: getNextId(applications), ...applicationData };
  applications.push(newApplication);
  writeData(FILE_NAME, applications);
  return newApplication;
}

// Returns the updated application, or null if the id does not exist.
function replaceApplication(id, applicationData) {
  const applications = readData(FILE_NAME);
  const index = applications.findIndex((application) => application.id === id);
  if (index === -1) {
    return null;
  }
  applications[index] = { id: id, ...applicationData };
  writeData(FILE_NAME, applications);
  return applications[index];
}

// Returns the deleted application, or null if the id does not exist.
function removeApplication(id) {
  const applications = readData(FILE_NAME);
  const index = applications.findIndex((application) => application.id === id);
  if (index === -1) {
    return null;
  }
  const removed = applications.splice(index, 1)[0];
  writeData(FILE_NAME, applications);
  return removed;
}

module.exports = {
  getAllApplications,
  findApplicationById,
  findApplicationByPair,
  addApplication,
  replaceApplication,
  removeApplication,
};