import { useState } from "react";
import "../CSS/MovieCard.css";
import { useMovieContext } from "../Contexts/MovieContext";
import { getMovieVideos } from "../Services/API";

function MovieCard({ movie }) {
  const { isFavorite, handleAddFavorite, handleRemoveFavorite } = useMovieContext();
  const [trailerKey, setTrailerKey] = useState(null);

  const isMovieFavorite = isFavorite(movie.id);

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
    try {
      const videos = await getMovieVideos(movie.id);
      const trailer = videos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      if (trailer) setTrailerKey(trailer.key);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
        />
        <div className="movie-overlay">
          <div className="controls-container">
            <button
              className="trailer-btn"
              onClick={handleTrailerClick}
              aria-label="Watch trailer"
            >
              ▶️ Trailer
            </button>
            <button
              className={`favorite-btn ${isMovieFavorite ? 'active' : ''}`}
              onClick={handleFavoriteClick}
              aria-label={isMovieFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isMovieFavorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>

      {trailerKey && (
        <div className="trailer-modal">
          <div className="modal-content">
            <span 
              className="close" 
              onClick={(e) => {
                e.stopPropagation();
                setTrailerKey(null);
              }}
            >
              &times;
            </span>
            <span className="close-text">
              Close
            </span>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieCard;