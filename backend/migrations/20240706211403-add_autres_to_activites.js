const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Utilisez le fichier de connexion personnalisé

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Activites', 'activity', {
      type: DataTypes.ENUM('entree', 'sortie', 'dodo', 'repas', 'change', 'loisir', 'autre'),
      allowNull: false
    });
    await queryInterface.addColumn('Activites', 'autres', {
      type: DataTypes.STRING,
      allowNull: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Activites', 'activity');
    await queryInterface.removeColumn('Activites', 'autres');
  }
};
