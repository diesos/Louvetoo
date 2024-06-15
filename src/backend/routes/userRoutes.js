// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Example route for user actions
router.get('/profile', (req, res) => {
    // User profile logic here
    res.send('User profile route');
});

router.put('/update', (req, res) => {
    // User update logic here
    res.send('User update route');
});

module.exports = router;
