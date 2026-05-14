import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useMovieContext();

    <div className="space-y-12 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-white sm:text-5xl lg:text-6xl">
          Your <span className="text-cyan-400 text-glow">Favorites</span>
        </h1>
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-slate-500">
          {favorites.length} saved {favorites.length === 1 ? "masterpiece" : "masterpieces"}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
}

const EmptyState = () => (
  <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-[2.5rem] border border-white/5 bg-slate-900/40 p-12 text-center backdrop-blur-xl">
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 text-4xl shadow-[0_0_30px_rgba(6,182,212,0.2)]">
      ❤️
    </div>
    <div className="space-y-2">
      <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Your list is empty</h2>
      <p className="max-w-xs text-sm font-bold uppercase tracking-widest text-slate-500">
        Discover and save your cinematic journey here
      </p>
    </div>
  </div>
);

export default function FavoritesWrapper() {
  const { favorites } = useMovieContext();
  return favorites.length > 0 ? <Favorites /> : <EmptyState />;
}
