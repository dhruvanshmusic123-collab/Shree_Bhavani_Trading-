export default function ProductSkeleton() {
  return (
    <div className="card-industrial animate-pulse">
      <div className="h-44 bg-dark-200 rounded-t-xl" />
      <div className="p-4 space-y-3">
        <div className="h-3 bg-dark-200 rounded w-1/3" />
        <div className="h-4 bg-dark-200 rounded w-3/4" />
        <div className="h-3 bg-dark-200 rounded w-full" />
        <div className="h-3 bg-dark-200 rounded w-2/3" />
        <div className="flex gap-1 pt-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-5 w-10 bg-dark-200 rounded" />
          ))}
        </div>
        <div className="flex gap-2 pt-2 border-t border-white/5">
          <div className="flex-1 h-8 bg-dark-200 rounded-lg" />
          <div className="flex-1 h-8 bg-dark-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
