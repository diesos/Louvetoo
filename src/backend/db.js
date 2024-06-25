const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_database', 'my_user', 'My$ecureP@ssw0rd', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
