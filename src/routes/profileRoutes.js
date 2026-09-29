const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/profileController');

const router = express.Router();

// authMiddleware runs first; getProfile only runs if the token is valid.
router.get('/', authMiddleware, getProfile);

module.exports = router;