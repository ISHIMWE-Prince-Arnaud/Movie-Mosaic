import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Hero({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative -mx-4 -mt-8 mb-12 h-[60vh] min-h-[450px] overflow-hidden lg:-mx-8 lg:h-[75vh]">
      {movies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}>
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full px-6 pb-12 sm:px-12 lg:px-20">
            <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-cyan-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  Trending Now
                </span>
                <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
                  <svg className="h-4 w-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  {movie.vote_average?.toFixed(1)}
                </div>
              </div>
              
              <h2 className="mb-4 text-5xl font-black tracking-tighter text-white sm:text-6xl lg:text-7xl">
                {movie.title}
              </h2>
              
              <p className="mb-8 line-clamp-2 text-lg font-medium text-slate-300 sm:line-clamp-3 lg:text-xl">
                {movie.overview}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to={`/movie/${movie.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-slate-950 shadow-xl transition-all hover:scale-105 hover:bg-cyan-400 active:scale-95">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Pagination Dots */}
      <div className="absolute bottom-8 right-12 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-cyan-400" : "w-3 bg-white/20"
            } rounded-full`}
          />
        ))}
      </div>
    </div>
  );
}

Hero.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Hero;
