import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

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
      if (favorites.some((fav) => fav.id === movie.id)) return favorites; // Prevent duplicates
      return [...favorites, movie];
    });
  };

  // Remove a movie from favorites
  const handleRemoveFavorite = (movieId) => {
    setFavorites((favorites) => favorites.filter((fav) => fav.id !== movieId));
  };

  // Check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        handleAddFavorite,
        handleRemoveFavorite,
        isFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};