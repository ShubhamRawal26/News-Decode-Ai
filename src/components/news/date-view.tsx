import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, ArrowLeft, Clock, Sparkles } from "lucide-react";
import type { NewsArticle } from "@/lib/news";
import { formatEditionDate, editionDayOfWeek, todayEditionDate } from "@/lib/dates";
import { getFirebaseArticlesByDate } from "@/lib/firebase/news-data";
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

export function DateView({
  date,
  onAuthRequired,
}: {
  date: string;
  onAuthRequired?: () => void;
}) {
  const { go } = useAppStore();
  const [data, setData] = useState<DateData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getFirebaseArticlesByDate(date)
      .then((articles) => {
        if (cancelled) return;
        const list = articles || [];
        setData({
          date,
          articles: list,
          breaking: list.filter((a) => a.isBreaking || a.impactScore >= 80).slice(0, 4),
          count: list.length,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setData({ date, articles: [], breaking: [], count: 0 });
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
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
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E04E15] text-white shadow-xl shadow-orange-950/30 shrink-0">
                <CalendarIcon size={32} />
              </span>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBE2D5] text-xs font-bold mb-2">
                  <Clock size={12} />
                  <span>{isToday ? "Current Edition" : "Historical Archive Edition"}</span>
                </div>
                <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  {label}
                </h1>
                <p className="text-[#D4BEC3] mt-2 text-sm sm:text-base">
                  {dow} Edition • {data?.count ?? 0} Decoded Stories Published
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Breaking */}
        {data && data.breaking.length > 0 && (
          <div className="mb-6">
            <BreakingTicker items={data.breaking} />
          </div>
        )}

        {/* Articles */}
        <div className="space-y-4 pt-4">
          <SectionHeader
            title={`${label} Wire`}
            subtitle="Ranked by AI Impact Score at time of publication"
            icon={<Sparkles size={18} className="text-[#E04E15]" />}
          />
          <NewsGrid
            articles={loading ? [] : data?.articles || []}
            loading={loading}
            onAuthRequired={onAuthRequired}
          />
        </div>

        {!loading && (!data || data.articles.length === 0) && (
          <div className="yupp-card-white p-12 text-center">
            <p className="text-muted-foreground">
              No stories published in the archive for this date.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
