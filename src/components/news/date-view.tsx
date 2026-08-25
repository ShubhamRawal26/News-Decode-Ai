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
    <div className="pt-24 sm:pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Back */}
        <button
          onClick={() => go({ name: "home" })}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-5"
        >
          <ArrowLeft size={15} /> Back to today
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-10 mb-8"
        >
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <span className="inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6366f1,#a855f7)] text-white shadow-xl">
              <CalendarIcon size={26} />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-display text-3xl sm:text-5xl font-normal tracking-tight">{label}</h1>
                {isToday && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-600 text-[11px] font-semibold px-2 py-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Today&apos;s edition
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">
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
          <div className="glass rounded-2xl p-12 text-center">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 text-muted-foreground mb-3">
              <Sparkles size={26} />
            </span>
            <h3 className="font-medium text-lg">No edition for this date</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
              {date >= today
                ? "This date hasn't happened yet, or today's edition is still being prepared."
                : "Our AI didn't capture an edition for this date. The archive begins June 20, 2025."}
            </p>
            <button
              onClick={() => go({ name: "home" })}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(110deg,#6366f1,#8b5cf6,#a855f7)] text-white px-4 py-2 text-sm font-medium shadow-lg shadow-violet-500/25"
            >
              <Clock size={14} /> View today&apos;s edition
            </button>
          </div>
        ) : (
          <>
            <SectionHeader
              title={isToday ? "Today&apos;s intelligence" : "Daily intelligence"}
              subtitle={`Ranked by AI impact score`}
              icon={<Sparkles size={18} className="text-violet-600" />}
            />
            <NewsGrid articles={loading ? [] : (data?.articles || [])} loading={loading} />
          </>
        )}
      </div>
    </div>
  );
}
