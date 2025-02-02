import React, { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../Services/API";
import MovieCard from "../Components/MovieCard";
import "../CSS/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      }

      finally {
        setLoading(false)
      }
    };

    loadPopularMovies();

  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value.trim());
  };

  const handleFavoriteClick = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {loading && <p>Loading movies...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onFavoriteClick={() => handleFavoriteClick(movie)}
              isFavorite={favorites.some((fav) => fav.id === movie.id)}
            />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
}

export default Home;