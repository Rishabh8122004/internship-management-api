const express = require('express');
const {
  getInternships,
  getInternship,
  createInternship,
  updateInternship,
  deleteInternship,
} = require('../controllers/internshipController');

const router = express.Router();

router.get('/', getInternships);
router.get('/:id', getInternship);
router.post('/', createInternship);
router.put('/:id', updateInternship);
router.delete('/:id', deleteInternship);

module.exports = router;