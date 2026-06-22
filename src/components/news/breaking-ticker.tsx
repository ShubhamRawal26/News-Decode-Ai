"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { NewsArticle } from "@/lib/news";
import { ImpactBadge } from "./impact-badge";
import { useAppStore } from "@/store/use-app-store";

export function BreakingTicker({ items }: { items: NewsArticle[] }) {
  const go = useAppStore((s) => s.go);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  if (items.length === 0) return null;
  const current = items[idx];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-2xl overflow-hidden border-rose-500/20"
      >
        <div className="flex items-stretch">
          {/* label */}
          <div className="hidden sm:flex items-center gap-2 px-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white">
            <Zap size={16} className="fill-current" />
            <span className="text-xs font-bold uppercase tracking-wider">Breaking</span>
          </div>
          {/* content */}
          <button
            onClick={() => go({ name: "article", id: current.id })}
            className="flex-1 flex items-center gap-3 px-4 py-3 text-left hover:bg-foreground/[0.02] transition-colors min-w-0"
          >
            <span className="sm:hidden inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white">
              <Zap size={12} className="fill-current" />
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.3 }}
                className="flex-1 min-w-0 flex items-center gap-3"
              >
                <ImpactBadge score={current.impactScore} size="sm" showLabel={false} className="shrink-0" />
                <span className="font-medium text-sm truncate">{current.title}</span>
                <span className="hidden md:inline text-xs text-muted-foreground truncate flex-1">{current.summary}</span>
              </motion.div>
            </AnimatePresence>
            <ArrowRight size={15} className="text-muted-foreground shrink-0" />
          </button>
        </div>
        {/* dots */}
        {items.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 pb-2">
            {items.slice(0, 6).map((it, i) => (
              <button
                key={it.id}
                onClick={() => setIdx(i)}
                aria-label={`Breaking story ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-rose-500" : "w-1.5 bg-foreground/15"}`}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
