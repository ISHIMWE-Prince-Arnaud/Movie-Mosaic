import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";

// Lazy load components for code splitting
const Home = lazy(() => import("./pages/Home"));
const Favorites = lazy(() => import("./pages/Favorites"));
const GenrePage = lazy(() => import("./components/GenrePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center py-24">
    <div className="flex flex-col items-center gap-4 text-cyan-400">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Cinematic Loading</span>
    </div>
  </div>
);

function App() {
  return (
    <MovieProvider>
      <div className="relative min-h-screen">
        <NavBar />
        <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/genre/:slug" element={<GenrePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </MovieProvider>
  );
}

export default App;
