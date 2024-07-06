const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const {
	getAllUsers,
	getUser,
	addUser,
	updateUser,
	deleteUser} = require('../controllers/usersController');

// GET ROUTES for users
// GET all users
router.get('/getallusers', getAllUsers);
// GET a user
router.get('/getuser/:id', getUser);
// POST ROUTES for users
// POST a user
router.post('/adduser', addUser);
// PUT ROUTES for users
// PUT a user
router.put('/updateuser/:id', updateUser);
// DELETE ROUTES for users
// DELETE a user
router.delete('/deleteuser/:id', deleteUser);

module.exports = router;
