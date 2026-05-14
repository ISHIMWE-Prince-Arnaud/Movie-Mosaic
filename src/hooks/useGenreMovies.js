import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchMovies, getMoviesByGenre } from "../services/api";

export const useGenreMovies = ({ genreId, searchWithinGenre = true }) => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

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
    queryKey: debouncedSearch
      ? ["searchGenreMovies", genreId, debouncedSearch]
      : ["genreMovies", genreId],
    queryFn: async ({ pageParam = 1, signal }) => {
      if (debouncedSearch) {
        const searched = await searchMovies({ query: debouncedSearch, pageParam, signal });
        
        // Note: TMDB search doesn't natively filter by genre perfectly on the backend in the same endpoint.
        // We do client-side filtering here, but be aware this breaks true pagination if all results on a page are filtered out.
        // A better approach for searchWithinGenre is using the discover endpoint with both with_genres and a query if possible,
        // but TMDB discover doesn't support text query. So we must filter client-side.
        if (searchWithinGenre && genreId) {
           return {
             ...searched,
             results: searched.results.filter((movie) =>
                  Array.isArray(movie?.genre_ids)
                    ? movie.genre_ids.includes(genreId)
                    : false,
             )
           };
        }
        return searched;
      }
      return getMoviesByGenre({ genreId, pageParam, signal });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!genreId, // Don't fetch if genreId is missing
  });

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const movies = data?.pages.flatMap((page) => page.results) || [];
  const isEmpty = status === "success" && movies.length === 0;

  return {
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
  };
};
