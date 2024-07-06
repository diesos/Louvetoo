const Enfant = require('../models/Enfant');


// GET all children
const getAllChildren = async (req, res) => {
	  try {
	const children = await Enfant.findAll();
	if (!children) {
	  return res.status(404).json({ error: "No children found" });
	}
	res.status(200).send({
		succes: true,
		message: "All children",
		totalChildren: children.length,
		data: children
	});
  } catch (error) {
	res.status(500).json({ error: error.message });
  }
};
// Find a child by id
const getChild = async (req, res) => {
	const { id } = req.params;
	try {
	  const child = await Enfant.findOne({ where: { id } });
	  if (!child) {
		return res.status(404).json({
			succes: false,
			error: "Child not found"
			});
	  }
	  res.status(200).send({
		succes: true,
		message: "Child found",
		data: child
	  })
	} catch (error) {
		res.status(500).json({
			succes: false,
			message: "Child not found",
			error: error.message });
	}
};
// Add a child
const addChild = async (req, res) => {
	const { prenom, nom, date_naissance, allergie, diet} = req.body;
	try {
	  const child = await Enfant.create({
		prenom,
		nom,
		date_naissance,
		allergie,
		diet
	  });
	  res.status(201).send({
		succes: true,
		message: "Child created",
		data: child
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }

const updateChild = async (req, res) => {
	const { id } = req.params;
	const { prenom, nom, date_naissance, allergie, diet } = req.body;
	try {
	  const child = await Enfant.findOne({ where: { id } });
	  if (!child) {
		return res.status(404).json({ error: "Child not found" });
	  }
	  child.prenom = prenom;
	  child.nom = nom;
	  child.date_naissance = date_naissance;
	  child.allergie = allergie;
	  child.diet = diet;
	  await child.save();
	  res.status(200).send({
		succes: true,
		message: "Child updated",
		data: child
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }

const deleteChild = async (req, res) => {
	const { id } = req.params;
	try {
	  const child = await Enfant.findOne({ where: { id } });
	  if (!child) {
		return res.status(404).json({ error: "Child not found" });
	  }
	  await child.destroy();
	  res.status(200).send({
		succes: true,
		message: "Child deleted",
		data: child
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
  }



module.exports = { getAllChildren, getChild, addChild, updateChild, deleteChild};
