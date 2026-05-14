import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import MovieCard from "./MovieCard";
import SkeletonCard from "./SkeletonCard";
import { useGenreMovies } from "../hooks/useGenreMovies";
import { getGenreBySlug } from "../config/genres";

function GenrePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { ref, inView } = useInView();

  const genre = getGenreBySlug(slug);

  const {
    searchInput,
    handleInputChange,
    movies,
    error,
    isEmpty,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGenreMovies({
    genreId: genre?.id,
    searchWithinGenre: true,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!genre) {
    navigate("/");
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-50 sm:text-5xl">
            {genre.label} Movies
          </h1>
          <p className="text-lg text-slate-400">
            {searchInput 
              ? `Showing results for "${searchInput}" in ${genre.label}`
              : `Explore the best ${genre.label} movies.`}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl bg-slate-900/60 p-4 shadow-lg ring-1 ring-slate-800">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder={genre.placeholder}
              value={searchInput}
              onChange={handleInputChange}
              aria-label={`Search ${genre.label} movies`}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 shadow-inner outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-300/40"
            />
          </div>
          {status === "error" && (
            <div className="rounded-lg border border-red-400/60 bg-red-500/10 px-3 py-2 text-sm text-red-100">
              {error?.message || "An error occurred while fetching movies."}
            </div>
          )}
          {isEmpty && (
            <div className="rounded-lg border border-slate-600/60 bg-slate-800/50 px-3 py-2 text-sm text-slate-300">
              No movies found
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {(isFetching || isFetchingNextPage) &&
          Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
      </div>
      
      {/* Invisible element to trigger intersection observer */}
      <div ref={ref} className="h-10 w-full" />
    </div>
  );
}

export default GenrePage;
