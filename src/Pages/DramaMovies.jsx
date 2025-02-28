import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "../Components/MovieCard";
import { getDramaMovies } from "../Services/API";
import "../CSS/Home.css"; // Reusing Home.css for styling

function DramaMovies() {
  const [searchQuery, setSearchQuery] = useState("");
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
      try {
        setLoading(true);
        const dramaMovies = await getDramaMovies();
        setMovies(dramaMovies);
        setError(null);
      } catch (err) {
        setError("Failed to load drama movies");
        setMovies([]);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setLoading(true);
      const dramaMovies = await getDramaMovies();
      const filteredMovies = dramaMovies.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );

      if (filteredMovies.length > 0) {
        setMovies(filteredMovies);
        setError(null);
      } else {
        setMovies([]);
        setError("No drama movies found");
      }
    } catch (err) {
      setError("Search failed");
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

  // Initial load of drama movies
  useEffect(() => {
    performSearch("");
  }, []);

  return (
    <div className="home">
      <div className="search-form">
        <input
          type="text"
          placeholder="Search drama movies..."
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
        />
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default DramaMovies;