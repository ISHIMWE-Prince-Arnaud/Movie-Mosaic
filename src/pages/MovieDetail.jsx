import { useEffect } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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
      {/* Hero Section */}
      <section className="relative -mx-4 -mt-6 h-[70vh] min-h-[400px] overflow-hidden lg:-mx-8">
        {backdropUrl && (
          <div className="absolute inset-0">
            <img
              src={backdropUrl}
              srcSet={backdropSrcSet}
              sizes="100vw"
              alt={movie.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 w-full px-6 pb-16 sm:px-12 lg:px-20">
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 text-[10px] font-black tracking-widest text-white uppercase bg-cyan-600 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                {movie.release_date?.split("-")[0]}
              </span>
              <span className="px-3 py-1 text-[10px] font-black tracking-widest text-slate-300 uppercase bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                {movie.runtime} min
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                <span className="text-cyan-400 text-[11px] font-black">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
              </div>
            </div>

            <h1 className="text-5xl font-black text-white sm:text-6xl lg:text-8xl mb-6 leading-[0.9] tracking-tighter">
              {movie.title}
            </h1>

            <p className="text-lg text-slate-300 line-clamp-3 mb-10 max-w-2xl leading-relaxed font-medium">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-4">
              {trailerKey && (
                <button
                  onClick={() =>
                    window.open(
                      `https://www.youtube.com/watch?v=${trailerKey}`,
                      "_blank",
                    )
                  }
                  className="inline-flex items-center gap-3 px-10 py-4 font-black text-xs uppercase tracking-[0.2em] text-slate-950 bg-white rounded-xl transition-all hover:bg-cyan-400 hover:scale-105 active:scale-95 shadow-2xl">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Trailer
                </button>
              )}
              <div className="flex gap-2">
                {movie.genres?.map((genre) => {
                  const projectGenre = GENRES.find((g) => g.id === genre.id);
                  const slug = projectGenre
                    ? projectGenre.slug
                    : genre.name.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={genre.id}
                      to={`/genre/${slug}`}
                      className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white bg-white/5 backdrop-blur-md rounded-xl border border-white/10 transition-all hover:bg-white/10 hover:border-white/20">
                      {genre.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 px-4 sm:px-8 lg:px-12">
        {/* Cast Section */}
        <section className="lg:col-span-2 space-y-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
              The <span className="text-cyan-400 text-glow">Cast</span>
            </h2>
            <div className="h-1 w-12 bg-cyan-500 rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {cast.map((person) => (
              <div key={person.id} className="group flex flex-col items-center">
                <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-slate-900 mb-4 border border-white/5 transition-all group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w92${person.profile_path}`
                        : "https://placehold.co/92x138?text=No+Image"
                    }
                    alt={person.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-xs font-black text-slate-100 text-center uppercase tracking-wider line-clamp-1">
                  {person.name}
                </h3>
                <p className="text-[10px] font-bold text-slate-500 text-center uppercase tracking-[0.2em] line-clamp-1 mt-1">
                  {person.character}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Info Sidebar */}
        <section className="space-y-8 glass-card p-10 rounded-[2.5rem] h-fit sticky top-24">
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Status
              </h3>
              <p className="text-white font-bold text-lg">{movie.status}</p>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Release Date
              </h3>
              <p className="text-white font-bold text-lg">{movie.release_date}</p>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Budget
              </h3>
              <p className="text-white font-bold text-lg">
                ${movie.budget?.toLocaleString() || "N/A"}
              </p>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Revenue
              </h3>
              <p className="text-white font-bold text-lg">
                ${movie.revenue?.toLocaleString() || "N/A"}
              </p>
            </div>
            
            {movie.production_companies?.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Production
                </h3>
                <p className="text-white font-bold text-lg line-clamp-2">
                  {movie.production_companies[0].name}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Similar Movies */}
      <section className="space-y-10 pb-20 px-4 sm:px-8 lg:px-12">
        <div className="space-y-2">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
            Similar <span className="text-cyan-400 text-glow">Movies</span>
          </h2>
          <div className="h-1 w-12 bg-cyan-500 rounded-full" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {similar.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default MovieDetail;
