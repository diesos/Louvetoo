const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Communication = sequelize.define('Communication', {
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
  salarie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Salaries',
      key: 'id',
    },
  },
  parent_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Parents',
      key: 'id',
    },
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
  tableName: 'communications',
  timestamps: false,
});

module.exports = Communication;
