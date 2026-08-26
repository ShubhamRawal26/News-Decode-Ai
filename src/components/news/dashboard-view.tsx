"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Bookmark, Flame, History as HistoryIcon, ArrowRight,
  TrendingUp, LayoutDashboard, Plus, Check, LogIn,
} from "lucide-react";
import { TRENDING_TOPICS, type NewsArticle } from "@/lib/news";
import { getDailyBrief } from "@/lib/data";
import { getFirebaseArticles } from "@/lib/firebase/news-data";
import { SectionHeader } from "./section-header";
import { NewsCard } from "./news-card";
import { useAppStore, useUserActions } from "@/store/use-app-store";
import { useAuth } from "@/components/auth/auth-provider";
import { cn } from "@/lib/utils";

interface GenericData {
  dailyBrief: { headline: string; summary: string; topStories: NewsArticle[] };
  trendingTopics: { topic: string; count: number }[];
  latest: NewsArticle[];
}

export function DashboardView({ onAuthRequired }: { onAuthRequired?: () => void }) {
  const { user, loading: authLoading } = useAuth();
  const { savedIds, followedTopics, historyIds } = useAppStore();
  const [generic, setGeneric] = useState<GenericData | null>(null);
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>([]);
  const [historyArticles, setHistoryArticles] = useState<NewsArticle[]>([]);
  const [recommendations, setRecommendations] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // load generic dashboard data
  useEffect(() => {
    let cancelled = false;
    Promise.all([getDailyBrief(), getFirebaseArticles()])
      .then(([brief, allArticles]) => {
        if (cancelled) return;
        const all = allArticles || [];
        setGeneric({
          dailyBrief: brief,
          trendingTopics: TRENDING_TOPICS.slice(0, 8).map((t, idx) => ({ topic: t, count: 14 - idx })),
          latest: all.slice(0, 6),
        });
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // load saved articles by ids
  useEffect(() => {
    const ids = new Set(savedIds);
    let cancelled = false;
    getFirebaseArticles().then((all) => {
      if (!cancelled) {
        setSavedArticles((all || []).filter((a) => ids.has(a.id)));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [savedIds]);

  // load history articles by ids
  useEffect(() => {
    const ids = new Set(historyIds);
    let cancelled = false;
    getFirebaseArticles().then((all) => {
      if (!cancelled) {
        setHistoryArticles((all || []).filter((a) => ids.has(a.id)));
      }
    });
    return () => {
      cancelled = true;
    };
  }, [historyIds]);

  // load recommendations
  useEffect(() => {
    let cancelled = false;
    getFirebaseArticles().then((all) => {
      if (cancelled) return;
      const readSet = new Set(historyIds);
      const matched = (all || []).filter(
        (a) =>
          !readSet.has(a.id) &&
          a.tags.some((t) => followedTopics.has(t.toLowerCase())),
      );
      setRecommendations(matched.length > 0 ? matched.slice(0, 6) : (all || []).slice(0, 4));
    });
    return () => {
      cancelled = true;
    };
  }, [followedTopics, historyIds]);

  if (loading || !generic) {
    return (
      <div className="pt-8 sm:pt-12 pb-20 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2"><div className="h-64 rounded-[2.5rem] bg-card border border-border shimmer" /></div>
          <div className="h-64 rounded-[2.5rem] bg-card border border-border shimmer" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6 sm:pt-10 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-[2.5rem] yupp-card-white shadow-sm"
        >
          <div className="flex items-center gap-4">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E04E15] text-white shadow-lg shadow-orange-950/20">
              <LayoutDashboard size={26} />
            </span>
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                Intelligence Library
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1 font-medium">
                {user ? `Signed in as ${user.displayName || user.email}` : "Personalized intelligence feed, bookmarks & reading telemetry"}
              </p>
            </div>
          </div>

          {!user && (
            <button
              onClick={onAuthRequired}
              className="btn-yupp-primary text-xs py-2 px-5 self-start sm:self-auto shadow-sm"
            >
              <LogIn size={13} />
              <span>Sign In to Sync</span>
            </button>
          )}
        </motion.div>

        {/* Daily brief + Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DailyBrief headline={generic.dailyBrief.headline} summary={generic.dailyBrief.summary} top={generic.dailyBrief.topStories} />
          <TrendingPanel topics={generic.trendingTopics} onAuthRequired={onAuthRequired} />
        </div>

        {/* Recommendations */}
        <section className="space-y-6">
          <SectionHeader
            icon={<Sparkles size={18} className="text-[#E04E15]" />}
            title="AI Recommendations"
            subtitle={user ? "Stories selected specifically for you based on your activity" : "Sign in to get personalized recommendations tailored to your lenses"}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(recommendations.length ? recommendations : generic.latest).map((a, i) => (
              <NewsCard key={a.id} article={a} index={i} onAuthRequired={onAuthRequired} />
            ))}
          </div>
        </section>

        {/* Two columns: Saved + History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="yupp-card-white p-6 sm:p-8 space-y-5">
            <SectionHeader
              icon={<Bookmark size={18} className="text-[#E04E15]" />}
              title="Saved Stories"
              subtitle="Your personal intelligence bookmarks"
            />
            {!user ? (
              <SignInPrompt icon={<Bookmark size={28} />} onAuthRequired={onAuthRequired} />
            ) : savedArticles.length === 0 ? (
              <EmptyState icon={<Bookmark size={28} />} title="No saved stories yet" desc="Tap the bookmark button on any decoded story to save it to your library." />
            ) : (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 no-scrollbar">
                {savedArticles.map((a, i) => (
                  <NewsCard key={a.id} article={a} index={i} variant="compact" onAuthRequired={onAuthRequired} />
                ))}
              </div>
            )}
          </div>

          <div className="yupp-card-white p-6 sm:p-8 space-y-5">
            <SectionHeader
              icon={<HistoryIcon size={18} className="text-[#E04E15]" />}
              title="Reading History"
              subtitle="Recently decoded briefings you opened"
            />
            {!user ? (
              <SignInPrompt icon={<HistoryIcon size={28} />} onAuthRequired={onAuthRequired} />
            ) : historyArticles.length === 0 ? (
              <EmptyState icon={<HistoryIcon size={28} />} title="No history yet" desc="Stories you read will automatically appear here." />
            ) : (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 no-scrollbar">
                {historyArticles.map((a, i) => (
                  <NewsCard key={a.id} article={a} index={i} variant="compact" onAuthRequired={onAuthRequired} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DailyBrief({ headline, summary, top }: { headline: string; summary: string; top: NewsArticle[] }) {
  const go = useAppStore((s) => s.go);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-2 yupp-card-dark relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between shadow-xl"
    >
      <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#E04E15]/20 blur-3xl pointer-events-none" />
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 text-[#FBE2D5] text-[11px] font-bold px-3 py-1 backdrop-blur-md">
            <Sparkles size={11} className="text-[#E04E15]" /> AI Daily Brief
          </span>
          <span className="text-[11px] text-[#D4BEC3]">Synthesized from today&apos;s highest impact stories</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {headline}
        </h2>
        <p className="text-xs sm:text-sm text-[#D4BEC3] leading-relaxed max-w-2xl">
          {summary}
        </p>
      </div>

      {top.length > 0 && (
        <div className="relative z-10 pt-6 mt-4 border-t border-white/10 flex items-center gap-2 flex-wrap">
          {top.slice(0, 3).map((a) => (
            <button
              key={a.id}
              onClick={() => go({ name: "article", id: a.id })}
              className="group inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3.5 py-1.5 text-xs font-semibold text-white transition-all"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E04E15]" />
              <span className="max-w-[180px] sm:max-w-[220px] truncate">{a.title}</span>
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#FBE2D5]" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function TrendingPanel({ topics, onAuthRequired }: { topics: { topic: string; count: number }[]; onAuthRequired?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
      className="yupp-card-white p-6 sm:p-7 flex flex-col justify-between shadow-sm"
    >
      <div>
        <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-border">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#E04E15]/10 text-[#E04E15]">
            <Flame size={18} />
          </span>
          <div>
            <h3 className="font-heading font-bold text-sm text-foreground">Trending Topics</h3>
            <p className="text-[10px] text-muted-foreground">Follow to customize your feed</p>
          </div>
        </div>
        <div className="space-y-1.5 max-h-[260px] overflow-y-auto no-scrollbar">
          {topics.length === 0 && (
            <p className="text-xs text-muted-foreground py-4 text-center">No trending topics yet.</p>
          )}
          {topics.map((t) => (
            <FollowRow key={t.topic} topic={t.topic} count={t.count} onAuthRequired={onAuthRequired} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FollowRow({ topic, count, onAuthRequired }: { topic: string; count: number; onAuthRequired?: () => void }) {
  const { followedTopics } = useAppStore();
  const { follow } = useUserActions();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const followed = followedTopics.has(topic);

  const toggle = async () => {
    if (!user) {
      onAuthRequired?.();
      return;
    }
    setBusy(true);
    try {
      await follow(topic);
    } catch {
      /* revert via store sync */
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-2 rounded-2xl hover:bg-secondary/60 px-3 py-2 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <TrendingUp size={12} className="text-[#E04E15] shrink-0" />
        <span className="text-xs font-semibold truncate text-foreground">#{topic}</span>
        <span className="text-[10px] text-muted-foreground shrink-0 font-mono">({count})</span>
      </div>
      <button
        onClick={toggle}
        disabled={busy}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold transition-all shrink-0",
          followed ? "bg-[#E04E15]/15 text-[#E04E15]" : "bg-secondary hover:bg-secondary/80 text-foreground",
        )}
      >
        {followed ? <><Check size={11} /> Following</> : <><Plus size={11} /> Follow</>}
      </button>
    </div>
  );
}

function EmptyState({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-3xl bg-secondary/30 border border-border/60 p-8 text-center flex flex-col items-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-muted-foreground mb-3">
        {icon}
      </span>
      <h4 className="font-heading font-bold text-sm text-foreground">{title}</h4>
      <p className="text-xs text-muted-foreground mt-1 max-w-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function SignInPrompt({ icon, onAuthRequired }: { icon: React.ReactNode; onAuthRequired?: () => void }) {
  return (
    <div className="rounded-3xl bg-secondary/30 border border-border/60 p-8 text-center flex flex-col items-center">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-[#E04E15] mb-3">
        {icon}
      </span>
      <h4 className="font-heading font-bold text-sm text-foreground">Sign In to Sync Your Data</h4>
      <p className="text-xs text-muted-foreground mt-1 max-w-xs mb-4 leading-relaxed">
        Your saved stories, followed topics, and reading history sync automatically across devices.
      </p>
      <button
        onClick={onAuthRequired}
        className="btn-yupp-primary text-xs py-2 px-5 shadow-sm"
      >
        <LogIn size={13} />
        <span>Sign In with Google</span>
      </button>
    </div>
  );
}
