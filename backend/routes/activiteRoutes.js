const express = require('express');
const router = express.Router();
const {
	getAllActivites,
	getActivite,
	addActivite,
	updateActivite,
	deleteActivite } = require('../controllers/activiteController.js');

// GET ROUTES for activites
// GET all activites
router.get('/getallactivites', getAllActivites);
// GET an activite
router.get('/getactivite/:id', getActivite);
// POST ROUTES for activites
// POST an activite
router.post('/addactivite', addActivite);
// PUT ROUTES for activites
// PUT an activite
router.put('/updateactivite/:id', updateActivite);
// DELETE ROUTES for activites
// DELETE an activite
router.delete('/deleteactivite/:id', deleteActivite);

module.exports = router;
