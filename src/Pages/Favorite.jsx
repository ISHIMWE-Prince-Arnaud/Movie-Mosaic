import { useMovieContext } from "../Contexts/MovieContext";
import MovieCard from "../Components/MovieCard";

function Favorite() {
          const { favorites } = useMovieContext();

          if (favorites.length > 0) {
                    return (
                              <div className="favorites">
                                        <h1>Favorite Movies</h1>
                                        <div className="movie-list">
                                                  {favorites.map((movie) => (
                                                            <MovieCard key={movie.id} movie={movie} isFavorite={true} />
                                                  ))}
                                        </div>
                              </div>
                    );
          }

          return (
                    <div className="favorites-empty">
                              <h1>No Favorite Movies Yet</h1>
                              <p>Start adding movies to your favorites</p>
                    </div>
          );
}

export default Favorite;