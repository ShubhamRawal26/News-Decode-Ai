"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowLeft, Bookmark, Share2, Clock, ExternalLink, Zap,
  AlertCircle, Users, ArrowRight, TrendingUp, Sparkles, Tag, Check, Plus,
} from "lucide-react";
import type { NewsArticle } from "@/lib/news";
import { CATEGORY_LABELS } from "@/lib/news";
import { DEMO_ARTICLES } from "@/lib/demo-data";
import { ImpactRing } from "./impact-badge";
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
          markRead(d.article.id);
        } else {
          const fallback = DEMO_ARTICLES.find((a) => a.id === articleId || a.slug === articleId) || DEMO_ARTICLES[0];
          setArticle(fallback);
          setRelated(DEMO_ARTICLES.filter((a) => a.id !== fallback.id && a.category === fallback.category).slice(0, 3));
        }
      })
      .catch(() => {
        if (!cancelled) {
          const fallback = DEMO_ARTICLES.find((a) => a.id === articleId || a.slug === articleId) || DEMO_ARTICLES[0];
          setArticle(fallback);
          setRelated(DEMO_ARTICLES.filter((a) => a.id !== fallback.id && a.category === fallback.category).slice(0, 3));
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [articleId]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-12 pb-20">
        <div className="yupp-card-white p-8 sm:p-12 shimmer">
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
      <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 pb-20 text-center">
        <p className="text-muted-foreground">Story not found or expired.</p>
        <button onClick={() => go({ name: "home" })} className="mt-4 btn-yupp-primary text-xs">
          Back to Home
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
      toast.success(wasSaved ? "Removed from library" : "Saved to your library");
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
      else { await navigator.clipboard.writeText(url); toast.success("Link copied to clipboard"); }
    } catch {}
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-6 sm:pt-10 pb-20 space-y-6">
      {/* Back */}
      <button
        onClick={back}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary"
      >
        <ArrowLeft size={14} /> Back
      </button>

      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="yupp-card-white p-6 sm:p-10 shadow-lg relative overflow-hidden"
      >
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <button
            onClick={() => go({ name: "category", slug: article.category })}
            className="text-[11px] font-extrabold uppercase tracking-wider text-[#E04E15] bg-[#E04E15]/10 hover:bg-[#E04E15]/20 transition-colors px-3 py-1 rounded-full cursor-pointer"
          >
            {catLabel}
          </button>
          {article.subcategory && (
            <button
              onClick={() => go({ name: "search", q: article.subcategory || "" })}
              className="text-xs font-semibold text-muted-foreground bg-secondary hover:bg-secondary/80 hover:text-foreground transition-colors px-2.5 py-0.5 rounded-full cursor-pointer"
            >
              {article.subcategory}
            </button>
          )}
          {article.isBreaking && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[11px] font-bold px-2.5 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 breaking-pulse" /> Breaking
            </span>
          )}
        </div>

        <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-5 text-foreground">
          {article.title}
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 font-medium">
          {article.summary}
        </p>

        {/* Meta row */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-5 border-t border-border">
          <div className="flex items-center gap-4">
            <ImpactRing score={article.impactScore} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">AI Impact Score</div>
              <div className="text-sm font-bold text-foreground">
                {article.impactScore >= 85 ? "Critical Global Impact" : article.impactScore >= 70 ? "High Significance" : article.impactScore >= 50 ? "Moderate Shift" : "Developing Brief"}
              </div>
              {article.sentiment && (
                <div className="text-xs text-muted-foreground capitalize">{article.sentiment} sentiment</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 font-medium"><Clock size={13} /> {article.readTime} min read</span>
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#E04E15] hover:underline max-w-[160px] truncate"
            >
              {article.sourceName} <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-border/60">
          <button
            onClick={toggleSave}
            disabled={saving}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all",
              saved ? "bg-[#E04E15] text-white" : "bg-secondary hover:bg-secondary/80 text-foreground",
            )}
          >
            <Bookmark size={14} className={cn(saved && "fill-current")} />
            {saved ? "Saved to Library" : "Bookmark Story"}
          </button>
          <button
            onClick={share}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
          >
            <Share2 size={14} /> Share Intelligence
          </button>
        </div>
      </motion.div>

      {/* AI analysis tabs */}
      <div className="bg-card border border-border rounded-full p-1.5 inline-flex gap-1 shadow-sm">
        <TabBtn active={activeTab === "analysis"} onClick={() => setActiveTab("analysis")}>
          <Sparkles size={14} /> 4-Point Synthesis
        </TabBtn>
        <TabBtn active={activeTab === "context"} onClick={() => setActiveTab("context")}>
          <Tag size={14} /> Context & Sources
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
              icon={<AlertCircle size={18} className="text-sky-600 dark:text-sky-400" />}
              label="What Happened"
              accent="sky"
              text={article.whatHappened}
            />
            <AnalysisBlock
              icon={<Zap size={18} className="text-[#E04E15]" />}
              label="Why It Matters"
              accent="orange"
              text={article.whyItMatters}
            />
            <AnalysisBlock
              icon={<Users size={18} className="text-emerald-600 dark:text-emerald-400" />}
              label="Who Is Affected"
              accent="emerald"
              text={article.whoIsAffected}
            />
            <AnalysisBlock
              icon={<ArrowRight size={18} className="text-amber-600 dark:text-amber-400" />}
              label="What Happens Next"
              accent="amber"
              text={article.whatHappensNext}
            />
            {article.futureImpact && (
              <AnalysisBlock
                icon={<TrendingUp size={18} className="text-rose-600 dark:text-rose-400" />}
                label="Actionable Foresight"
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
            className="yupp-card-white p-6 sm:p-8 space-y-6"
          >
            {article.tags.length > 0 && (
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Topic Keywords</div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((t) => (
                    <div key={t} className="inline-flex items-center rounded-full bg-secondary/80 border border-border/60 overflow-hidden">
                      <button
                        onClick={() => go({ name: "search", q: t })}
                        className="px-3 py-1 text-xs font-bold text-foreground hover:text-[#E04E15] transition-colors"
                      >
                        #{t}
                      </button>
                      <div className="pr-1.5 py-0.5">
                        <FollowTag tag={t} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {article.keyEntities && article.keyEntities.length > 0 && (
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Key Entities Monitored</div>
                <div className="flex flex-wrap gap-2">
                  {article.keyEntities.map((e) => (
                    <button
                      key={e}
                      onClick={() => go({ name: "search", q: e })}
                      className="rounded-full bg-secondary hover:bg-[#E04E15]/10 hover:text-[#E04E15] border border-border/60 px-3 py-1 text-xs font-semibold text-foreground transition-all cursor-pointer"
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">Original Reporting Context</div>
              <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed bg-secondary/30 p-4 rounded-2xl border border-border">{article.content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-12 space-y-4">
          <h3 className="font-heading font-extrabold text-xl tracking-tight text-foreground">Related Intelligence Briefs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {related.map((r, i) => (
              <NewsCard key={r.id} article={r} index={i} onAuthRequired={onAuthRequired} />
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
        "relative inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all",
        active ? "bg-[#E04E15] text-white shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60",
      )}
    >
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
  accent: "sky" | "orange" | "emerald" | "amber" | "rose";
  highlight?: boolean;
}) {
  const accentBg = {
    sky: "bg-sky-500/10",
    orange: "bg-[#E04E15]/10",
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
        "yupp-card-white p-5 sm:p-6 flex gap-4 items-start shadow-sm",
        highlight && "ring-2 ring-rose-500/40",
      )}
    >
      <span className={cn("inline-flex h-10 w-10 items-center justify-center rounded-2xl shrink-0", accentBg)}>
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#E04E15] mb-1">{label}</div>
        <p className="text-xs sm:text-sm leading-relaxed text-foreground">{text}</p>
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
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all",
        followed ? "bg-[#E04E15]/15 text-[#E04E15]" : "bg-secondary hover:bg-secondary/80 text-foreground",
      )}
    >
      <span>#{tag}</span>
      {followed ? (
        <Check size={11} className="shrink-0" />
      ) : (
        <Plus size={11} className="shrink-0 opacity-60" />
      )}
    </button>
  );
}
