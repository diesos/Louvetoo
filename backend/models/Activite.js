const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Enfant = require('./Enfant');

const Activite = sequelize.define('Activite', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM(
      "Deposit",
      "Withdraw",
      "Lunch",
      "Change",
      "Activity"
    ),
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  tableName: 'Activites'
});


//Associer les activités aux enfants
Activite.associate = function(models) {
  Activite.belongsToMany(models.Enfant, { through: 'EnfantActivite', foreignKey: 'id_activite', as: 'Enfants' });
};
module.exports = Activite;
