function SkeletonCard() {
  return (
    <div className="glass-card overflow-hidden rounded-2xl border border-white/5 bg-slate-900/40 p-0 shadow-xl animate-pulse">
      <div className="aspect-[2/3] bg-white/5" />
      <div className="space-y-4 p-5">
        <div className="h-4 w-3/4 rounded-full bg-white/5" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-12 rounded-full bg-white/5" />
          <div className="h-6 w-16 rounded-lg bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
