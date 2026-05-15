import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  getMovieVideos,
} from "../services/api";
import MovieCard from "../components/MovieCard";
import { GENRES } from "../config/genres";

function MovieDetail() {
  const { id } = useParams();
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (showTrailer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showTrailer]);

  const { data: movie, isLoading: isMovieLoading, error: movieError } = useQuery({
    queryKey: ["movieDetails", id],
    queryFn: () => getMovieDetails(id),
  });

  const { data: credits, isLoading: isCreditsLoading } = useQuery({
    queryKey: ["movieCredits", id],
    queryFn: () => getMovieCredits(id),
  });

  const { data: similarMovies, isLoading: isSimilarLoading } = useQuery({
    queryKey: ["similarMovies", id],
    queryFn: () => getSimilarMovies(id),
  });

  const { data: videos, isLoading: isVideosLoading } = useQuery({
    queryKey: ["movieVideos", id],
    queryFn: () => getMovieVideos(id),
  });

  const loading = isMovieLoading || isCreditsLoading || isSimilarLoading || isVideosLoading;
  const error = movieError ? "Failed to load movie details. Please try again later." : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-20 px-4">
        <h2 className="text-2xl font-bold text-red-500">
          {error || "Movie not found"}
        </h2>
        <Link
          to="/"
          className="mt-4 inline-block text-cyan-400 hover:underline">
          Go back home
        </Link>
      </div>
    );
  }

  const cast = credits?.slice(0, 10) || [];
  const similar = similarMovies?.slice(0, 6) || [];
  
  const trailer = videos?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  const isValidYoutubeKey = (key) => /^[a-zA-Z0-9_-]{11}$/.test(key);
  const trailerKey = trailer && isValidYoutubeKey(trailer.key) ? trailer.key : null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const backdropSrcSet = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path} 780w,
       https://image.tmdb.org/t/p/w1280${movie.backdrop_path} 1280w`
    : null;

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Trailer Modal (Focus Mode) */}
      {showTrailer && trailerKey && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-300">
          <button 
            onClick={() => setShowTrailer(false)}
            className="absolute top-6 right-6 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(6,182,212,0.3)] ring-1 ring-white/10">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Hero Section with Parallax Effect */}
      <section className="relative -mx-4 -mt-6 h-[85vh] min-h-[500px] overflow-hidden lg:-mx-8">
        {backdropUrl && (
          <div className="absolute inset-0 z-0">
            <img
              src={backdropUrl}
              srcSet={backdropSrcSet}
              sizes="100vw"
              alt={movie.title}
              className="h-full w-full object-cover transition-transform duration-[2s] scale-110 motion-safe:hover:scale-100"
              style={{
                filter: "brightness(0.6) contrast(1.1)",
              }}
            />
            {/* Immersive Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent" />
          </div>
        )}

        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-20 sm:px-12 lg:px-20">
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-4 py-1.5 text-[11px] font-black tracking-[0.2em] text-white uppercase bg-cyan-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                {movie.release_date?.split("-")[0]}
              </span>
              <span className="px-4 py-1.5 text-[11px] font-black tracking-[0.2em] text-slate-300 uppercase bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
                {movie.runtime} MIN
              </span>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 backdrop-blur-xl rounded-full border border-cyan-500/20">
                <span className="text-cyan-400 text-xs font-black">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
              </div>
            </div>

            <h1 className="text-6xl font-black text-white sm:text-7xl lg:text-9xl mb-8 leading-[0.85] tracking-tighter drop-shadow-2xl">
              {movie.title}
            </h1>

            <p className="text-xl text-slate-300 line-clamp-3 mb-12 max-w-2xl leading-relaxed font-medium drop-shadow-md">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-5">
              {trailerKey && (
                <button
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${trailerKey}`,
                      "_blank",
                    )
                  }
                  className="group inline-flex items-center gap-4 px-12 py-5 font-black text-[11px] uppercase tracking-[0.3em] text-slate-950 bg-white rounded-2xl transition-all hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  <svg className="w-5 h-5 transition-transform group-hover:scale-125" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Trailer
                </button>
              )}
              <div className="flex gap-3">
                {movie.genres?.map((genre) => {
                  const projectGenre = GENRES.find((g) => g.id === genre.id);
                  const slug = projectGenre
                    ? projectGenre.slug
                    : genre.name.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={genre.id}
                      to={`/genre/${slug}`}
                      className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 transition-all hover:bg-white/10 hover:border-cyan-400/30">
                      {genre.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 px-4 sm:px-8 lg:px-12">
        {/* Cast Section with Circular Avatars */}
        <section className="lg:col-span-2 space-y-12">
          <div className="space-y-3">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
              The <span className="text-cyan-400 text-glow">Cast</span>
            </h2>
            <div className="h-1.5 w-16 bg-cyan-500 rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
            {cast.map((person) => (
              <div key={person.id} className="group flex flex-col items-center">
                <div className="relative w-32 h-32 overflow-hidden rounded-full bg-slate-900 mb-5 border-4 border-white/5 transition-all duration-500 group-hover:border-cyan-500 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:scale-110">
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                        : "https://placehold.co/185x185?text=No+Image"
                    }
                    alt={person.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-[11px] font-black text-slate-100 text-center uppercase tracking-[0.15em] line-clamp-1">
                  {person.name}
                </h3>
                <p className="text-[9px] font-bold text-slate-500 text-center uppercase tracking-[0.25em] line-clamp-1 mt-2">
                  {person.character}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Info Sidebar - Glassmorphism Refined */}
        <section className="space-y-10 glass-card p-12 rounded-[3rem] h-fit sticky top-28 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                Status
              </h3>
              <p className="text-white font-black text-xl tracking-tight">{movie.status}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                Release Date
              </h3>
              <p className="text-white font-black text-xl tracking-tight">{movie.release_date}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                Budget
              </h3>
              <p className="text-white font-black text-xl tracking-tight">
                ${movie.budget?.toLocaleString() || "N/A"}
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                Revenue
              </h3>
              <p className="text-white font-black text-xl tracking-tight">
                ${movie.revenue?.toLocaleString() || "N/A"}
              </p>
            </div>
            
            {movie.production_companies?.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                  Production
                </h3>
                <p className="text-white font-black text-xl tracking-tight line-clamp-2">
                  {movie.production_companies[0].name}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Similar Movies */}
      <section className="space-y-12 pb-24 px-4 sm:px-8 lg:px-12">
        <div className="space-y-3">
          <h2 className="text-4xl font-black uppercase tracking-tighter text-white">
            Similar <span className="text-cyan-400 text-glow">Movies</span>
          </h2>
          <div className="h-1.5 w-16 bg-cyan-500 rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {similar.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MovieDetail;
