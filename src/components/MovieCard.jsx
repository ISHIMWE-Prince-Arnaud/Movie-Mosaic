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
    <div className="glass-card group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.05] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:ring-2 hover:ring-cyan-400/30">
      <Link
        to={`/movie/${movie.id}`}
        className="relative block aspect-[2/3] overflow-hidden bg-slate-900 poster-shadow">
        <img
          src={posterSrc}
          srcSet={posterSrcSet}
          sizes="(max-width: 640px) 185px, (max-width: 768px) 370px, 500px"
          alt={movie.title}
          onError={handleImgError}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        
        {/* Cinematic Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 touch-visible" />
        
        <div className="absolute inset-0 flex flex-col justify-between p-5 opacity-0 transition-all duration-500 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 touch-visible">
          <div className="flex items-start justify-end">
            <button
              className={`pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md transition-all hover:scale-110 hover:border-cyan-400 active:scale-90 ${
                isMovieFavorite ? "text-cyan-400" : "text-white"
              }`}
              onClick={handleFavoriteClick}
              aria-label={
                isMovieFavorite ? "Remove from favorites" : "Add to favorites"
              }>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill={isMovieFavorite ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          
          <div className="pointer-events-auto flex items-center justify-center">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-950 shadow-lg transition-all hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              onClick={handleTrailerClick}
              disabled={isLoadingTrailer}
              aria-label="Watch trailer">
              {isLoadingTrailer ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
              ) : (
                <>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Trailer
                </>
              )}
            </button>
          </div>
        </div>
      </Link>
      
      <Link
        to={`/movie/${movie.id}`}
        className="block space-y-2.5 p-5 transition-colors hover:bg-white/5">
        <h3 className="line-clamp-1 text-[13px] font-black uppercase tracking-wider text-slate-100 transition-colors group-hover:text-cyan-400">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
            {movie.release_date ? movie.release_date.slice(0, 4) : "TBD"}
          </span>
          
          <div className="flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-2 py-1 border border-cyan-500/20">
            <svg className="h-3 w-3 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-[11px] font-black text-cyan-400">{rating}</span>
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
