import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Favorite from "./Pages/Favorite";
import NavBar from "./Components/NavBar";
import { MovieProvider } from "./Contexts/MovieContext";
import ActionMovies from "./Pages/ActionMovies";
import HorrorMovies from "./Pages/HorrorMovies";
import DramaMovies from "./Pages/DramaMovies";
import ComedyMovies from "./Pages/ComedyMovies";
import SciFiMovies from "./Pages/SciFiMovies";
import RomanceMovies from "./Pages/RomanceMovies";
import ThrillerMovies from "./Pages/ThrillerMovies";
import FantasyMovies from "./Pages/FantasyMovies";
import AnimationMovies from "./Pages/AnimationMovies";
import DocumentaryMovies from "./Pages/DocumentaryMovies";
import MysteryMovies from "./Pages/MysteryMovies";
import AdventureMovies from "./Pages/AdventureMovies";
import CrimeMovies from "./Pages/CrimeMovies";

function App() {
  return (
    <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/action" element={<ActionMovies />} />
          <Route path="/horror" element={<HorrorMovies />} />
          <Route path="/drama" element={<DramaMovies />} />
          <Route path="/favorite" element={<Favorite />} />

          {/* Other Genres in Dropdown */}
          <Route path="/comedy" element={<ComedyMovies />} />
          <Route path="/sci-fi" element={<SciFiMovies />} />
          <Route path="/romance" element={<RomanceMovies />} />
          <Route path="/thriller" element={<ThrillerMovies />} />
          <Route path="/fantasy" element={<FantasyMovies />} />
          <Route path="/animation" element={<AnimationMovies />} />
          <Route path="/documentary" element={<DocumentaryMovies />} />
          <Route path="/mystery" element={<MysteryMovies />} />
          <Route path="/adventure" element={<AdventureMovies />} />
          <Route path="/crime" element={<CrimeMovies />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;