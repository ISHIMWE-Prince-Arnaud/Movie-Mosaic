import { createContext, useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const MovieContext = createContext();

// Allow exporting the hook from this non-component file for convenience
// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the app starts
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add a movie to favorites (prevent duplicates)
  const handleAddFavorite = (movie) => {
    setFavorites((favorites) => {
      if (favoriteIds.has(movie.id)) return favorites; // Prevent duplicates using O(1) lookup
      return [...favorites, movie];
    });
  };

  // Remove a movie from favorites
  const handleRemoveFavorite = (movieId) => {
    setFavorites((favorites) => favorites.filter((fav) => fav.id !== movieId));
  };

  // Memoize favorite IDs for O(1) lookups
  const favoriteIds = useMemo(
    () => new Set(favorites.map((f) => f.id)),
    [favorites],
  );

  // Check if a movie is in favorites (O(1) lookup)
  const isFavorite = (movieId) => {
    return favoriteIds.has(movieId);
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        handleAddFavorite,
        handleRemoveFavorite,
        isFavorite,
      }}>
      {children}
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
