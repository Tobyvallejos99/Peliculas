const express = require('express');
const app = express();
const listmoviesRoutes = require('./routes/movies');
const addmovieRoutes = require('./routes/addmovies');
const editmovieRoutes = require('./routes/editmovies');
const sequelize = require('./db');
const cors = require('cors');
const morgan = require('morgan');

// Configuración de Multer

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// Ruta para agregar películas
app.use('/addmovies', addmovieRoutes);

// Ruta para obtener la lista de películas
app.use('/movies', listmoviesRoutes);

// Ruta para editar, eliminar y agregar películas
app.use('/editmovie', editmovieRoutes);


sequelize
  .sync()
  .then(() => {
    console.log('Conexión a la base de datos establecida');
    const port = 3001;
    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

