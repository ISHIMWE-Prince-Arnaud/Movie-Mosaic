import PropTypes from "prop-types";

function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-10 left-1/2 z-[9999] -translate-x-1/2 transform">
      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900/90 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-cyan-400 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl animate-in fade-in slide-in-from-bottom-8 duration-500">
        <span className="text-glow">{message}</span>
        <button
          onClick={onClose}
          className="ml-4 flex h-6 w-6 items-center justify-center rounded-full bg-white/5 transition hover:bg-white/10 active:scale-90"
          aria-label="Close notification"
        >
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Toast;
