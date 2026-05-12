import { useState, useEffect, useCallback } from "react";
import { searchMovies, getMoviesByGenre } from "../services/api";

export const useGenreMovies = ({ genreId, searchWithinGenre = true }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  const genreFetcher = useCallback(
    (signal) => {
      return getMoviesByGenre(genreId, signal);
    },
    [genreId],
  );

  const performSearch = useCallback(
    async (query, signal) => {
      setLoading(true);
      setError(null);
      try {
        let results = [];

        if (!query) {
          results = await genreFetcher(signal);
        } else {
          const searched = await searchMovies(query, signal);
          results =
            searchWithinGenre && genreId
              ? searched.filter((movie) =>
                  Array.isArray(movie?.genre_ids)
                    ? movie.genre_ids.includes(genreId)
                    : false,
                )
              : searched;
        }

        if (!signal?.aborted) {
          setMovies(results);
          setError(null);
          setIsEmpty(results.length === 0);
        }
      } catch (err) {
        if (!signal?.aborted) {
          console.error("Failed to fetch movies.", err);
          setError("Failed to fetch movies.");
          setMovies([]);
          setIsEmpty(false);
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [genreFetcher, searchWithinGenre, genreId],
  );

  useEffect(() => {
    const controller = new AbortController();
    const handler = setTimeout(
      () => performSearch(searchQuery.trim(), controller.signal),
      300,
    );
    return () => {
      clearTimeout(handler);
      controller.abort();
    };
  }, [searchQuery, performSearch]);

  const handleSearchClick = () => {
    const controller = new AbortController();
    performSearch(searchQuery.trim(), controller.signal);
  };

  return {
    searchQuery,
    setSearchQuery,
    movies,
    loading,
    error,
    isEmpty,
    handleSearchClick,
  };
};
