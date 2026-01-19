# Semantic E-Commerce UI (Next.js + Tailwind)

Minimal UI for your FastAPI **Semantic Recommendation Microservice**.

## Prereqs
- Node.js 18+
- FastAPI service running on `http://localhost:8000`

## Setup
```bash
cp .env.example .env.local
npm install
npm run dev

# build
npm run build
```

Open `http://localhost:3000`.

## Configuration
- `NEXT_PUBLIC_API_BASE` (default: `http://localhost:8000`)

## Notes
- The UI sends an `X-Request-ID` header for tracing.
- Toggle **LLM rerank** to call your `use_llm=true` path.
