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

const getChild = async (req, res) => {
	const { id } = req.params;
	try {
	  const child = await Enfant.findOne({ where: { id } });
	  if (!child) {
		return res.status(404).json({ error: "Child not found" });
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
}


module.exports = { getAllChildren, getChild };
