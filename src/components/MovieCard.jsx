import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useMovieContext } from "../contexts/MovieContext";
import { getMovieVideos } from "../services/api";

function MovieCard({ movie }) {
  const { isFavorite, handleAddFavorite, handleRemoveFavorite } =
    useMovieContext();
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerError, setTrailerError] = useState(null);
  const [isLoadingTrailer, setIsLoadingTrailer] = useState(false);

  const isMovieFavorite = isFavorite(movie.id);

  const posterFallback = "https://placehold.co/342x513?text=No+Image";
  const posterSrc = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : posterFallback;

  const posterSrcSet = movie.poster_path
    ? `https://image.tmdb.org/t/p/w92${movie.poster_path} 185w,
       https://image.tmdb.org/t/p/w185${movie.poster_path} 370w,
       https://image.tmdb.org/t/p/w342${movie.poster_path} 500w`
    : posterFallback;
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : "N/A";
  const voteCount =
    typeof movie.vote_count === "number" ? movie.vote_count : undefined;

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
    setIsLoadingTrailer(true);
    try {
      const videos = await getMovieVideos(movie.id);
      const trailer = videos.find(
        (video) => video.type === "Trailer" && video.site === "YouTube",
      );
      
      const isValidYoutubeKey = (key) => /^[a-zA-Z0-9_-]{11}$/.test(key);

      if (trailer && isValidYoutubeKey(trailer.key)) {
        setTrailerKey(trailer.key);
      } else {
        setTrailerKey(null);
        setTrailerError("Trailer not available");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setTrailerKey(null);
      setTrailerError("Trailer not available");
    } finally {
      setIsLoadingTrailer(false);
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
      <Link
        to={`/movie/${movie.id}`}
        className="relative block aspect-[2/3] overflow-hidden bg-slate-800">
        <img
          src={posterSrc}
          srcSet={posterSrcSet}
          sizes="(max-width: 640px) 185px, (max-width: 768px) 370px, 500px"
          alt={movie.title}
          onError={handleImgError}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 touch-visible" />
        <div className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 transition duration-300 group-hover:opacity-100 touch-visible">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1" /> {/* Spacer for balance */}
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleTrailerClick}
              disabled={isLoadingTrailer}
              aria-label="Watch trailer">
              {isLoadingTrailer ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                  Loading...
                </>
              ) : (
                <>▶️ Trailer</>
              )}
            </button>
          </div>
        </div>
      </Link>
      <Link
        to={`/movie/${movie.id}`}
        className="block space-y-1 p-4 transition hover:bg-slate-800/50">
        <h3 className="line-clamp-2 text-lg font-semibold text-slate-50 transition group-hover:text-cyan-400">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between text-sm text-slate-400">
          <p>
            {movie.release_date
              ? movie.release_date.slice(0, 4)
              : "Release date TBD"}
          </p>
          <div className="inline-flex items-center gap-1 rounded-full border border-amber-300/40 bg-amber-500/10 px-2 py-1 text-xs font-semibold text-amber-200">
            <span>⭐</span>
            <span>{rating}</span>
            {voteCount !== undefined && (
              <span className="text-[11px] text-amber-100/80">
                ({voteCount})
              </span>
            )}
          </div>
        </div>
      </Link>
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
              sandbox="allow-scripts allow-same-origin allow-presentation"
              className="h-[60vh] w-full"
            />
          </div>
        </div>
      )}
      {trailerError && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={closeTrailer}>
          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-slate-950 shadow-2xl ring-1 ring-slate-800 p-8"
            onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800/80 text-xl text-slate-100 transition hover:bg-slate-700"
              onClick={closeTrailer}
              aria-label="Close error message">
              ×
            </button>
            <div className="text-center">
              <div className="mb-4 text-4xl">🎬</div>
              <h3 className="mb-2 text-lg font-semibold text-slate-100">
                Trailer Not Available
              </h3>
              <p className="text-slate-400">{trailerError}</p>
            </div>
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
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
  }).isRequired,
};
