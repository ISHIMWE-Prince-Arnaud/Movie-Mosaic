import { useEffect, useState, useCallback } from "react";
import MovieCard from "../Components/MovieCard";
import { searchMovies, getPopularMovies } from "../Services/API";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performSearch = useCallback(async (query) => {
    if (!query) {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setError(null);
      } catch (error) {
        console.error(error);
        setError("Failed to load movies");
        setMovies([]);
      }
      return;
    }

    try {
      setLoading(true);
      const results = await searchMovies(query);

      if (results.length > 0) {
        setMovies(results);
        setError(null);
      } else {
        setMovies([]);
        setError("No movies found");
      }
    } catch (error) {
      console.error(error);
      setError("Search failed");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(searchQuery.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, performSearch]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    performSearch(searchQuery.trim());
  };

  // Initial load of popular movies
  useEffect(() => {
    const loadInitialMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (error) {
        console.error(error);
        setError("Failed to load initial movies");
      }
    };

    loadInitialMovies();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl bg-slate-900/60 p-4 shadow-lg ring-1 ring-slate-800">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleInputChange}
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
            Searching...
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

export default Home;
