const express = require('express');
const app = express();
const sequelize = require('./config/db'); // Adjust the path to your database config
const Enfant = require('./models/Enfant');
const Parent = require('./models/Parent');
const Salarie = require('./models/Salarie');
const Communication = require('./models/Communication');
const Activite = require('./models/Activite');

// Middleware to parse JSON bodies
app.use(express.json());

// Sync all models
sequelize.sync({
  force: true
});

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Define other routes
app.use('/profil', require('./routes/userRoutes')); // Adjust the path to your routes
app.use('/auth', require('./routes/authRoutes'));

// Start the server on port 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
