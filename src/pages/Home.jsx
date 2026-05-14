import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import Hero from "../components/Hero";
import { searchMovies, getPopularMovies } from "../services/api";
import { GENRES } from "../config/genres";

function Home() {
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { ref, inView } = useInView();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: debouncedSearch ? ["searchMovies", debouncedSearch] : ["popularMovies"],
    queryFn: ({ pageParam = 1, signal }) => {
      if (debouncedSearch) {
        return searchMovies({ query: debouncedSearch, pageParam, signal });
      }
      return getPopularMovies({ pageParam, signal });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const movies = data?.pages.flatMap((page) => page.results) || [];
  const heroMovies = movies.slice(0, 5);
  const isEmpty = status === "success" && movies.length === 0;

  return (
    <div className="pb-12">
      {/* Cinematic Hero */}
      {!debouncedSearch && status === "success" && heroMovies.length > 0 && (
        <Hero movies={heroMovies} />
      )}

      <div className="space-y-12">
        <div className="flex flex-col gap-8">
          {/* Header & Search */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl lg:text-6xl">
                {debouncedSearch ? "Results" : "Trending"} <span className="text-cyan-400 text-glow">Mosaic</span>
              </h1>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
                {debouncedSearch 
                  ? `Found for "${debouncedSearch}"`
                  : "Discover the pulse of cinema"}
              </p>
            </div>

            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search for movies..."
                value={searchInput}
                onChange={handleInputChange}
                aria-label="Search movies"
                className="w-full rounded-2xl border border-white/5 bg-slate-900/40 px-6 py-4 text-sm font-medium text-white shadow-2xl backdrop-blur-xl transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Category Chips */}
          {!debouncedSearch && (
            <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex-shrink-0 rounded-full px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all ${
                    isActive && !location.pathname.includes("genre")
                      ? "bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                      : "bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-white"
                  }`
                }>
                All Genres
              </NavLink>
              {GENRES.slice(0, 8).map((genre) => (
                <NavLink
                  key={genre.slug}
                  to={`/genre/${genre.slug}`}
                  className="flex-shrink-0 rounded-full border border-white/5 bg-white/5 px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-slate-400 transition-all hover:bg-white/10 hover:text-white hover:border-white/10"
                >
                  {genre.label}
                </NavLink>
              ))}
            </div>
          )}

          {status === "error" && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm font-bold text-red-400">
              {error.message || "An error occurred while fetching movies."}
            </div>
          )}
          {isEmpty && (
            <div className="rounded-2xl border border-white/5 bg-white/5 p-12 text-center">
              <p className="text-lg font-bold text-slate-400">No movies found</p>
            </div>
          )}
        </div>

        {/* Movie Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          {(isFetching || isFetchingNextPage) &&
            Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
        </div>
        
        {/* Intersection Observer Trigger */}
        <div ref={ref} className="h-20 w-full" />
      </div>
    </div>
  );
}

export default Home;
