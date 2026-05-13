function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl animate-pulse">
      <div className="aspect-[2/3] bg-slate-800" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 rounded bg-slate-800" />
        <div className="flex items-center justify-between">
          <div className="h-4 w-12 rounded bg-slate-800" />
          <div className="h-6 w-16 rounded-full bg-slate-800" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
