// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');
// const Enfant = require('./Enfant');

// const Activite = sequelize.define('Activite', {
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   id_enfant: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: Enfant,
//       key: 'id'
//     },
//     onDelete: 'CASCADE',  // Si un enfant est supprimé, toutes ses activités seront aussi supprimées
//     onUpdate: 'CASCADE'  // Si l'id d'un enfant est modifié, toutes ses activités seront aussi modifiées
//   },
//   date: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   duree: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   photo: {
//     type: DataTypes.STRING,
//     allowNull: true
//   }
// }, {
//   timestamps: true,
//   tableName: 'Activites'
// });



// module.exports = Activite;
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
    },
    onDelete: 'CASCADE',  // Si un enfant est supprimé, toutes ses activités seront aussi supprimées
    onUpdate: 'CASCADE'   // Si l'ID d'un enfant est mis à jour, cela sera répercuté dans les activités
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
  timestamps: true,
  tableName: 'Activites'
});

// Définir les relations
Enfant.hasMany(Activite, { foreignKey: 'id_enfant' });
Activite.belongsTo(Enfant, { foreignKey: 'id_enfant' });

module.exports = Activite;
