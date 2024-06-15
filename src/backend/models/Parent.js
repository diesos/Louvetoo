const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Parent = sequelize.define('Parent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'parents',
  timestamps: false,
});

module.exports = Parent;
