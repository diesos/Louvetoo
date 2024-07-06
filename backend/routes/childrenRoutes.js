const express = require('express');
const router = express.Router();
const {
	getAllChildren,
	getChild,
	addChild,
	updateChild } = require('../controllers/childrenController');

// GET ROUTES for children
// GET all children
router.get('/getallchildren', getAllChildren);
// GET a child
router.get('/getchild/:id', getChild);


// POST ROUTES for children
// POST a child
router.post('/addchild', addChild);

//PUT ROUTES for children
//PUT a child
router.put('/updatechild/:id', updateChild);

module.exports = router;
