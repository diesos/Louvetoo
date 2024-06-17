const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

// Import models
const Enfant = require('../models/Enfant');
const Parent = require('../models/Parent');
const Salarie = require('../models/user');
const Activite = require('../models/Activite');
const Communication = require('../models/Communication');

// Define relationships
Parent.hasMany(Enfant, { foreignKey: 'parent_id' });
Enfant.belongsTo(Parent, { foreignKey: 'parent_id' });

Enfant.hasMany(Activite, { foreignKey: 'enfant_id' });
Activite.belongsTo(Enfant, { foreignKey: 'enfant_id' });

Enfant.hasMany(Communication, { foreignKey: 'enfant_id' });
Communication.belongsTo(Enfant, { foreignKey: 'enfant_id' });

Salarie.hasMany(Communication, { foreignKey: 'salarie_id' });
Communication.belongsTo(Salarie, { foreignKey: 'salarie_id' });

Parent.hasMany(Communication, { foreignKey: 'parent_id' });
Communication.belongsTo(Parent, { foreignKey: 'parent_id' });

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

module.exports = { sequelize, connectDB, Enfant, Parent, Salarie, Activite, Communication };
