import "./globals.css";

export const metadata = {
  title: "Semantic Fashion Recommender",
  description: "Semantic search + optional LLM rerank demo UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>
        </div>
      </body>
    </html>
  );
}
