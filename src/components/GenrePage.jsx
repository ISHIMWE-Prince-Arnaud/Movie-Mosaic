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
    <div className="space-y-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl lg:text-6xl">
            {genre.label} <span className="text-cyan-400 text-glow">Movies</span>
          </h1>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
            {searchInput 
              ? `Filtered for "${searchInput}"`
              : `Curated ${genre.label} collection`}
          </p>
        </div>

        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder={genre.placeholder}
            value={searchInput}
            onChange={handleInputChange}
            aria-label={`Search ${genre.label} movies`}
            className="w-full rounded-2xl border border-white/5 bg-slate-900/40 px-6 py-4 text-sm font-medium text-white shadow-2xl backdrop-blur-xl transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
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
      <div ref={ref} className="h-20 w-full" />
    </div>
  );
}

export default GenrePage;
