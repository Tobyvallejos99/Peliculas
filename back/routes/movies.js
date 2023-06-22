const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Movie = require('../models/movie');


// Ruta para obtener la lista de películas
router.get('/', (req, res) => {
  const { title, page = 1, limit = 10000 } = req.query;
  const offset = (page - 1) * limit;
  const whereClause = title ? { title: { [Op.like]: `%${title}%` } } : {};

  Movie.findAndCountAll({
    where: whereClause,
    limit: parseInt(limit),
    offset: parseInt(offset),
  })
    .then((result) => {
      const { count, rows } = result;
      if (count === 0) {
        res.status(200).json({ message: 'No hay películas en la lista' });
      } else {
        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json({ count, movies: rows });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error al obtener las películas', error: error.message });
    });
});


module.exports = router;
