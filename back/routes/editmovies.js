const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Movie = require('../models/movie');

// Ruta para editar una película
router.put('/:id', (req, res) => {
  const movieId = req.params.id;
  const { title, description, year } = req.body;

  Movie.findByPk(movieId)
    .then((movie) => {
      if (!movie) {
        res.status(404).json({ message: 'Película no encontrada' });
      } else {
        movie.title = title || movie.title;
        movie.description = description || movie.description;
        movie.year = year || movie.year;
        return movie.save();
      }
    })
    .then((updatedMovie) => {
      res.status(200).json({ message: 'Película actualizada exitosamente', movie: updatedMovie });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error al actualizar la película', error: error.message });
    });
});

// Ruta para eliminar una película
router.delete('/:id', (req, res) => {
  const movieId = req.params.id;

  Movie.findByPk(movieId)
    .then((movie) => {
      if (!movie) {
        res.status(404).json({ message: 'Película no encontrada' });
      } else {
        return movie.destroy();
      }
    })
    .then(() => {
      res.status(200).json({ message: 'Película eliminada exitosamente' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error al eliminar la película', error: error.message });
    });
});

// Ruta para agregar una película
router.post('/', (req, res) => {
  const { title, description, year } = req.body;

  Movie.create({ title, description, year })
    .then((newMovie) => {
      res.status(201).json({ message: 'Película agregada exitosamente', movie: newMovie });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error al agregar la película', error: error.message });
    });
});

// Ruta para obtener los datos de una película
router.get('/:id', (req, res) => {
  const movieId = req.params.id;

  Movie.findByPk(movieId)
    .then((movie) => {
      if (!movie) {
        res.status(404).json({ message: 'Película no encontrada' });
      } else {
        res.status(200).json({ message: 'Datos de la película obtenidos exitosamente', movie });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error al obtener los datos de la película', error: error.message });
    });
});


module.exports = router;
