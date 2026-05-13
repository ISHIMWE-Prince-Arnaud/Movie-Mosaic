import PropTypes from "prop-types";

function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform">
      <div className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/95 px-6 py-3 text-sm font-bold text-amber-200 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 rounded-full p-1 transition hover:bg-slate-800"
          aria-label="Close notification"
        >
          ✕
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
