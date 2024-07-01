// const express = require('express');
// const dashboardController = require('../controllers/dashboard');

// const router = express.Router();
// router.get('/', dashboardController.dashboardView);

// module.exports = router;

const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');
const { protectRoute } = require('../auth');

router.get('/dashboard', protectRoute, dashboardController.dashboardView);

module.exports = router;
