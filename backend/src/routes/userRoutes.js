const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers/userController');
const { protect } = require('../../utils/authMiddleware');

router.get('/:id', protect, getUser);

module.exports = router;
