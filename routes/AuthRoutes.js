const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/profile/:userId', authController.updateProfile);
router.delete('/profile/:userId', authController.deleteAccount);

module.exports = router;