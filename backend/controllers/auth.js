const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const passport = require('passport');

module.exports = {
  registerUser: async (req, res) => {
    const { prenom, nom, email, password, telephone, role } = req.body;

    if (!prenom || !nom || !email || !password || !telephone || !role) {
      return res.status(400).json({ error: "Veuillez remplir tous les champs" });
    }

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: "Un compte avec mail existe déja." });
    }

    await User.create({
      prenom,
      nom,
      email,
      password: bcrypt.hashSync(password, 8),
      telephone,
      role
    });

    res.status(201).json({ message: "Enregistement avec succès" });
  },

  loginUser: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json({ error: "Mot de passe incorrect." });

      req.logIn(user, (err) => {
        if (err) return next(err);
        res.status(200).json({ message: "Connexion avec succès" });
      });
    })(req, res, next);
  },

  logoutUser: (req, res) => {
    req.logout(() => res.status(200).json({ message: "Logged out successfully" }));
  }
};


// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const passport = require('passport');

// module.exports = {
//   // registerView: (req, res) => {
//   //   res.render("register");
//   // },

//   // loginView: (req, res) => {
//   //   res.render("login");
//   // },

//   registerUser: async (req, res) => {
//     const { prenom, nom, email, password, telephone, role } = req.body;

//     if (!prenom || !nom || !email || !password || !telephone || !role) {
//       return res.render("register", { error: "Please fill all fields" });
//     }

//     if (await User.findOne({ where: { email } })) {
//       return res.render("register", {
//         error: "A user account already exists with this email",
//       });
//     }

//     await User.create({
//       prenom,
//       nom,
//       email,
//       password: bcrypt.hashSync(password, 8),
//       telephone,
//       role
//     });

//     res.redirect("/login?registrationdone");
//   },

//   loginUser: (req, res) => {
//     passport.authenticate("local", {
//       successRedirect: "/?loginsuccess",
//       failureRedirect: "/login?error",
//     })(req, res);
//   },

// logoutUser: (req, res) => {
// 	req.logout(() => res.redirect('/login?loggedout'));
// 	}
// };
