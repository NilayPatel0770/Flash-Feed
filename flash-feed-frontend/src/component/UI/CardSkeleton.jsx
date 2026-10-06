const CardSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl rounded-2xl shadow-lg overflow-hidden mb-8 animate-pulse bg-card border border-slate-200/50 dark:border-slate-800">
      <div className="md:flex">
        <div className="md:w-1/3 h-64 bg-slate-200 dark:bg-slate-700/60"></div>

        <div className="md:w-2/3 p-6">
          <div className="w-24 h-4 bg-slate-200 dark:bg-slate-700/60 rounded"></div>

          <div className="mt-4 h-8 bg-slate-200 dark:bg-slate-700/60 rounded w-3/4"></div>

          <div className="mt-3 h-4 bg-slate-200 dark:bg-slate-700/60 rounded w-1/2"></div>

          <div className="mt-8 space-y-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700/60 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700/60 rounded"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700/60 rounded w-5/6"></div>
          </div>

          <div className="mt-8 flex gap-5">
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700/60 rounded-full"></div>
            <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700/60 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;