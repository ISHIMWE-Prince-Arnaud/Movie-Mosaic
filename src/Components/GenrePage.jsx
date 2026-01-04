import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import "../CSS/Home.css";
import { useGenreMovies } from "../hooks/useGenreMovies";

function GenrePage({
  placeholder,
  genreId,
  fetchGenreMovies,
  searchWithinGenre = true,
}) {
  const {
    searchQuery,
    setSearchQuery,
    movies,
    loading,
    error,
    handleSearchClick,
  } = useGenreMovies({ genreId, fetchGenreMovies, searchWithinGenre });

  return (
    <div className="home">
      <div className="search-form">
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

GenrePage.propTypes = {
  placeholder: PropTypes.string.isRequired,
  genreId: PropTypes.number,
  fetchGenreMovies: PropTypes.func,
  searchWithinGenre: PropTypes.bool,
};

export default GenrePage;
