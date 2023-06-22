import React, { useState } from 'react';
import styles from './search.module.css';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
            className={styles.searchInput}
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleInputChange}
        />
        <button className={styles.searchButton} type="submit">
            Search
        </button>
        </form>
    );
    }

export default SearchBar;
