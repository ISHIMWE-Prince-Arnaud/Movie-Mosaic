import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function NavBar() {
  const [selectedGenre, setSelectedGenre] = useState("Other Genres");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-lg font-bold tracking-tight text-amber-300">
          <Link to="/">Movie Mosaic</Link>
        </div>

        <div className="flex items-center gap-3 text-sm font-semibold text-slate-200">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 transition hover:text-amber-300 ${
                isActive ? "bg-slate-800 text-amber-200" : ""
              }`
            }>
            Trending
          </NavLink>
          <NavLink
            to="/action"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 transition hover:text-amber-300 ${
                isActive ? "bg-slate-800 text-amber-200" : ""
              }`
            }>
            Action
          </NavLink>
          <NavLink
            to="/horror"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 transition hover:text-amber-300 ${
                isActive ? "bg-slate-800 text-amber-200" : ""
              }`
            }>
            Horror
          </NavLink>
          <NavLink
            to="/drama"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 transition hover:text-amber-300 ${
                isActive ? "bg-slate-800 text-amber-200" : ""
              }`
            }>
            Drama
          </NavLink>
          <NavLink
            to="/favorite"
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 transition hover:text-amber-300 ${
                isActive ? "bg-slate-800 text-amber-200" : ""
              }`
            }>
            Favorite
          </NavLink>

          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}>
            <button className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 transition hover:border-amber-300 hover:text-amber-200">
              {selectedGenre} ▾
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 grid min-w-[180px] gap-1 rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-2xl">
                {[
                  ["Comedy", "/comedy"],
                  ["Sci-Fi", "/sci-fi"],
                  ["Romance", "/romance"],
                  ["Thriller", "/thriller"],
                  ["Fantasy", "/fantasy"],
                  ["Animation", "/animation"],
                  ["Documentary", "/documentary"],
                  ["Mystery", "/mystery"],
                  ["Adventure", "/adventure"],
                  ["Crime", "/crime"],
                ].map(([label, path]) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-800 hover:text-amber-200 ${
                        isActive ? "bg-slate-800 text-amber-200" : ""
                      }`
                    }
                    onClick={() => handleGenreSelect(label)}>
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
