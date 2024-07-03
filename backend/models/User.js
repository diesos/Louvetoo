// const { DataTypes } = require('sequelize');
// const sequelize = require('../db');


// const User = sequelize.define('User', {
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
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   telephone: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   role: {
//     type: DataTypes.ENUM('parent', 'grand-parent', 'staff'),
//     allowNull: false
//   }
// }, {
//   timestamps: true
// });

// module.exports = User;

// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Enfant = require('./Enfant');

const User = sequelize.define('User', {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('parent', 'grand-parent', 'staff'),
    allowNull: false
  },
}, {
  tableName: 'User',
  timestamps: true
},
{
  hooks: {
    beforeCreate: async (user) => {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);}
    }
});

// Relation Many-to-Many avec Enfant
User.associate = function(models) {
  User.hasMany(models.Enfant, { foreignKey: 'id_parent', as: 'Enfants' })
};

module.exports = User;
