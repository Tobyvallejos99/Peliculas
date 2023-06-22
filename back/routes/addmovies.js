const express = require('express');
const router = express.Router();
const csv = require('csv-parser');
const fs = require('fs');
const Movie = require('../models/movie');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta de destino para guardar los archivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
    });

    const upload = multer({ storage: storage });

    // Ruta para recibir un archivo CSV y guardar las películas en la base de datos
router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
    }

    const file = req.file;
    const movies = [];

    fs.createReadStream(file.path)
    .pipe(csv({ separator: ';', skipLines: 0, headers: false }))
    .on('data', (data) => {
        const [title, description, year] = Object.values(data).map((value) => value.trim());
        movies.push({ title, description, year });
    })
    .on('end', () => {
        fs.unlinkSync(file.path); // Eliminar archivo CSV después de leerlo

        Movie.bulkCreate(movies, {
        ignoreDuplicates: true,
        })
        .then(() => {
            res.status(201).json({ message: 'Películas importadas correctamente' });
        })
        .catch((error) => {
            res.status(500).json({ message: 'Error al importar las películas', error: error.message });
        });
    });

    
});

module.exports = router;
