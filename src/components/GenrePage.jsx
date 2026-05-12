import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
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
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl bg-slate-900/60 p-4 shadow-lg ring-1 ring-slate-800">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 shadow-inner outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/40"
          />
          <button
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            onClick={handleSearchClick}>
            Search
          </button>
        </div>
        {loading && (
          <div className="inline-flex items-center gap-2 text-sm text-amber-200">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            Loading...
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-amber-400/60 bg-amber-500/10 px-3 py-2 text-sm text-amber-100">
            {error}
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
