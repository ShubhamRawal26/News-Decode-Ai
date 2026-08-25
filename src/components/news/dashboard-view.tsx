"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Bookmark, Flame, History as HistoryIcon, ArrowRight,
  TrendingUp, LayoutDashboard, Plus, Check,
} from "lucide-react";
import type { NewsArticle } from "@/lib/news";
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
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => !cancelled && setGeneric(d))
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  // load saved articles by ids
  useEffect(() => {
    const ids = [...savedIds].slice(0, 24);
    let cancelled = false;
    if (ids.length === 0) {
      Promise.resolve().then(() => { if (!cancelled) setSavedArticles([]); });
    } else {
      fetch(`/api/news/byids?ids=${ids.join(",")}`)
        .then((r) => r.json())
        .then((d) => { if (!cancelled) setSavedArticles(d.articles || []); })
        .catch(() => {});
    }
    return () => { cancelled = true; };
  }, [[...savedIds].join(",")]);

  // load history articles by ids
  useEffect(() => {
    const ids = historyIds.slice(0, 12);
    let cancelled = false;
    if (ids.length === 0) {
      Promise.resolve().then(() => { if (!cancelled) setHistoryArticles([]); });
    } else {
      fetch(`/api/news/byids?ids=${ids.join(",")}`)
        .then((r) => r.json())
        .then((d) => { if (!cancelled) setHistoryArticles(d.articles || []); })
        .catch(() => {});
    }
    return () => { cancelled = true; };
  }, [historyIds.join(",")]);

  // load recommendations
  useEffect(() => {
    let cancelled = false;
    fetch("/api/news/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        followedTopics: [...followedTopics],
        readIds: historyIds,
      }),
    })
      .then((r) => r.json())
      .then((d) => !cancelled && setRecommendations(d.recommendations || []))
      .catch(() => {});
    return () => { cancelled = true; };
  }, [followedTopics, historyIds]);

  if (loading || !generic) {
    return (
      <div className="pt-24 sm:pt-28 pb-20 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2"><div className="glass rounded-3xl p-8 h-64 shimmer" /></div>
          <div className="glass rounded-3xl p-8 h-64 shimmer" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6366f1,#a855f7)] text-white shadow-lg shadow-violet-500/30">
            <LayoutDashboard size={22} />
          </span>
          <div className="flex-1">
            <h1 className="font-display text-3xl sm:text-5xl font-normal tracking-tight">Your dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {user ? `Signed in as ${user.displayName || user.email}` : "Personalized intelligence, updated continuously by AI"}
            </p>
          </div>
        </motion.div>

        {/* Daily brief + Trending */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          <DailyBrief headline={generic.dailyBrief.headline} summary={generic.dailyBrief.summary} top={generic.dailyBrief.topStories} />
          <TrendingPanel topics={generic.trendingTopics} onAuthRequired={onAuthRequired} />
        </div>

        {/* Recommendations */}
        <div className="mb-10">
          <SectionHeader
            icon={<Sparkles size={18} className="text-violet-600" />}
            title="AI recommendations"
            subtitle={user ? "Stories selected for you based on your activity" : "Sign in to get personalized recommendations"}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {(recommendations.length ? recommendations : generic.latest).map((a, i) => (
              <NewsCard key={a.id} article={a} index={i} onAuthRequired={onAuthRequired} />
            ))}
          </div>
        </div>

        {/* Two columns: Saved + History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <SectionHeader
              icon={<Bookmark size={18} className="text-violet-600" />}
              title="Saved stories"
              subtitle="Your personal library"
            />
            {!user ? (
              <SignInPrompt icon={<Bookmark size={28} />} onAuthRequired={onAuthRequired} />
            ) : savedArticles.length === 0 ? (
              <EmptyState icon={<Bookmark size={28} />} title="No saved stories yet" desc="Tap the bookmark on any story to save it here." />
            ) : (
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 no-scrollbar">
                {savedArticles.map((a, i) => (
                  <NewsCard key={a.id} article={a} index={i} variant="compact" onAuthRequired={onAuthRequired} />
                ))}
              </div>
            )}
          </div>
          <div>
            <SectionHeader
              icon={<HistoryIcon size={18} className="text-sky-600" />}
              title="Reading history"
              subtitle="Recently viewed intelligence"
            />
            {!user ? (
              <SignInPrompt icon={<HistoryIcon size={28} />} onAuthRequired={onAuthRequired} />
            ) : historyArticles.length === 0 ? (
              <EmptyState icon={<HistoryIcon size={28} />} title="No history yet" desc="Stories you open will appear here." />
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
      className="lg:col-span-2 glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[11px] font-semibold px-2.5 py-1">
            <Sparkles size={11} /> AI Daily Brief
          </span>
          <span className="text-[11px] text-muted-foreground">Synthesized from today's top stories</span>
        </div>
        <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-tight leading-tight mb-3">{headline}</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">{summary}</p>
        {top.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {top.slice(0, 3).map((a) => (
              <button
                key={a.id}
                onClick={() => go({ name: "article", id: a.id })}
                className="group inline-flex items-center gap-1.5 rounded-full bg-foreground/5 hover:bg-foreground/10 px-3 py-1.5 text-xs font-medium transition-colors"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                <span className="max-w-[180px] truncate">{a.title}</span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function TrendingPanel({ topics, onAuthRequired }: { topics: { topic: string; count: number }[]; onAuthRequired?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
      className="glass rounded-3xl p-6 sm:p-7"
    >
      <div className="flex items-center gap-2 mb-5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10">
          <Flame size={18} className="text-rose-600" />
        </span>
        <div>
          <h3 className="font-semibold tracking-tight">Trending topics</h3>
          <p className="text-[11px] text-muted-foreground">Follow to personalize</p>
        </div>
      </div>
      <div className="space-y-2 max-h-[280px] overflow-y-auto no-scrollbar">
        {topics.length === 0 && (
          <p className="text-sm text-muted-foreground">No trends yet.</p>
        )}
        {topics.map((t) => (
          <FollowRow key={t.topic} topic={t.topic} count={t.count} onAuthRequired={onAuthRequired} />
        ))}
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
    <div className="flex items-center justify-between gap-2 rounded-xl hover:bg-foreground/[0.03] px-2 py-1.5 transition-colors">
      <div className="flex items-center gap-2 min-w-0">
        <TrendingUp size={13} className="text-muted-foreground shrink-0" />
        <span className="text-sm font-medium truncate">#{topic}</span>
        <span className="text-[11px] text-muted-foreground shrink-0">{count}</span>
      </div>
      <button
        onClick={toggle}
        disabled={busy}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all shrink-0",
          followed ? "bg-violet-500/15 text-violet-600" : "bg-foreground/5 hover:bg-foreground/10",
        )}
      >
        {followed ? <><Check size={11} /> Following</> : <><Plus size={11} /> Follow</>}
      </button>
    </div>
  );
}

function EmptyState({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass rounded-2xl p-10 text-center flex flex-col items-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 text-muted-foreground mb-3">
        {icon}
      </span>
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-muted-foreground mt-1 max-w-xs">{desc}</p>
    </div>
  );
}

function SignInPrompt({ icon, onAuthRequired }: { icon: React.ReactNode; onAuthRequired?: () => void }) {
  return (
    <div className="glass rounded-2xl p-10 text-center flex flex-col items-center">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 text-muted-foreground mb-3">
        {icon}
      </span>
      <h4 className="font-medium">Sign in to sync your data</h4>
      <p className="text-sm text-muted-foreground mt-1 max-w-xs mb-4">
        Your saved stories, followed topics, and reading history sync across devices with Google sign-in.
      </p>
      <button
        onClick={onAuthRequired}
        className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(110deg,#6366f1,#8b5cf6,#a855f7)] text-white px-4 py-2 text-sm font-medium shadow-lg shadow-violet-500/25 bg-[length:200%_100%] hover:bg-[position:100%_0] transition-all"
      >
        Sign in
      </button>
    </div>
  );
}
