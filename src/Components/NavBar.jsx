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
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie Mosaic</Link>
      </div>

      <div className="navbar-links">
        <NavLink to="/" className="nav-link">Trending</NavLink>
        <NavLink to="/action" className="nav-link">Action</NavLink>
        <NavLink to="/horror" className="nav-link">Horror</NavLink>
        <NavLink to="/drama" className="nav-link">Drama</NavLink>
        <NavLink to="/favorite" className="nav-link">Favorite</NavLink>

        {/* Dropdown for Other Genres */}
        <div 
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="dropdown-btn">{selectedGenre} ▾</button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <NavLink to="/comedy" className="dropdown-item" onClick={() => handleGenreSelect("Comedy")}>Comedy</NavLink>
              <NavLink to="/sci-fi" className="dropdown-item" onClick={() => handleGenreSelect("Sci-Fi")}>Sci-Fi</NavLink>
              <NavLink to="/romance" className="dropdown-item" onClick={() => handleGenreSelect("Romance")}>Romance</NavLink>
              <NavLink to="/thriller" className="dropdown-item" onClick={() => handleGenreSelect("Thriller")}>Thriller</NavLink>
              <NavLink to="/fantasy" className="dropdown-item" onClick={() => handleGenreSelect("Fantasy")}>Fantasy</NavLink>
              <NavLink to="/animation" className="dropdown-item" onClick={() => handleGenreSelect("Animation")}>Animation</NavLink>
              <NavLink to="/documentary" className="dropdown-item" onClick={() => handleGenreSelect("Documentary")}>Documentary</NavLink>
              <NavLink to="/mystery" className="dropdown-item" onClick={() => handleGenreSelect("Mystery")}>Mystery</NavLink>
              <NavLink to="/adventure" className="dropdown-item" onClick={() => handleGenreSelect("Adventure")}>Adventure</NavLink>
              <NavLink to="/crime" className="dropdown-item" onClick={() => handleGenreSelect("Crime")}>Crime</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;