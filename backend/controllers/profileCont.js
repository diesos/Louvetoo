module.exports = {
	profileView: (req, res) => {
	if (!req.user) {
		return res.status(400).json({ error: "User not authenticated" });
	}
	else {
		res.json({
			message: `Welcome to your profile, ${req.user.name}`,
			user: req.user
		});
	}
}
}
