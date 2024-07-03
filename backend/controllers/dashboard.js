module.exports = {
	dashboardView: (req, res) => {
	  res.render('dashboard',  { name: req.user.name });
	}
  }


  module.exports = {
	dashboardView: (req, res) => {
	  // Vérifie que req.user est défini avant d'accéder à ses propriétés
	  if (!req.user) {
		return res.status(400).json({ error: "User not authenticated" });
	  }

	  res.json({
		message: `Welcome to your dashboard, ${req.user.prenom}`,
		user: req.user
	  });
	}
  };
