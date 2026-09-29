const { readData, writeData, getNextId } = require('../utils/jsonDb');

const FILE_NAME = 'internships';

function getAllInternships() {
  return readData(FILE_NAME);
}

function findInternshipById(id) {
  return readData(FILE_NAME).find((internship) => internship.id === id);
}

function addInternship(internshipData) {
  const internships = readData(FILE_NAME);
  const newInternship = { id: getNextId(internships), ...internshipData };
  internships.push(newInternship);
  writeData(FILE_NAME, internships);
  return newInternship;
}

// Returns the updated internship, or null if the id does not exist.
function replaceInternship(id, internshipData) {
  const internships = readData(FILE_NAME);
  const index = internships.findIndex((internship) => internship.id === id);
  if (index === -1) {
    return null;
  }
  internships[index] = { id: id, ...internshipData };
  writeData(FILE_NAME, internships);
  return internships[index];
}

// Returns the deleted internship, or null if the id does not exist.
function removeInternship(id) {
  const internships = readData(FILE_NAME);
  const index = internships.findIndex((internship) => internship.id === id);
  if (index === -1) {
    return null;
  }
  const removed = internships.splice(index, 1)[0];
  writeData(FILE_NAME, internships);
  return removed;
}

module.exports = {
  getAllInternships,
  findInternshipById,
  addInternship,
  replaceInternship,
  removeInternship,
};