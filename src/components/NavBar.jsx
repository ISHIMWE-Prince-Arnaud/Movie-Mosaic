import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { GENRES } from "../config/genres";

function NavBar() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <nav
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        scrolled ? "nav-solid py-3" : "nav-transparent py-5"
      }`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="group relative">
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter text-white transition-all hover:scale-105 active:scale-95">
            MOVIE <span className="text-cyan-400 text-glow">MOSAIC</span>
          </Link>
          <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan-400 transition-all group-hover:w-full" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 text-[13px] font-bold uppercase tracking-widest text-slate-300 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 transition-all hover:bg-white/5 hover:text-white ${
                  isActive ? "bg-white/10 text-cyan-400" : ""
                }`
              }>
              {link.label}
            </NavLink>
          ))}

          <div
            className="relative ml-2"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
            onFocus={() => setIsDropdownOpen(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) {
                setIsDropdownOpen(false);
              }
            }}>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-300 transition-all hover:border-cyan-400/50 hover:text-white"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}>
              {getCurrentGenreLabel()}
              <svg
                className={`h-4 w-4 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 mt-3 grid min-w-[200px] gap-1 rounded-2xl border border-white/10 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200"
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
                      `rounded-xl px-4 py-2.5 text-left text-xs font-bold uppercase tracking-wider transition-all hover:bg-white/5 hover:text-cyan-400 ${
                        isActive ? "bg-white/10 text-cyan-400" : ""
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
          className="rounded-full p-2 text-slate-200 transition-all hover:bg-white/5 md:hidden"
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
        <div className="border-t border-white/5 bg-slate-950/95 p-6 backdrop-blur-2xl md:hidden animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-4 text-sm font-bold uppercase tracking-widest transition-all ${
                    isActive
                      ? "bg-white/10 text-cyan-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`
                }>
                {link.label}
              </NavLink>
            ))}
            
            <div className="mt-6 border-t border-white/5 pt-6">
              <p className="mb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Other Genres
              </p>
              <div className="grid grid-cols-2 gap-3">
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
                      `rounded-xl px-4 py-3 text-[11px] font-bold uppercase tracking-wider transition-all ${
                        isActive
                          ? "bg-white/10 text-cyan-400"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
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

