// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const passport = require('passport');
// const { get } = require("../routes/auth");

// module.exports = {
//   registerUser: async (req, res) => {
//     const { prenom, nom, email, password, telephone, role } = req.body;

//     if (!prenom || !nom || !email || !password || !telephone || !role) {
//       return res.status(400).json({ error: "Please fill all fields" });
//     }

//     if (await User.findOne({ where: { email } })) {
//       return res.status(400).json({ error: "A user account already exists with this email" });
//     }

//     await User.create({
//       prenom,
//       nom,
//       email,
//       password: bcrypt.hashSync(password, 8),
//       telephone,
//       role
//     });

//     res.status(201).json({ message: "User registered successfully" });
//   },

//   loginUser: (req, res, next) => {
//     passport.authenticate("local", (err, user, info) => {
//       if (err) return next(err);
//       if (!user) return res.status(400).json({ error: "Email or password is incorrect" });

//       req.logIn(user, (err) => {
//         if (err) return next(err);
//         res.status(200).json({ message: "Login successful" });
//       });
//     })(req, res, next);
//   },

//   logoutUser: (req, res) => {
//     req.logout(() => res.status(200).json({ message: "Logged out successfully" }));
//   },

//   getProfile:  async (req, res) => {
//     try {
//       // Get user ID from authenticated user (assuming you have authentication middleware)
//       const userId = req.user.id;
//       console.log('Fetching profile for user ID:', userId);

//       // Fetch user data from database
//       const user = await User.findByPk(userId);

//       console.log('User found:', user);

//       if (!user) {
//         return res.status(404).json({ message: 'Utilisateur non trouvé' });
//       }


//       // Send user profile data as response
//       res.json({
//         id: user.id,
//         prenom: user.prenom,
//         nom: user.nom,
//         email: user.email,
//         telephone: user.telephone,
//         role: user.role
//       });
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       res.status(500).json({ message: 'Error fetching user profile' });
//     }

//   }
// };


// // const bcrypt = require("bcryptjs");
// // const User = require("../models/User");
// // const passport = require('passport');

// // module.exports = {
// //   // registerView: (req, res) => {
// //   //   res.render("register");
// //   // },

// //   // loginView: (req, res) => {
// //   //   res.render("login");
// //   // },

// //   registerUser: async (req, res) => {
// //     const { prenom, nom, email, password, telephone, role } = req.body;

// //     if (!prenom || !nom || !email || !password || !telephone || !role) {
// //       return res.render("register", { error: "Please fill all fields" });
// //     }

// //     if (await User.findOne({ where: { email } })) {
// //       return res.render("register", {
// //         error: "A user account already exists with this email",
// //       });
// //     }

// //     await User.create({
// //       prenom,
// //       nom,
// //       email,
// //       password: bcrypt.hashSync(password, 8),
// //       telephone,
// //       role
// //     });

// //     res.redirect("/login?registrationdone");
// //   },

// //   loginUser: (req, res) => {
// //     passport.authenticate("local", {
// //       successRedirect: "/?loginsuccess",
// //       failureRedirect: "/login?error",
// //     })(req, res);
// //   },

// // logoutUser: (req, res) => {
// // 	req.logout(() => res.redirect('/login?loggedout'));
// // 	}
// // };

const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');


module.exports = {
  registerUser: async (req, res) => {
    const { prenom, nom, email, password, telephone, role } = req.body;

    if (!prenom || !nom || !email || !password || !telephone || !role) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ error: "A user account already exists with this email" });
    }

    await User.create({
      prenom,
      nom,
      email,
      password: bcrypt.hashSync(password, 8),
      telephone,
      role
    });

    res.status(201).json({ message: "User registered successfully" });
  },

  loginUser: (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {

      if (err) return next(err);
      if (!user) return res.status(400).json({ error: "Email or password is incorrect" });

      req.logIn(user, (err) => {
        if (err) return next(err);
        res.status(200).json({ message: "Login successful" });
      });
    })(req, res, next);
  },

  logoutUser: (req, res) => {
    req.logout(() => res.status(200).json({ message: "Logged out successfully" }));
  },

  getUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Error fetching users' });
    }
  },

  getProfile: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(400).json({ error: "User not authenticated" });
      }

      // Get user ID from authenticated user
      const userId = req.user.id;
      console.log(`Fetching profile for user ID: ${userId}`);

      // Fetch user data from database
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Send user profile data as response
      res.json({
        id: user.id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        telephone: user.telephone,
        role: user.role
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Error fetching user profile' });
    }
  },
  handleLogin: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      const foundUser = await User.findOne({
        where: {
          email: email // Assurez-vous de rechercher par email
        }
      });

      if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const match = await bcrypt.compare(password, foundUser.password);

      if (match) {
        const accessToken = jwt.sign(
          { username: foundUser.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '30s' }
        );
        const refreshToken = jwt.sign(
          { username: foundUser.username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        );

        // Enregistrer le refreshToken dans la base de données ou autre méthode de gestion des tokens

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Error handling login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
