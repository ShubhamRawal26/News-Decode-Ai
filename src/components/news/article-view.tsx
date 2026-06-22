"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowLeft, Bookmark, Share2, Clock, ExternalLink, Zap,
  AlertCircle, Users, ArrowRight, TrendingUp, Sparkles, Tag,
} from "lucide-react";
import type { NewsArticle } from "@/lib/news";
import { CATEGORY_LABELS } from "@/lib/news";
import { ImpactRing, ImpactBadge } from "./impact-badge";
import { NewsCard } from "./news-card";
import { useAppStore, useUserActions } from "@/store/use-app-store";
import { useAuth } from "@/components/auth/auth-provider";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ArticleViewProps {
  articleId: string;
  onAuthRequired?: () => void;
}

export function ArticleView({ articleId, onAuthRequired }: ArticleViewProps) {
  const { go, back, savedIds } = useAppStore();
  const { save, markRead } = useUserActions();
  const { user } = useAuth();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [related, setRelated] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"analysis" | "context">("analysis");

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/news/${articleId}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.article) {
          setArticle(d.article);
          setRelated(d.related || []);
          // record reading to Firebase (no-op if not signed in)
          markRead(d.article.id);
        }
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [articleId, markRead]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-28 pb-20">
        <div className="glass rounded-3xl p-8 shimmer">
          <div className="h-4 w-24 bg-foreground/10 rounded mb-6" />
          <div className="h-8 w-3/4 bg-foreground/10 rounded mb-3" />
          <div className="h-8 w-1/2 bg-foreground/10 rounded mb-8" />
          <div className="h-4 w-full bg-foreground/10 rounded mb-2" />
          <div className="h-4 w-5/6 bg-foreground/10 rounded mb-2" />
          <div className="h-4 w-2/3 bg-foreground/10 rounded" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-32 pb-20 text-center">
        <p className="text-muted-foreground">Story not found.</p>
        <button onClick={() => go({ name: "home" })} className="mt-4 text-sm font-medium text-primary">
          Back to home
        </button>
      </div>
    );
  }

  const saved = savedIds.has(article.id);
  const catLabel = CATEGORY_LABELS[article.category] || article.category;

  const toggleSave = async () => {
    if (!user) {
      onAuthRequired?.();
      return;
    }
    setSaving(true);
    const wasSaved = saved;
    try {
      await save(article.id);
      toast.success(wasSaved ? "Removed" : "Saved to your library");
    } catch {
      toast.error("Could not save");
    } finally {
      setSaving(false);
    }
  };

  const share = async () => {
    const url = `${window.location.origin}/?a=${article.id}`;
    try {
      if (navigator.share) await navigator.share({ title: article.title, url });
      else { await navigator.clipboard.writeText(url); toast.success("Link copied"); }
    } catch {}
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-24 sm:pt-28 pb-20">
      {/* Back */}
      <button
        onClick={back}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={15} /> Back
      </button>

      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-strong card-glow relative overflow-hidden rounded-3xl p-6 sm:p-10 mb-6"
      >
        <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-violet-600">{catLabel}</span>
            {article.subcategory && (
              <>
                <span className="text-muted-foreground/40">·</span>
                <span className="text-[11px] font-medium text-muted-foreground">{article.subcategory}</span>
              </>
            )}
            {article.isBreaking && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 text-rose-600 text-[11px] font-semibold px-2 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 breaking-pulse" /> Breaking
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.25rem] font-normal tracking-tight leading-[1.08] mb-5">
            {article.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed mb-7">
            {article.summary}
          </p>

          {/* meta row */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-5 border-t border-foreground/5">
            <div className="flex items-center gap-4">
              <ImpactRing score={article.impactScore} />
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">AI Impact Score</div>
                <div className="text-sm font-medium mt-0.5">
                  {article.impactScore >= 85 ? "Critical significance" : article.impactScore >= 70 ? "High significance" : article.impactScore >= 50 ? "Moderate significance" : "Developing story"}
                </div>
                {article.sentiment && (
                  <div className="text-xs text-muted-foreground mt-0.5 capitalize">{article.sentiment} sentiment</div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Clock size={13} /> {article.readTime} min read</span>
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors max-w-[160px] truncate"
              >
                {article.sourceName} <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* actions */}
          <div className="flex items-center gap-2 mt-5">
            <button
              onClick={toggleSave}
              disabled={saving}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                saved ? "bg-violet-500/15 text-violet-600" : "bg-foreground/5 hover:bg-foreground/10",
              )}
            >
              <Bookmark size={15} className={cn(saved && "fill-current")} />
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={share}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium bg-foreground/5 hover:bg-foreground/10 transition-colors"
            >
              <Share2 size={15} /> Share
            </button>
          </div>
        </div>
      </motion.div>

      {/* AI analysis tabs */}
      <div className="glass rounded-2xl p-1.5 inline-flex gap-1 mb-4">
        <TabBtn active={activeTab === "analysis"} onClick={() => setActiveTab("analysis")}>
          <Sparkles size={14} /> AI Analysis
        </TabBtn>
        <TabBtn active={activeTab === "context"} onClick={() => setActiveTab("context")}>
          <Tag size={14} /> Context
        </TabBtn>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "analysis" ? (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <AnalysisBlock
              icon={<AlertCircle size={18} className="text-sky-600" />}
              label="What Happened"
              accent="sky"
              text={article.whatHappened}
            />
            <AnalysisBlock
              icon={<Zap size={18} className="text-violet-600" />}
              label="Why It Matters"
              accent="violet"
              text={article.whyItMatters}
            />
            <AnalysisBlock
              icon={<Users size={18} className="text-emerald-600" />}
              label="Who Is Affected"
              accent="emerald"
              text={article.whoIsAffected}
            />
            <AnalysisBlock
              icon={<ArrowRight size={18} className="text-amber-600" />}
              label="What Happens Next"
              accent="amber"
              text={article.whatHappensNext}
            />
            {article.futureImpact && (
              <AnalysisBlock
                icon={<TrendingUp size={18} className="text-rose-600" />}
                label="Future Impact Prediction"
                accent="rose"
                text={article.futureImpact}
                highlight
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="context"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            {article.tags.length > 0 && (
              <div className="mb-6">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-3">Topics</div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((t) => (
                    <FollowTag key={t} tag={t} />
                  ))}
                </div>
              </div>
            )}
            {article.keyEntities && article.keyEntities.length > 0 && (
              <div className="mb-6">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-3">Key Entities</div>
                <div className="flex flex-wrap gap-2">
                  {article.keyEntities.map((e) => (
                    <span key={e} className="rounded-full bg-foreground/5 px-3 py-1 text-xs font-medium">{e}</span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">Source excerpt</div>
              <p className="text-sm text-foreground/70 leading-relaxed">{article.content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold tracking-tight mb-5">Related intelligence</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r, i) => (
              <NewsCard key={r.id} article={r} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TabBtn({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-sm font-medium transition-colors",
        active ? "text-background" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {active && <motion.span layoutId="articleTab" className="absolute inset-0 rounded-xl bg-foreground" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
      <span className="relative z-10 inline-flex items-center gap-1.5">{children}</span>
    </button>
  );
}

function AnalysisBlock({
  icon, label, text, accent, highlight,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
  accent: "sky" | "violet" | "emerald" | "amber" | "rose";
  highlight?: boolean;
}) {
  const accentBg = {
    sky: "bg-sky-500/10",
    violet: "bg-violet-500/10",
    emerald: "bg-emerald-500/10",
    amber: "bg-amber-500/10",
    rose: "bg-rose-500/10",
  }[accent];
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn(
        "glass rounded-2xl p-5 sm:p-6 flex gap-4 items-start",
        highlight && "ring-1 ring-rose-500/20",
      )}
    >
      <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-xl shrink-0", accentBg)}>
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{label}</div>
        <p className="text-[15px] leading-relaxed text-foreground/90">{text}</p>
      </div>
    </motion.div>
  );
}

function FollowTag({ tag }: { tag: string }) {
  const { followedTopics } = useAppStore();
  const { follow } = useUserActions();
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const followed = followedTopics.has(tag);

  const toggle = async () => {
    if (!user) return;
    setBusy(true);
    try {
      await follow(tag);
    } catch {
      /* revert handled by store sync */
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all",
        followed ? "bg-violet-500/15 text-violet-600" : "bg-foreground/5 hover:bg-foreground/10",
      )}
    >
      <span>#{tag}</span>
      {followed ? <span className="text-[10px]">✓</span> : <span className="text-[10px] opacity-60">+</span>}
    </button>
  );
}
