import { useMovieContext } from "../Contexts/MovieContext";
import MovieCard from "../Components/MovieCard";

function Favorite() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-amber-300">Favorite Movies</h1>
            <p className="text-sm text-slate-400">
              You have {favorites.length} saved
              {favorites.length === 1 ? " movie" : " movies"}.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center">
      <h1 className="text-2xl font-bold text-amber-300">No Favorite Movies Yet</h1>
      <p className="text-slate-300">Start adding movies to your favorites.</p>
    </div>
  );
}

export default Favorite;