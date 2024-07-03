// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');

// const Enfant = sequelize.define('Enfant', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   prenom: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   nom: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   date_naissance: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   allergie: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   diet: {
//     type: DataTypes.STRING,
//     allowNull: true
//   }
// }, {
//   timestamps: true
// });

// module.exports = Enfant;

// models/Enfant.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Activite = require('./Activite');

const Enfant = sequelize.define('Enfant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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

// Relation Many-to-Many avec User (parents)
Enfant.associate = function(models) {
  Enfant.belongsTo(models.User, { foreignKey: 'id_parent', as: 'Parent' });
  Enfant.belongsToMany(models.Activite, { through: 'EnfantActivite', foreignKey: 'id_enfant', as: 'Activites' });
};


module.exports = Enfant;
