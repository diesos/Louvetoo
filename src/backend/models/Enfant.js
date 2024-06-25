const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Enfant = sequelize.define('Enfant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_parent: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: false
  },
  allergie: {
    type: DataTypes.STRING,
    allowNull: true
  },
  diet: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Enfant;
