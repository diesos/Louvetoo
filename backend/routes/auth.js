// const express = require('express');
// const authController = require('../controllers/auth');
// const dashboardController = require('../controllers/dashboard');
// const { protectRoute } = require('../auth');

// const router = express.Router();
// router.get('/register', authController.registerView);
// router.get('/login', authController.loginView);
// router.get('/logout', authController.logoutUser);
// router.post('/register', authController.registerUser);
// router.post('/login', authController.loginUser);
// router.get('/', protectRoute, dashboardController.dashboardView);

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/auth");

// router.post("/register", authController.registerUser);
// router.post("/login", authController.loginUser);
// router.post("/logout", authController.logoutUser);

// // router.get("/profil", authController.getProfile);
// router.get("/profil", authController.getProfile);

// module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/register", authController.registerUser);
router.post("/login", authController.handleLogin);
router.post("/logout", authController.logoutUser);

// Ensure this route is protected
router.get("/profil", ensureAuthenticated, authController.getProfile);

module.exports = router;

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
	  return next();
	}
	res.status(401).json({ error: "User not authenticated" });
  }

