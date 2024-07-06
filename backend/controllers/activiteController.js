const Activite = require('../models/Activite');


const getAllActivites = async (req, res) => {
	  try {
	const activites = await Activite.findAll();
	if (!activites) {
	  return res.status(404).json({ error: "No activities found" });
	}
	res.status(200).send({
		succes: true,
		message: "All activities",
		totalActivities: activites.length,
		data: activites
	});
  } catch (error) {
	res.status(500).json({ error: error.message });
  }
}

const getActivite = async (req, res) => {
	const { id } = req.params;
	try {
	  const activite = await Activite.findOne({ where: { id } });
	  if (!activite) {
		return res.status(404).json({
			succes: false,
			error: "Activity not found"
			});
	  }
	  res.status(200).send({
		succes: true,
		message: "Activity found",
		data: activite
	  })
	} catch (error) {
		res.status(500).json({
			succes: false,
			message: "Activity not found",
			error: error.message });
	}
}

const addActivite = async (req, res) => {
	const { id , id_enfant, date, duree, photo} = req.body;
	try {
	  const activite = await Activite.create({
		id,
		id_enfant,
		date,
		duree,
		photo
	  });
	  res.status(201).send({
		succes: true,
		message: "Activity created",
		data: activite
	  });
	} catch (error) {
	  res.status(400).json({ error: error.message });
	}
}

const updateActivite = async (req, res) => {
	const { id } = req.params;
	const { id_enfant, date, duree, photo } = req.body;
	try {
	  const activite = await Activite.findOne({ where: { id } });
	  if (!activite) {
		return res.status(404).json({
			succes: false,
			error: "Activity not found"
			});
	  }
	  await activite.update({
		id_enfant,
		date,
		duree,
		photo
	  });
	  res.status(200).send({
		succes: true,
		message: "Activity updated",
		data: activite
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
}

const deleteActivite = async (req, res) => {
	const { id } = req.params;
	try {
	  const activite = await Activite.findOne({ where: { id } });
	  if (!activite) {
		return res.status(404).json({ error: "Activity not found" });
	  }
	  await activite.destroy();
	  res.status(200).send({
		succes: true,
		message: "Activity deleted",
		data: activite
	  });
	} catch (error) {
	  res.status(500).json({ error: error.message });
	}
}

module.exports = { getAllActivites, getActivite, addActivite, updateActivite, deleteActivite};
