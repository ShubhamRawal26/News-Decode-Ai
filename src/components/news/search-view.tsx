import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import type { NewsArticle } from "@/lib/news";
import { searchArticles } from "@/lib/data";
import { NewsGrid } from "./news-grid";
import { useAppStore } from "@/store/use-app-store";

export function SearchView({ q }: { q: string }) {
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const go = useAppStore((s) => s.go);

  useEffect(() => {
    let cancelled = false;
    searchArticles(q, 30)
      .then((data) => {
        if (!cancelled) setResults(data || []);
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [q]);

  return (
    <div className="pt-6 sm:pt-10 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="yupp-card-white p-6 sm:p-8"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            <Search size={14} className="text-[#E04E15]" />
            <span>Search Results For</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              &ldquo;{q}&rdquo;
            </h1>
            <button
              onClick={() => go({ name: "home" })}
              className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1 rounded-full bg-secondary"
            >
              <X size={12} /> Clear
            </button>
          </div>
          {!loading && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 font-medium">
              {results.length} {results.length === 1 ? "story" : "stories"} indexed and decoded
            </p>
          )}
        </motion.div>

        {!loading && results.length === 0 ? (
          <div className="yupp-card-white p-12 text-center">
            <p className="text-sm font-semibold text-foreground">
              No decoded stories matched your search query.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Try querying general keywords like &ldquo;semiconductors&rdquo;, &ldquo;markets&rdquo;,
              or &ldquo;policy&rdquo;.
            </p>
          </div>
        ) : (
          <NewsGrid articles={results} loading={loading} />
        )}
      </div>
    </div>
  );
}
