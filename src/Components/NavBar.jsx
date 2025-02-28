import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "../CSS/NavBar.css";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
          <button className="dropdown-btn">Other Genres</button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <NavLink to="/comedy" className="dropdown-item">Comedy</NavLink>
              <NavLink to="/sci-fi" className="dropdown-item">Sci-Fi</NavLink>
              <NavLink to="/romance" className="dropdown-item">Romance</NavLink>
              <NavLink to="/thriller" className="dropdown-item">Thriller</NavLink>
              <NavLink to="/fantasy" className="dropdown-item">Fantasy</NavLink>
              <NavLink to="/animation" className="dropdown-item">Animation</NavLink>
              <NavLink to="/documentary" className="dropdown-item">Documentary</NavLink>
              <NavLink to="/mystery" className="dropdown-item">Mystery</NavLink>
              <NavLink to="/adventure" className="dropdown-item">Adventure</NavLink>
              <NavLink to="/crime" className="dropdown-item">Crime</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;