const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Communication = sequelize.define('Blog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'blog',
  timestamps: false,
});

module.exports = Blog;
