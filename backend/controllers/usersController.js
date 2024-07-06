const Users = require('../models/Users');


// GET all Userren
const getAllUsers = async (req, res) => {
	  try {
	const User = await Users.findAll();
	if (!User) {
	  return res.status(404).json({ error: "No User found" });
	}
	res.status(200).send({
		succes: true,
		message: "All Users",
		totalUsers: User.length,
		data: User
	});
  } catch (error) {
	res.status(500).json({ error: error.message });
  }
};
// Find a User by id
const getUser = async (req, res) => {
	const { id } = req.params;
	try {
	  const User = await Users.findOne({ where: { id } });
	  if (!User) {
		return res.status(404).json({
			succes: false,
			error: "User not found"
			});
	  }
	  res.status(200).send({
		succes: true,
		message: "User found",
		data: User
	  })
	} catch (error) {
		res.status(500).json({
			succes: false,
			message: "User not found",
			error: error.message });
	}
};
// Add a User
const addUser = async (req, res) => {
	const { prenom, nom, email, password, telephone, role } = req.body;
	try {
	  const User = await Users.create({
		prenom,
		nom,
		email,
		password,
		telephone,
		role
	  });
	  res.status(201).send({
		succes: true,
		message: "User created",
		data: User
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }

const updateUser = async (req, res) => {
	const { id } = req.params;
	const { prenom, nom, email, password, telephone, role } = req.body;
	try {
	  const User = await Users.findOne({ where: { id } });
	  if (!User) {
		return res.status(404).json({ error: "User not found" });
	  }
	  User.prenom = prenom;
	  User.nom = nom;
	  User.email = email;
	  User.password = password;
	  User.telephone = telephone;
	  User.role = role;
	  await User.save();
	  res.status(200).send({
		succes: true,
		message: "User updated",
		data: User
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }

const deleteUser = async (req, res) => {
	const { id } = req.params;
	try {
	  const User = await Users.findOne({ where: { id } });
	  if (!User) {
		return res.status(404).json({ error: "User not found" });
	  }
	  await User.destroy();
	  res.status(200).send({
		succes: true,
		message: "User deleted",
		data: User
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }

  module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };
