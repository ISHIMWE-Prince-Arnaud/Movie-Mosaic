import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import ActionMovies from "./pages/ActionMovies";
import HorrorMovies from "./pages/HorrorMovies";
import DramaMovies from "./pages/DramaMovies";
import ComedyMovies from "./pages/ComedyMovies";
import SciFiMovies from "./pages/SciFiMovies";
import RomanceMovies from "./pages/RomanceMovies";
import ThrillerMovies from "./pages/ThrillerMovies";
import FantasyMovies from "./pages/FantasyMovies";
import AnimationMovies from "./pages/AnimationMovies";
import DocumentaryMovies from "./pages/DocumentaryMovies";
import MysteryMovies from "./pages/MysteryMovies";
import AdventureMovies from "./pages/AdventureMovies";
import CrimeMovies from "./pages/CrimeMovies";

function App() {
  return (
    <MovieProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <NavBar />
        <main className="mx-auto max-w-6xl px-4 pb-12 pt-6">
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
      </div>
    </MovieProvider>
  );
}

export default App;
