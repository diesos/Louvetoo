// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');

// const Enfant = sequelize.define('Enfant', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   nom: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   prenom: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   date_naissance: {
//     type: DataTypes.DATEONLY,
//     allowNull: false,
//   },
//   parent_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'Parents',
//       key: 'id',
//     },
//   },
// }, {
//   tableName: 'enfants',
//   timestamps: false,
// });

// module.exports = Enfant;
