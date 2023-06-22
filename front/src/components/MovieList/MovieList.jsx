import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './list.module.css';
import Pagination from '../Pagination/pagination';
import SearchBar from '../SearchBar/SearchBar';
import { useHistory } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(6);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('http://localhost:3001/movies');
      const { movies } = response.data;
      setMovies(movies);
      setFilteredMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = searchTerm => {
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMovies(filtered);
    setCurrentPage(1);
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies?.slice(indexOfFirstMovie, indexOfLastMovie) || [];

  const handleImportCSV = () => {
    window.location.href = 'http://localhost:3000/addmovies';
  };

  const handleMovieClick = movieId => {
    history.push(`/editmovie/${movieId}`);
  };


  return (
    <div>
      <button className={styles.animatedButton} onClick={handleImportCSV}>
        Import CSV
      </button>
      <div className={styles.container}>
        <h1 className={styles.title}>Movies List</h1>
        <SearchBar onSearch={handleSearch} />
        <div className={styles.content}>
          {currentMovies.length === 0 ? (
            <p>No hay películas en la lista.</p>
          ) : (
            <ul className={styles.movieList}>
              {currentMovies.map(movie => (
                <li
                  key={movie.id}
                  className={styles.movieItem}
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <h2 className={styles.movieTitle}>{movie.title}</h2>
                  <p className={styles.movieDescription}>Description: {movie.description}</p>
                  <p className={styles.movieYear}>Year: {movie.year}</p>
                </li>
              ))}
            </ul>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil((filteredMovies?.length || 0) / moviesPerPage)}
            onPageChange={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default MovieList;
