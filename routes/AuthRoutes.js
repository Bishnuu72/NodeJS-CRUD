const express = require('express');
const router = express.Router();
const authController = require('../controller/AuthController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/update/:userId', authController.updateProfile);
router.delete('/delete/:userId', authController.deleteAccount);

module.exports = router;