const express = require('express');
const app = express();
const listmoviesRoutes = require('./routes/movies');
const addmovieRoutes = require('./routes/addmovies');
const editmovieRoutes = require('./routes/editmovies');
const sequelize = require('./db');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const morgan = require('morgan');


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

// Ruta para el inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;

    if (username === 'usuario' && password === 'contraseña') {

      const payload = { username };

      const token = jwt.sign(payload, 'clave_secreta', { expiresIn: '1h' });

      res.json({ token });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  });

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

