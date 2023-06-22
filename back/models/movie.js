const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Movie = sequelize.define('movies', {
  title: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Movie;
