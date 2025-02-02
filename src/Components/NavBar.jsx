import { Link } from "react-router-dom";
import "../CSS/NavBar.css"

function NavBar() {
          return (
                    <nav className="navbar">
                              <div className="navbar-brand">
                                        <Link to="/">Movie Mosaic</Link>
                              </div>
                              <div className="navbar-links">
                                        <Link to="/" className="nav-link">Home</Link>
                                        <Link to="/favorite" className="nav-link">Favorite</Link>
                              </div>
                    </nav>
          )
}

export default NavBar