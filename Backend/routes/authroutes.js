const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authProtect = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authProtect.protect, authController.getMe);
router.put('/profile', authProtect.protect, authController.updateProfile);

module.exports = router;