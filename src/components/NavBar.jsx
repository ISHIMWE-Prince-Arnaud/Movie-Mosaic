import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { GENRES } from "../config/genres";

function NavBar() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Derive current genre from URL
  const getCurrentGenreLabel = () => {
    if (location.pathname.startsWith("/genre/")) {
      const slug = location.pathname.split("/")[2];
      const genre = GENRES.find((g) => g.slug === slug);
      return genre?.label || "Other Genres";
    }
    return "Other Genres";
  };

  const handleGenreSelect = () => {
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/genre/action", label: "Action" },
    { to: "/genre/thriller", label: "Thriller" },
    { to: "/genre/sci-fi", label: "Sci-Fi" },
    { to: "/genre/crime", label: "Crime" },
    { to: "/favorites", label: "Favorites" },
  ];

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="text-lg font-bold tracking-tight text-amber-300">
          <Link to="/">Movie Mosaic</Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-3 text-sm font-semibold text-slate-200 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 transition hover:text-amber-300 ${
                  isActive ? "bg-slate-800 text-amber-200" : ""
                }`
              }>
              {link.label}
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setIsDropdownOpen(false);
              }
            }}>
            <button
              className="inline-flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-slate-200 transition hover:border-amber-300 hover:text-amber-200"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}>
              {getCurrentGenreLabel()} ▾
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-2 grid min-w-[180px] gap-1 rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-2xl"
                role="menu">
                {GENRES.filter(
                  (genre) =>
                    !["action", "thriller", "sci-fi", "crime"].includes(
                      genre.slug,
                    ),
                ).map((genre) => (
                  <NavLink
                    key={genre.slug}
                    to={`/genre/${genre.slug}`}
                    role="menuitem"
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-left text-sm transition hover:bg-slate-800 hover:text-amber-200 ${
                        isActive ? "bg-slate-800 text-amber-200" : ""
                      }`
                    }
                    onClick={() => handleGenreSelect()}>
                    {genre.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="rounded-lg p-2 text-slate-200 hover:bg-slate-800 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu">
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-950/95 p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-slate-800 text-amber-200"
                      : "text-slate-200 hover:bg-slate-900 hover:text-amber-300"
                  }`
                }>
                {link.label}
              </NavLink>
            ))}
            
            <div className="mt-4 border-t border-slate-800 pt-4">
              <p className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Other Genres
              </p>
              <div className="grid grid-cols-2 gap-2">
                {GENRES.filter(
                  (genre) =>
                    !["action", "thriller", "sci-fi", "crime"].includes(
                      genre.slug,
                    ),
                ).map((genre) => (
                  <NavLink
                    key={genre.slug}
                    to={`/genre/${genre.slug}`}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-2 text-sm transition ${
                        isActive
                          ? "bg-slate-800 text-amber-200"
                          : "text-slate-200 hover:bg-slate-900 hover:text-amber-300"
                      }`
                    }>
                    {genre.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;

