export type RecommendRequest = {
  query: string;
  k: number;
  use_llm: boolean;
};

export type RecommendItem = {
  id: string;
  title?: string | null;
  price?: number | null;
  average_rating?: number | null;
  rating_number?: number | null;
  store?: string | null;
  main_category?: string | null;
  image_url?: string | null;
  distance?: number | null;
  preview?: string | null;
  reason?: string | null;
};

export type RecommendResponse = {
  results: RecommendItem[];
};

export function getApiBase() {
  return (
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ??
    "http://127.0.0.1:8000"
  );
}

function requestId() {
  try {
    return `ui-${crypto.randomUUID()}`;
  } catch {
    return `ui-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }
}

export async function fetchRecommendations(
  payload: RecommendRequest
): Promise<RecommendResponse> {
  const base = getApiBase();
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 15_000);
  
  try {
    const res = await fetch(`${base}/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Request-ID": requestId(),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`API ${res.status}: ${text}`);
    }
    
    return (await res.json()) as RecommendResponse;
  } finally {
    clearTimeout(t);
  }
}