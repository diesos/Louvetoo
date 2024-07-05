// src/auth.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/Users.js');


module.exports = {
  init: () => {
    passport.use(
      new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
          // Recherche de l'utilisateur par email dans la base de données
          const user = await User.findOne({ where: { email } });

          // Si l'utilisateur n'est pas trouvé
          if (!user) {
            return done(null, false, { message: 'Email or password is incorrect.' });
          }

          // Vérification du mot de passe
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return done(null, false, { message: 'Email or password is incorrect.' });
          }

          // Authentification réussie
          return done(null, user);
        } catch (error) {
          console.error('Error authenticating user:', error);
          return done(error);
        }
      })
    );

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findByPk(id); // Recherche de l'utilisateur par ID
        if (!user) {
          return done(null, false, { message: 'User not found.' });
        }
        return done(null, user);
      } catch (error) {
        console.error('Error deserializing user:', error);
        return done(error);
      }
    });
  },

  protectRoute: (req, res, next) => {
    if (req.isAuthenticated()) {
      console.log(req.user)
      return next();
    }
    res.redirect('/login?next=' + req.url);
  }
};
