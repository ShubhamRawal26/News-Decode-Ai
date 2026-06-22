"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import type { NewsArticle } from "@/lib/news";
import { NewsGrid } from "./news-grid";
import { useAppStore } from "@/store/use-app-store";

export function SearchView({ q }: { q: string }) {
  const [results, setResults] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const go = useAppStore((s) => s.go);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/news/search?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((d) => !cancelled && setResults(d.results || []))
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [q]);

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Search size={15} />
            <span>Search results for</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">&ldquo;{q}&rdquo;</h1>
            <button
              onClick={() => go({ name: "home" })}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={14} /> clear
            </button>
          </div>
          {!loading && (
            <p className="text-sm text-muted-foreground mt-2">{results.length} {results.length === 1 ? "story" : "stories"} found</p>
          )}
        </motion.div>

        {!loading && results.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">No stories matched your search.</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Try different keywords or browse categories.</p>
          </div>
        ) : (
          <NewsGrid articles={results} loading={loading} />
        )}
      </div>
    </div>
  );
}
