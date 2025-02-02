import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
          const [favorites, setFavorites] = useState([]);

          useEffect(() => {
                    const storedFavorites = localStorage.getItem('favorites');
                    if (storedFavorites) {
                              setFavorites(JSON.parse(storedFavorites));
                    }
          }, []);

          useEffect(() => {
                    localStorage.setItem('favorites', JSON.stringify(favorites));
          }, [favorites]);

          const handleAddFavorite = (movie) => {
                              setFavorites(favorites => [...favorites, movie]);
          }

          function handleRemoveFavorite(movieId) {
                    setFavorites(favorites => favorites.filter(favorite => favorite.id !== movieId));
          }

          const isFavorite = (movieId) => {
                    return favorites.some(favorite => favorite.id === movieId);
          }

          const contextValue = {
                    favorites,
                    handleAddFavorite,
                    handleRemoveFavorite,
                    isFavorite
          }

          return <MovieContext.Provider value={contextValue}>
                    {children}
          </MovieContext.Provider>
}