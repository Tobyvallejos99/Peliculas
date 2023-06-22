import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './edit.module.css';

const EditMovie = () => {
  const { movieId } = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/editmovie/${movieId}`);
      setMovie(response.data.movie);
      setTitle(response.data.movie.title);
      setDescription(response.data.movie.description);
      setYear(response.data.movie.year);
    } catch (error) {
      console.error('Error al obtener los datos de la película:', error);
    }
  };

  const handleEditMovie = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/editmovie/${movieId}`, {
        title,
        description,
        year,
      });
      setAlertMessage(response.data.message);
    } catch (error) {
      console.error('Error al editar la película:', error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/editmovie/${movieId}`);
      setAlertMessage(response.data.message);
      // Redirect to the home page after deleting the movie
      history.push('/');
    } catch (error) {
      console.error('Error al eliminar la película:', error);
    }
  };

  const handleAddMovie = () => {
    setShowForm(true);
  };

  const handleCreateMovie = async () => {
    try {
      const response = await axios.post('http://localhost:3001/editmovie', {
        title,
        description,
        year,
      });
      setAlertMessage(response.data.message);
      // Redirect to the home page after creating the movie
      history.push('/');
    } catch (error) {
      console.error('Error al agregar la película:', error);
    }
  };

  if (!movie) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <button onClick={() => history.push('/')}>Volver a la página principal</button>
      <h2>Editar Película</h2>
      {alertMessage && <div className={styles.alert}>{alertMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Año</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{movie.title}</td>
            <td>{movie.description}</td>
            <td>{movie.year}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <label>Título:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Descripción:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Año:</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>
      <button onClick={handleEditMovie}>Editar</button>
      <button onClick={handleDeleteMovie}>Eliminar</button>
      {!showForm && <button onClick={handleAddMovie}>Agregar Película</button>}
      {showForm && (
        <div>
          <h3>Agregar Película</h3>
          <div>
            <label>Título:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Descripción:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div>
            <label>Año:</label>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
          </div>
          <button onClick={handleCreateMovie}>Crear</button>
        </div>
      )}
    </div>
  );
};

export default EditMovie;
