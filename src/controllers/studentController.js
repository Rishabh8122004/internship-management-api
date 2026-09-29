const AppError = require('../utils/AppError');
const { parseId, sameText } = require('../utils/validation');
const { validateStudentInput } = require('../utils/studentValidator');
const studentModel = require('../models/studentModel');


// GET /api/students   (optional filters: ?course= &college= &graduationYear= &skill=)
function getStudents(req, res) {
  let students = studentModel.getAllStudents();
  const { course, college, graduationYear, skill } = req.query;

  if (course) {
    students = students.filter((student) => sameText(student.course, course));
  }
  if (college) {
    students = students.filter((student) => sameText(student.college, college));
  }
  if (graduationYear) {
    students = students.filter((student) => student.graduationYear === Number(graduationYear));
  }
  if (skill) {
    students = students.filter((student) => student.skills.some((s) => sameText(s, skill)));
  }

  res.status(200).json({ success: true, count: students.length, data: students });
}

// GET /api/students/:id
function getStudent(req, res) {
  const id = parseId(req.params.id, 'student');
  const student = studentModel.findStudentById(id);

  if (!student) {
    throw new AppError('Student not found', 404);
  }
  res.status(200).json({ success: true, data: student });
}

// POST /api/students
function createStudent(req, res) {
  const studentData = validateStudentInput(req.body);

  if (studentModel.findStudentByEmail(studentData.email)) {
    throw new AppError('A student with this email already exists', 409);
  }

  const newStudent = studentModel.addStudent(studentData);
  res.status(201).json({ success: true, message: 'Student created successfully', data: newStudent });
}

// PUT /api/students/:id  (replaces the whole record, so all required fields must be sent)
function updateStudent(req, res) {
  const id = parseId(req.params.id, 'student');

  if (!studentModel.findStudentById(id)) {
    throw new AppError('Student not found', 404);
  }

  const studentData = validateStudentInput(req.body);

  // The email may stay the same for this student, but must not belong to a different one.
  const emailOwner = studentModel.findStudentByEmail(studentData.email);
  if (emailOwner && emailOwner.id !== id) {
    throw new AppError('A student with this email already exists', 409);
  }

  const updatedStudent = studentModel.replaceStudent(id, studentData);
  res.status(200).json({ success: true, message: 'Student updated successfully', data: updatedStudent });
}

// DELETE /api/students/:id
function deleteStudent(req, res) {
  const id = parseId(req.params.id, 'student');
  const deletedStudent = studentModel.removeStudent(id);

  if (!deletedStudent) {
    throw new AppError('Student not found', 404);
  }
  res.status(200).json({ success: true, message: 'Student deleted successfully', data: deletedStudent });
}

module.exports = { getStudents, getStudent, createStudent, updateStudent, deleteStudent };