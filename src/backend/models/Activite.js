const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Activite = sequelize.define('Activite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  enfant_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Enfants',
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'activites',
  timestamps: false,
});

module.exports = Activite;
