import type { RecommendItem } from "../lib/api";

function formatPrice(v: number | null | undefined) {
  if (v == null || Number.isNaN(v)) return "—";
  return `$${v.toFixed(2)}`;
}

export function ResultCard({ item }: { item: RecommendItem }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row">
        {/* Image */}
        <div className="w-full sm:w-24 sm:shrink-0">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:h-24 sm:w-24 sm:aspect-auto">
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.title ?? "product"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">
                No image
              </div>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 sm:truncate">
                {item.title ?? "Untitled"}
              </h3>
              <p className="mt-1 break-all text-xs text-slate-500">ID: {item.id}</p>
            </div>
            
            <div className="flex items-baseline justify-between gap-3 sm:block sm:text-right">
              <div className="text-sm font-semibold text-slate-900">
                {formatPrice(item.price ?? null)}
              </div>
              <div className="mt-0 text-xs text-slate-500 sm:mt-1">
                {item.average_rating != null ? `${item.average_rating}★` : "—"} (
                {item.rating_number ?? 0})
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {item.store ? (
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                {item.store}
              </span>
            ) : null}
            {item.main_category ? (
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                {item.main_category}
              </span>
            ) : null}
            {item.distance != null ? (
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
                dist: {item.distance.toFixed(3)}
              </span>
            ) : null}
          </div>
          
          {item.reason ? (
            <p className="mt-3 text-sm text-slate-800">
              <span className="font-semibold">Why:</span> {item.reason}
            </p>
          ) : null}
          
          {item.preview ? (
            <p className="mt-3 line-clamp-3 text-xs text-slate-600 sm:line-clamp-2">
              {item.preview}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}