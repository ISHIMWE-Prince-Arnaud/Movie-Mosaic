import React, { useState, useEffect, useCallback } from "react";
import MovieCard from "../Components/MovieCard";
import { searchMovies, getMoviesByGenre } from "../Services/API";
import "../CSS/Home.css";

function ThrillerMovies() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const genreId = 80;

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const performSearch = useCallback(async (query) => {
    setLoading(true);
    try {
      const results = query ? await searchMovies(query) : await getMoviesByGenre(genreId);
      setMovies(results.length ? results : []);
      setError(results.length ? null : "No movies found.");
    } catch {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedSearch = useCallback(debounce((query) => performSearch(query), 300), [performSearch]);

  useEffect(() => { performSearch(""); }, []);

  return (
    <div className="home">
      <div className="search-form">
        <input type="text" placeholder="Search crime movies..." value={searchQuery} onChange={(e) => {
          setSearchQuery(e.target.value);
          debouncedSearch(e.target.value.trim());
        }} className="search-input" />
        <button className="search-button" onClick={() => performSearch(searchQuery.trim())}>Search</button>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="movie-list">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}

export default ThrillerMovies;