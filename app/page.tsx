"use client";

import * as React from "react";
import { fetchRecommendations, getApiBase, RecommendItem } from "./lib/api";
import { ResultCard } from "./components/ResultCard";

const DEFAULT_API_BASE = getApiBase();

export default function Page() {
  const [query, setQuery] = React.useState("outfit for beach summer");
  const [k, setK] = React.useState(5);
  const [useLlm, setUseLlm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<RecommendItem[]>([]);
  const [lastRequestId, setLastRequestId] = React.useState<string | null>(null);
  
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    const requestId = `ui-${Math.random().toString(16).slice(2)}-${Date.now()}`;
    setLastRequestId(requestId);
    
    try {
      const data = await fetchRecommendations({ query, k, use_llm: useLlm });
      setResults(data.results ?? []);
    } catch (err) {
      setResults([]);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
          Semantic Fashion Recommender
        </h1>
        
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Natural-language search over product embeddings, with optional LLM reranking.
          </p>
          
          <div className="w-full sm:w-auto">
            <span className="block w-full sm:inline-block truncate rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-700">
              API: {DEFAULT_API_BASE}
            </span>
          </div>
        </div>
      </header>
      
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-12">
          <div className="md:col-span-8">
            <label className="block text-sm font-medium text-slate-900">Query</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
              placeholder="e.g. I need an outfit to go to the beach this summer"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-900">Top K</label>
            <input
              type="number"
              min={1}
              max={50}
              value={k}
              onChange={(e) => setK(Number(e.target.value))}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-900">LLM rerank</label>
            <button
              type="button"
              onClick={() => setUseLlm((v) => !v)}
              className={`mt-2 flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                useLlm
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              <span>{useLlm ? "On" : "Off"}</span>
              <span className={`h-5 w-10 rounded-full ${useLlm ? "bg-white/25" : "bg-slate-200"}`}>
                <span
                  className={`block h-5 w-5 rounded-full bg-white transition-transform ${
                    useLlm ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
        
        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-500">
            {lastRequestId ? (
              <span className="block truncate">
                Request ID: <span className="font-mono">{lastRequestId}</span>
              </span>
            ) : (
              <span className="block">Tip: Open the API docs at /docs</span>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full sm:w-auto rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm disabled:opacity-60"
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </div>
        
        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </form>
      
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Results</h2>
          <span className="text-xs text-slate-500">{results.length} items</span>
        </div>
        
        {results.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 text-center text-sm text-slate-600">
            No results yet. Try a query like “wedding guest outfit” or “warm jacket for winter travel”.
          </div>
        ) : (
          <div className="grid gap-4">
            {results.map((item) => (
              <ResultCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
      
      <footer className="pt-4 sm:pt-6 text-xs text-slate-500">
        Built for the Forward Deployed Engineer take-home: semantic recommendation microservice.
      </footer>
    </div>
  );
}