import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../CSS/MovieCard.css";
import { useMovieContext } from "../Contexts/MovieContext";
import { getMovieVideos } from "../Services/API";

function MovieCard({ movie }) {
  const { isFavorite, handleAddFavorite, handleRemoveFavorite } =
    useMovieContext();
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerError, setTrailerError] = useState(null);

  const isMovieFavorite = isFavorite(movie.id);

  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isMovieFavorite) {
      handleRemoveFavorite(movie.id);
    } else {
      handleAddFavorite(movie);
    }
  };

  const handleTrailerClick = async (e) => {
    e.stopPropagation();
    setTrailerError(null);
    try {
      const videos = await getMovieVideos(movie.id);
      const trailer = videos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        setTrailerKey(null);
        setTrailerError("Trailer not available");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerKey(null);
      setTrailerError("Trailer not available");
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setTrailerKey(null);
      }
    };
    if (trailerKey) {
      window.addEventListener("keydown", handleEsc);
    }
    return () => window.removeEventListener("keydown", handleEsc);
  }, [trailerKey]);

  const closeTrailer = (e) => {
    if (e) e.stopPropagation();
    setTrailerKey(null);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterSrc} alt={movie.title} />
        <div className="movie-overlay">
          <div className="controls-container">
            <button
              className="trailer-btn"
              onClick={handleTrailerClick}
              aria-label="Watch trailer">
              ▶️ Trailer
            </button>
            <button
              className={`favorite-btn ${isMovieFavorite ? "active" : ""}`}
              onClick={handleFavoriteClick}
              aria-label={
                isMovieFavorite ? "Remove from favorites" : "Add to favorites"
              }>
              {isMovieFavorite ? "❤️" : "🤍"}
            </button>
          </div>
          {trailerError && <div className="trailer-error">{trailerError}</div>}
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>

      {trailerKey && (
        <div className="trailer-modal" onClick={closeTrailer}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeTrailer}>
              &times;
            </span>
            <span className="close-text" onClick={closeTrailer}>
              Close
            </span>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
};
