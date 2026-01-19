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
  return process.env.NEXT_PUBLIC_API_BASE?.replace(/\/$/, "") || "http://127.0.0.1:8000";
}

export async function fetchRecommendations(payload: RecommendRequest): Promise<RecommendResponse> {
  const base = getApiBase();
  const res = await fetch(`${base}/recommend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Request-ID": `ui-${crypto.randomUUID()}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${res.status}: ${text}`);
  }

  return (await res.json()) as RecommendResponse;
}
