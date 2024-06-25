const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Enfant = require('./Enfant');

const Activite = sequelize.define('Activite', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_enfant: {
    type: DataTypes.INTEGER,
    references: {
      model: Enfant,
      key: 'id'
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Activite;
