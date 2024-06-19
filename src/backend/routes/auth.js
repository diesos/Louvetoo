const express = require('express');
const authController = require('../controllers/auth');
const dashboardController = require('../controllers/dashboard');
const { protectRoute } = require('../auth');

const router = express.Router();
router.get('/register', authController.registerView);
router.get('/login', authController.loginView);
router.get('/logout', authController.logoutUser);
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/', protectRoute, dashboardController.dashboardView);

module.exports = router;
