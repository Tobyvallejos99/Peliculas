require('dotenv').config();
const { Sequelize } = require('sequelize');

const {
  DB_USER, DB_PASSWORD,
} = process.env;

const sequelize = new Sequelize('peliculas', DB_USER, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
});


module.exports = sequelize;
