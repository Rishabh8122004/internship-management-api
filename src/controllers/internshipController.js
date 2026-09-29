const AppError = require('../utils/AppError');
const { parseId, sameText } = require('../utils/validation');
const { validateInternshipInput } = require('../utils/internshipValidator');
const internshipModel = require('../models/internshipModel');

// GET /api/internships
// Optional filters: ?domain= &mode= &status= &skill= &search=  (they can be combined)
function getInternships(req, res) {
  let internships = internshipModel.getAllInternships();
  const { domain, mode, status, skill, search } = req.query;

  if (domain) {
    internships = internships.filter((internship) => sameText(internship.domain, domain));
  }
  if (mode) {
    internships = internships.filter((internship) => sameText(internship.mode, mode));
  }
  if (status) {
    internships = internships.filter((internship) => sameText(internship.status, status));
  }
  if (skill) {
    internships = internships.filter((internship) =>
      internship.skillsRequired.some((s) => sameText(s, skill))
    );
  }
  if (search) {
    // Partial match on the title, ignoring upper/lower case.
    const text = String(search).toLowerCase();
    internships = internships.filter((internship) => internship.title.toLowerCase().includes(text));
  }

  res.status(200).json({ success: true, count: internships.length, data: internships });
}

// GET /api/internships/:id
function getInternship(req, res) {
  const id = parseId(req.params.id, 'internship');
  const internship = internshipModel.findInternshipById(id);

  if (!internship) {
    throw new AppError('Internship not found', 404);
  }
  res.status(200).json({ success: true, data: internship });
}

// POST /api/internships
function createInternship(req, res) {
  const internshipData = validateInternshipInput(req.body);
  const newInternship = internshipModel.addInternship(internshipData);
  res.status(201).json({
    success: true,
    message: 'Internship created successfully',
    data: newInternship,
  });
}

// PUT /api/internships/:id  (replaces the whole record)
function updateInternship(req, res) {
  const id = parseId(req.params.id, 'internship');

  if (!internshipModel.findInternshipById(id)) {
    throw new AppError('Internship not found', 404);
  }

  const internshipData = validateInternshipInput(req.body);
  const updatedInternship = internshipModel.replaceInternship(id, internshipData);
  res.status(200).json({
    success: true,
    message: 'Internship updated successfully',
    data: updatedInternship,
  });
}

// DELETE /api/internships/:id
function deleteInternship(req, res) {
  const id = parseId(req.params.id, 'internship');
  const deletedInternship = internshipModel.removeInternship(id);

  if (!deletedInternship) {
    throw new AppError('Internship not found', 404);
  }
  res.status(200).json({
    success: true,
    message: 'Internship deleted successfully',
    data: deletedInternship,
  });
}

module.exports = {
  getInternships,
  getInternship,
  createInternship,
  updateInternship,
  deleteInternship,
};