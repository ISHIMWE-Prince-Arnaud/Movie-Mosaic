import React, { useState, useEffect, useCallback } from 'react';
import MovieCard from '../Components/MovieCard';
import { searchMovies, getPopularMovies } from '../services/api';
import "../CSS/Home.css"

function Home() {
const [searchQuery, setSearchQuery] = useState('');
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// Debounce function to limit API calls
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

// Search function
const performSearch = useCallback(async (query) => {
  if (!query) {
    // Load popular movies if no search query
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
      setError(null);
    } catch (err) {
      setError('Failed to load movies');
      setMovies([]);
    }
    return;
  }

  try {
    setLoading(true);
    const results = await searchMovies(query);
    
    if (results.length > 0) {
      setMovies(results);
      setError(null);
    } else {
      setMovies([]);
      setError('No movies found');
    }
  } catch (err) {
    setError('Search failed');
    setMovies([]);
  } finally {
    setLoading(false);
  }
}, []);

// Debounced search
const debouncedSearch = useCallback(
  debounce((query) => performSearch(query), 300),
  [performSearch]
);

// Handle input change
const handleInputChange = (e) => {
  const query = e.target.value;
  setSearchQuery(query);
  debouncedSearch(query.trim());
};

// Handle search button click
const handleSearchClick = () => {
  performSearch(searchQuery.trim());
};

// Initial load of popular movies
useEffect(() => {
  const loadInitialMovies = async () => {
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (err) {
      setError('Failed to load initial movies');
    }
  };

  loadInitialMovies();
}, []);

return (
  <div className="home">
    <div className="search-form">
      <input 
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
      <button 
        className="search-button"
        onClick={handleSearchClick}
      >
        Search
      </button>
    </div>

    {loading && <div className="loading">Searching...</div>}
    {error && <div className="error">{error}</div>}

    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard 
          key={movie.id} 
          movie={movie} 
        />
      ))}
    </div>
  </div>
);
}

export default Home;