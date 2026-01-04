import { useState, useEffect, useCallback } from "react";
import { searchMovies, getMoviesByGenre } from "../Services/API";

export const useGenreMovies = ({
  genreId,
  fetchGenreMovies,
  searchWithinGenre = true,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const genreFetcher = useCallback(() => {
    const fn = fetchGenreMovies ?? (() => getMoviesByGenre(genreId));
    return fn();
  }, [fetchGenreMovies, genreId]);

  const performSearch = useCallback(
    async (query) => {
      setLoading(true);
      setError(null);
      try {
        let results = [];

        if (!query) {
          results = await genreFetcher();
        } else {
          const searched = await searchMovies(query);
          results =
            searchWithinGenre && genreId
              ? searched.filter((movie) =>
                  Array.isArray(movie?.genre_ids)
                    ? movie.genre_ids.includes(genreId)
                    : false
                )
              : searched;
        }

        setMovies(results);
        setError(results.length ? null : "No movies found.");
      } catch (err) {
        console.error("Failed to fetch movies.", err);
        setError("Failed to fetch movies.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [genreFetcher, searchWithinGenre, genreId]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      performSearch(searchQuery.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, performSearch]);

  const handleSearchClick = () => {
    performSearch(searchQuery.trim());
  };

  return {
    searchQuery,
    setSearchQuery,
    movies,
    loading,
    error,
    handleSearchClick,
  };
};
