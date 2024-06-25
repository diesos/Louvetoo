const sequelize = require('./db');
const User = require('./models/User');
const Enfant = require('./models/Enfant');
const Activite = require('./models/Activite');

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to synchronize the database:', error);
  }
};

syncDatabase();
