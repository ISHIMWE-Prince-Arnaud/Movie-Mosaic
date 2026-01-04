import { useEffect, useState, useCallback } from "react";
import MovieCard from "../Components/MovieCard";
import { searchMovies, getPopularMovies } from "../Services/API";
import "../CSS/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async (query) => {
    if (!query) {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to load movies");
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
        setError("No movies found");
      }
    } catch (error) {
      console.error(error);
      setError("Search failed");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(searchQuery.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, performSearch]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    performSearch(searchQuery.trim());
  };

  // Initial load of popular movies
  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error(error);
        setError("Failed to load initial movies");
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
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>

      {loading && <div className="loading">Searching...</div>}
      {error && <div className="error">{error}</div>}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
