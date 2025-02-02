import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Favorite from "./Pages/Favorite";
import NavBar from "./Components/NavBar";
import { MovieProvider } from "./Contexts/MovieContext";
import "./CSS/App.css";

function App() {
  return (
    <MovieProvider>
              <NavBar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/favorite" element={<Favorite />} />
                </Routes>
              </main>
    </MovieProvider>
  );
}

export default App;