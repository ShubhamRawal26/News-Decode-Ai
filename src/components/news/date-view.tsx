"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, ArrowLeft, Clock, Sparkles } from "lucide-react";
import type { NewsArticle } from "@/lib/news";
import { formatEditionDate, editionDayOfWeek, todayEditionDate } from "@/lib/dates";
import { NewsGrid } from "./news-grid";
import { BreakingTicker } from "./breaking-ticker";
import { SectionHeader } from "./section-header";
import { useAppStore } from "@/store/use-app-store";

interface DateData {
  date: string;
  articles: NewsArticle[];
  breaking: NewsArticle[];
  count: number;
}

export function DateView({ date, onAuthRequired }: { date: string; onAuthRequired?: () => void }) {
  const { go } = useAppStore();
  const [data, setData] = useState<DateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/news/bydate?date=${date}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setData(d);
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [date]);

  const today = todayEditionDate();
  const isToday = date === today;
  const label = formatEditionDate(date);
  const dow = editionDayOfWeek(date);

  return (
    <div className="pt-6 sm:pt-10 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-6">
        {/* Back */}
        <button
          onClick={() => go({ name: "home" })}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary"
        >
          <ArrowLeft size={14} /> Back to Today
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="yupp-card-dark relative overflow-hidden p-8 sm:p-12 shadow-xl border border-white/10"
        >
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#E04E15]/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E04E15] text-white shadow-xl shadow-orange-950/30 shrink-0">
              <CalendarIcon size={30} />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">{label}</h1>
                {isToday && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 border border-emerald-500/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Today&apos;s Edition
                  </span>
                )}
              </div>
              <p className="text-[#D4BEC3] text-sm sm:text-base">
                {dow} · {!loading && data ? `${data.count} ${data.count === 1 ? "story" : "stories"} decoded by AI` : "Loading…"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Breaking */}
        {!loading && data && data.breaking.length > 0 && (
          <div className="mb-8">
            <BreakingTicker items={data.breaking} />
          </div>
        )}

        {/* Articles */}
        {!loading && data && data.articles.length === 0 ? (
          <div className="yupp-card-white p-12 text-center flex flex-col items-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-muted-foreground mb-3">
              <Sparkles size={26} />
            </span>
            <h3 className="font-heading font-bold text-lg text-foreground">No Edition for this Date</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-sm mx-auto leading-relaxed">
              {date >= today
                ? "This date hasn't happened yet, or today's edition is still being prepared."
                : "Our AI didn't capture an edition for this date. The archive begins June 20, 2025."}
            </p>
          </div>
        ) : (
          <div className="space-y-4 pt-4">
            <SectionHeader title="Edition Stories" subtitle="Historical intelligence briefs archived for this date" />
            <NewsGrid articles={loading ? [] : data?.articles || []} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
}
