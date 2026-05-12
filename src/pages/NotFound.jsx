import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="relative">
        <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 animate-pulse">
          404
        </h1>
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-lg blur opacity-25 animate-tilt"></div>
      </div>
      
      <h2 className="mt-8 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Page not found
      </h2>
      
      <p className="mt-4 text-lg text-slate-400 max-w-md">
        The movie you&apos;re looking for must have been deleted from the archives or never existed in this universe.
      </p>
      
      <div className="mt-10">
        <Link
          to="/"
          className="relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-slate-900 border border-slate-700 rounded-full hover:bg-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] group"
        >
          <span className="relative flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5 transition-transform group-hover:-translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </span>
        </Link>
      </div>
      
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
    </div>
  );
}

export default NotFound;
