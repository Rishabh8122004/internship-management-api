const { readData, writeData, getNextId } = require('../utils/jsonDb');

const FILE_NAME = 'students';

function getAllStudents() {
  return readData(FILE_NAME);
}

function findStudentById(id) {
  return readData(FILE_NAME).find((student) => student.id === id);
}

function findStudentByEmail(email) {
  return readData(FILE_NAME).find((student) => student.email === email);
}

function addStudent(studentData) {
  const students = readData(FILE_NAME);
  // "...studentData" copies all fields of studentData into the new object.
  const newStudent = { id: getNextId(students), ...studentData };
  students.push(newStudent);
  writeData(FILE_NAME, students);
  return newStudent;
}

// Returns the updated student, or null if the id does not exist.
function replaceStudent(id, studentData) {
  const students = readData(FILE_NAME);
  const index = students.findIndex((student) => student.id === id);
  if (index === -1) {
    return null;
  }
  students[index] = { id: id, ...studentData };
  writeData(FILE_NAME, students);
  return students[index];
}

// Returns the deleted student, or null if the id does not exist.
function removeStudent(id) {
  const students = readData(FILE_NAME);
  const index = students.findIndex((student) => student.id === id);
  if (index === -1) {
    return null;
  }
  const removed = students.splice(index, 1)[0];
  writeData(FILE_NAME, students);
  return removed;
}

module.exports = {
  getAllStudents,
  findStudentById,
  findStudentByEmail,
  addStudent,
  replaceStudent,
  removeStudent,
};