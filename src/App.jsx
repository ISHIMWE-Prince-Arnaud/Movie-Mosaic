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
  <div className="flex items-center justify-center py-12">
    <div className="flex items-center gap-3 text-amber-200">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
      <span>Loading...</span>
    </div>
  </div>
);

function App() {
  return (
    <MovieProvider>
      <div className="relative min-h-screen bg-slate-950 text-slate-100">
        <div className="grain-overlay" />
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
