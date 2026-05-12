import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import GenrePage from "./components/GenrePage";

function App() {
  return (
    <MovieProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <NavBar />
        <main className="mx-auto max-w-6xl px-4 pb-12 pt-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/genre/:slug" element={<GenrePage />} />
          </Routes>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
