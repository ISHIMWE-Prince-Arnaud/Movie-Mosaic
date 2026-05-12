import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [details, credits, similarMovies, videos] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getSimilarMovies(id),
          getMovieVideos(id),
        ]);

        setMovie(details);
        setCast(credits.slice(0, 10)); // Show top 10 cast
        setSimilar(similarMovies.slice(0, 6)); // Show top 6 similar

        const trailer = videos.find(
          (video) => video.type === "Trailer" && video.site === "YouTube",
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        setError("Failed to load movie details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
    window.scrollTo(0, 0);
  }, [id]);

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

        <div className="absolute bottom-0 left-0 w-full px-4 pb-12 sm:px-8 lg:px-12">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-cyan-600 rounded-full">
                {movie.release_date?.split("-")[0]}
              </span>
              <span className="px-3 py-1 text-xs font-bold tracking-wider text-white uppercase bg-slate-800 rounded-full">
                {movie.runtime} min
              </span>
              <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30">
                <span className="text-amber-400 text-xs font-bold">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl mb-4 leading-tight">
              {movie.title}
            </h1>

            <p className="text-lg text-slate-200 line-clamp-3 mb-8 max-w-2xl leading-relaxed">
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
                  className="inline-flex items-center gap-2 px-8 py-3 font-bold text-slate-950 bg-cyan-400 rounded-xl transition hover:bg-cyan-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24">
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
                      className="px-4 py-3 text-sm font-semibold text-white bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-700 transition hover:bg-slate-700">
                      {genre.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cast Section */}
        <section className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white border-l-4 border-cyan-500 pl-4">
            The Cast
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {cast.map((person) => (
              <div key={person.id} className="group flex flex-col items-center">
                <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-slate-800 mb-3 border border-slate-800 transition group-hover:border-cyan-500/50">
                  <img
                    src={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w92${person.profile_path}`
                        : "https://placehold.co/92x138?text=No+Image"
                    }
                    srcSet={
                      person.profile_path
                        ? `https://image.tmdb.org/t/p/w45${person.profile_path} 92w,
       https://image.tmdb.org/t/p/w92${person.profile_path} 185w`
                        : "https://placehold.co/92x138?text=No+Image"
                    }
                    sizes="(max-width: 640px) 92px, 185px"
                    alt={person.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-sm font-bold text-slate-100 text-center line-clamp-1">
                  {person.name}
                </h3>
                <p className="text-xs text-slate-400 text-center line-clamp-1">
                  {person.character}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Info Sidebar */}
        <section className="space-y-8 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm h-fit">
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Status
            </h3>
            <p className="text-white font-medium">{movie.status}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Release Date
            </h3>
            <p className="text-white font-medium">{movie.release_date}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Budget
            </h3>
            <p className="text-white font-medium">
              ${movie.budget?.toLocaleString() || "N/A"}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Revenue
            </h3>
            <p className="text-white font-medium">
              ${movie.revenue?.toLocaleString() || "N/A"}
            </p>
          </div>
          {movie.production_companies?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Production
              </h3>
              <p className="text-white font-medium">
                {movie.production_companies[0].name}
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Similar Movies */}
      <section className="space-y-8 pb-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white border-l-4 border-cyan-500 pl-4">
            Similar Movies
          </h2>
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
