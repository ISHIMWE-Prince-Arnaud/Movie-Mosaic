import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import Toast from "../components/Toast";

const MovieContext = createContext();

// Allow exporting the hook from this non-component file for convenience
// eslint-disable-next-line react-refresh/only-export-components
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState(null);

  // Load favorites from localStorage when the app starts
  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) setFavorites(JSON.parse(stored));
    } catch {
      localStorage.removeItem("favorites");
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const showToast = useCallback((message) => {
    setToast(message);
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Add a movie to favorites (prevent duplicates)
  const handleAddFavorite = (movie) => {
    setFavorites((favorites) => {
      const isAlreadyFav = favorites.some((fav) => fav.id === movie.id);
      if (isAlreadyFav) return favorites;
      
      showToast(`Added "${movie.title}" to favorites ❤️`);
      return [...favorites, movie];
    });
  };

  // Remove a movie from favorites
  const handleRemoveFavorite = (movieId) => {
    setFavorites((favorites) => {
      const movieToRemove = favorites.find((fav) => fav.id === movieId);
      if (movieToRemove) {
        showToast(`Removed "${movieToRemove.title}" from favorites`);
      }
      return favorites.filter((fav) => fav.id !== movieId);
    });
  };

  // Memoize favorite IDs for O(1) lookups
  const favoriteIds = useMemo(
    () => new Set(favorites.map((f) => f.id)),
    [favorites],
  );

  // Create a Map for O(1) lookups - more efficient than Set
  const favoriteMap = useMemo(() => {
    const map = new Map();
    favorites.forEach((movie) => map.set(movie.id, true));
    return map;
  }, [favorites]);

  // Check if a movie is in favorites (O(1) lookup)
  const isFavorite = (movieId) => {
    return favoriteMap.has(movieId);
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
      <Toast message={toast} onClose={() => setToast(null)} />
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
