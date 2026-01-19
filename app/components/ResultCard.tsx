import type { RecommendItem } from "../lib/api";

function formatPrice(v: number | null | undefined) {
  if (v == null || Number.isNaN(v)) return "—";
  return `$${v.toFixed(2)}`;
}

export function ResultCard({ item }: { item: RecommendItem }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.title ?? "product"}
              className="h-24 w-24 rounded-md object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-md bg-gray-100" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-slate-900">
                {item.title ?? "Untitled"}
              </h3>
              <p className="mt-1 text-xs text-slate-500">ID: {item.id}</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-900">{formatPrice(item.price ?? null)}</div>
              <div className="mt-1 text-xs text-slate-500">
                {item.average_rating != null ? `${item.average_rating}★` : "—"} ({item.rating_number ?? 0})
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.store ? (
              <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">{item.store}</span>
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
            <p className="mt-3 line-clamp-2 text-xs text-slate-600">{item.preview}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
