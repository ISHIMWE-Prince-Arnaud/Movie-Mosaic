import "../CSS/MovieCard.css";
import { useMovieContext } from "../Contexts/MovieContext";

function MovieCard({ movie }) {
  const { isFavorite, handleAddFavorite, handleRemoveFavorite } = useMovieContext();

  // Check if this specific movie is a favorite
  const isMovieFavorite = isFavorite(movie.id);

  function onFavoriteClick() {
    if (isMovieFavorite) {
      handleRemoveFavorite(movie.id);
    } else {
      handleAddFavorite(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
        />
        <div className="movie-overlay">
          <button 
            className={`favorite-btn ${isMovieFavorite ? 'active' : ''}`} 
            onClick={onFavoriteClick}
          >
            {isMovieFavorite ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}
        
export default MovieCard;