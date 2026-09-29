const AppError = require('../utils/AppError');
const { parseId, sameText } = require('../utils/validation');
const { validateApplicationInput } = require('../utils/applicationValidator');
const { getTodayString } = require('../utils/dateUtils');
const applicationModel = require('../models/applicationModel');
const studentModel = require('../models/studentModel');
const internshipModel = require('../models/internshipModel');

// The relationship check: the student and internship must really exist.
function checkReferencesExist(studentId, internshipId) {
  if (!studentModel.findStudentById(studentId)) {
    throw new AppError('Student does not exist for the given studentId', 400);
  }
  if (!internshipModel.findInternshipById(internshipId)) {
    throw new AppError('Internship does not exist for the given internshipId', 400);
  }
}

// GET /api/applications   (optional filters: ?status= &studentId= &internshipId=)
function getApplications(req, res) {
  let applications = applicationModel.getAllApplications();
  const { status, studentId, internshipId } = req.query;

  if (status) {
    applications = applications.filter((application) => sameText(application.status, status));
  }
  if (studentId) {
    applications = applications.filter((application) => application.studentId === Number(studentId));
  }
  if (internshipId) {
    applications = applications.filter(
      (application) => application.internshipId === Number(internshipId)
    );
  }

  res.status(200).json({ success: true, count: applications.length, data: applications });
}

// GET /api/applications/:id
function getApplication(req, res) {
  const id = parseId(req.params.id, 'application');
  const application = applicationModel.findApplicationById(id);

  if (!application) {
    throw new AppError('Application not found', 404);
  }
  res.status(200).json({ success: true, data: application });
}

// POST /api/applications
function createApplication(req, res) {
  const data = validateApplicationInput(req.body);
  checkReferencesExist(data.studentId, data.internshipId);

  if (applicationModel.findApplicationByPair(data.studentId, data.internshipId)) {
    throw new AppError('This student has already applied to this internship', 409);
  }

  const newApplication = applicationModel.addApplication({
    studentId: data.studentId,
    internshipId: data.internshipId,
    applicationDate: data.applicationDate || getTodayString(), // default: today
    status: data.status || 'Applied', // default status
  });

  res.status(201).json({
    success: true,
    message: 'Application created successfully',
    data: newApplication,
  });
}

// PUT /api/applications/:id
function updateApplication(req, res) {
  const id = parseId(req.params.id, 'application');
  const existing = applicationModel.findApplicationById(id);

  if (!existing) {
    throw new AppError('Application not found', 404);
  }

  const data = validateApplicationInput(req.body);
  checkReferencesExist(data.studentId, data.internshipId);

  // The pair may stay the same for this application, but must not match a different one.
  const duplicate = applicationModel.findApplicationByPair(data.studentId, data.internshipId);
  if (duplicate && duplicate.id !== id) {
    throw new AppError('This student has already applied to this internship', 409);
  }

  const updatedApplication = applicationModel.replaceApplication(id, {
    studentId: data.studentId,
    internshipId: data.internshipId,
    applicationDate: data.applicationDate || existing.applicationDate, // keep old if not sent
    status: data.status || existing.status, // keep old if not sent
  });

  res.status(200).json({
    success: true,
    message: 'Application updated successfully',
    data: updatedApplication,
  });
}

// DELETE /api/applications/:id
function deleteApplication(req, res) {
  const id = parseId(req.params.id, 'application');
  const deletedApplication = applicationModel.removeApplication(id);

  if (!deletedApplication) {
    throw new AppError('Application not found', 404);
  }
  res.status(200).json({
    success: true,
    message: 'Application deleted successfully',
    data: deletedApplication,
  });
}

module.exports = {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
};