const express = require('express');
const {
  getApplications,
  getApplication,
  createApplication,
  updateApplication,
  deleteApplication,
} = require('../controllers/applicationController');

const router = express.Router();

router.post('/', createApplication);
router.get('/', getApplications);
router.get('/:id', getApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;