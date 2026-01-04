import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMovieContext } from "../Contexts/MovieContext";
import { getMovieVideos } from "../Services/API";

function MovieCard({ movie }) {
  const { isFavorite, handleAddFavorite, handleRemoveFavorite } =
    useMovieContext();
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerError, setTrailerError] = useState(null);

  const isMovieFavorite = isFavorite(movie.id);

  const posterFallback = "https://via.placeholder.com/500x750?text=No+Image";
  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : posterFallback;

  const handleImgError = (event) => {
    if (event.target.src !== posterFallback) {
      event.target.src = posterFallback;
    }
  };

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
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
        <img
          src={posterSrc}
          alt={movie.title}
          onError={handleImgError}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="flex items-start justify-between gap-2">
            <span className="inline-flex items-center rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-200">
              {movie.release_date || "Upcoming"}
            </span>
            <button
              className={`pointer-events-auto rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:border-amber-400 hover:text-amber-200 ${
                isMovieFavorite ? "border-amber-400 bg-amber-500/20" : ""
              }`}
              onClick={handleFavoriteClick}
              aria-label={
                isMovieFavorite ? "Remove from favorites" : "Add to favorites"
              }>
              {isMovieFavorite ? "❤️" : "🤍"}
            </button>
          </div>
          <div className="pointer-events-auto flex items-center justify-center gap-3">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-amber-400"
              onClick={handleTrailerClick}
              aria-label="Watch trailer">
              ▶️ Trailer
            </button>
          </div>
          {trailerError && (
            <div className="pointer-events-none rounded-lg bg-slate-950/70 px-3 py-2 text-center text-xs font-semibold text-amber-200">
              {trailerError}
            </div>
          )}
        </div>
      </div>
      <div className="space-y-1 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-50">
          {movie.title}
        </h3>
        <p className="text-sm text-slate-400">
          {movie.release_date || "Release date TBD"}
        </p>
      </div>

      {trailerKey && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closeTrailer}>
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-slate-950 shadow-2xl ring-1 ring-slate-800"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-xl text-slate-100 transition hover:bg-slate-700"
              onClick={closeTrailer}
              aria-label="Close trailer">
              ×
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="h-[60vh] w-full"
            />
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
