// const express = require('express');
// const sequelize = require('./db');
// const passport = require('passport');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/auth');
// const dashboardRoutes = require('./routes/dashboard');
// const db = require('./db.js');
// const cors = require('cors');
// const corsOptions = require('./config/corsOptions');
// const { init: initAuth } = require('./auth');
// const path = require('path');

// // Models
// const User = require('./models/User');
// const Enfant = require('./models/Enfant');
// const Activite = require('./models/Activite');


// const app = express();
// const PORT = 3000;

// app.use(cookieParser());

// app.use(cors({
//   origin: corsOptions,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// initAuth();
// app.use(session({
//   secret: 'secret',
//   saveUninitialized: true,
//   resave: true,
//   cookie: {
//     httpOnly: true,  // Cookies accessibles uniquement par HTTP
//     secure: false,   // Utilisez true si vous utilisez HTTPS
//     maxAge: 24 * 60 * 60 * 1000  // Durée de vie du cookie en ms (1 jour ici)
//   }
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use('/', authRoutes);
// app.use('/', dashboardRoutes);

// const syncDatabase = async () => {
//   try {
//     // Synchroniser les tables sans les forcer à être recréées
//     await sequelize.sync({ force: false }); // or simply await sequelize.sync();
//     console.log('Database synchronized');
//   } catch (error) {
//     console.error('Unable to synchronize the database:', error);
//   }
// };

// syncDatabase();

// app.get('/check-session', (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({ loggedIn: true });
//   } else {
//     res.json({ loggedIn: false });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port: ${PORT} or http://127.0.0.1:${PORT}`);
// });


const express = require('express');
const sequelize = require('./db');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const db = require('./db.js');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { init: initAuth } = require('./auth');
const path = require('path');
require('dotenv').config();

// Models
const User = require('./models/User');
const Enfant = require('./models/Enfant');
const Activite = require('./models/Activite');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: corsOptions,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.use(express.json());



app.use(cookieParser());

app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
    httpOnly: true,
    secure: false, // Change to true if using HTTPS
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

initAuth();

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use('/', dashboardRoutes);

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

syncDatabase();

app.get('/check-session', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} or http://127.0.0.1:${PORT}`);
});
