"use client";

import { motion } from "framer-motion";
import { Bookmark, Share2, Clock, ExternalLink, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { NewsArticle } from "@/lib/news";
import { CATEGORY_LABELS } from "@/lib/news";
import { ImpactBadge } from "./impact-badge";
import { useAppStore, useUserActions } from "@/store/use-app-store";
import { useAuth } from "@/components/auth/auth-provider";
import { toast } from "sonner";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "featured" | "compact";
  index?: number;
  onAuthRequired?: () => void;
}

export function NewsCard({ article, variant = "default", index = 0, onAuthRequired }: NewsCardProps) {
  const { go, savedIds } = useAppStore();
  const { save } = useUserActions();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const saved = savedIds.has(article.id);

  const open = () => go({ name: "article", id: article.id });

  const toggleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const share = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/?a=${article.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: article.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied");
      }
    } catch {
      /* dismissed */
    }
  };

  const catLabel = CATEGORY_LABELS[article.category] || article.category;

  if (variant === "compact") {
    return (
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4, delay: index * 0.04 }}
        onClick={open}
        className="group glass card-glow w-full rounded-2xl p-4 text-left flex gap-3 items-start hover:shadow-lg transition-shadow"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{catLabel}</span>
            <ImpactBadge score={article.impactScore} size="sm" showLabel={false} />
          </div>
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-gradient transition-all">
            {article.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{article.summary}</p>
        </div>
        <ArrowUpRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
      </motion.button>
    );
  }

  if (variant === "featured") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        onClick={open}
        className="group glass-strong card-glow relative overflow-hidden rounded-3xl p-6 sm:p-8 cursor-pointer hover:shadow-2xl transition-all duration-500"
      >
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-[11px] font-semibold px-2.5 py-1">
              <Sparkle /> Featured
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{catLabel}</span>
            {article.isBreaking && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 text-rose-600 text-[11px] font-semibold px-2 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 breaking-pulse" /> Breaking
              </span>
            )}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-tight leading-tight mb-3 group-hover:text-gradient transition-all">
            {article.title}
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed mb-5 line-clamp-3">
            {article.summary}
          </p>

          {/* AI analysis preview */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <AnalysisPill label="Why it matters" text={article.whyItMatters} />
            <AnalysisPill label="What's next" text={article.whatHappensNext} />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <ImpactBadge score={article.impactScore} size="lg" />
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Clock size={12} /> {article.readTime} min</span>
                <span className="inline-flex items-center gap-1 truncate max-w-[140px]">{article.sourceName}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <IconBtn onClick={toggleSave} active={saved} disabled={saving} label="Save">
                <Bookmark size={15} className={cn(saved && "fill-current")} />
              </IconBtn>
              <IconBtn onClick={share} label="Share">
                <Share2 size={15} />
              </IconBtn>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  // default
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      onClick={open}
      className="group glass card-glow relative overflow-hidden rounded-2xl p-5 cursor-pointer hover:shadow-xl transition-all duration-500 flex flex-col"
    >
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500/15 to-sky-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative flex flex-col flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{catLabel}</span>
          {article.isBreaking && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 text-rose-600 text-[10px] font-semibold px-2 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 breaking-pulse" /> Breaking
            </span>
          )}
          <ImpactBadge score={article.impactScore} size="sm" />
        </div>

        <h3 className="font-semibold text-[17px] leading-snug mb-2 line-clamp-3 group-hover:text-gradient transition-all">
          {article.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4 flex-1">
          {article.summary}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground min-w-0">
            <span className="truncate max-w-[110px] font-medium">{article.sourceName}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-0.5 shrink-0"><Clock size={11} />{article.readTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <IconBtn onClick={toggleSave} active={saved} disabled={saving} label="Save" small>
              <Bookmark size={14} className={cn(saved && "fill-current")} />
            </IconBtn>
            <IconBtn onClick={share} label="Share" small>
              <Share2 size={14} />
            </IconBtn>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function AnalysisPill({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl bg-foreground/[0.03] border border-foreground/5 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-violet-600 mb-1">{label}</div>
      <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed">{text}</p>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  active,
  disabled,
  label,
  small,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  small?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all",
        small ? "h-7 w-7" : "h-8 w-8",
        active
          ? "bg-violet-500/15 text-violet-600"
          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground",
        disabled && "opacity-50",
      )}
    >
      {children}
    </button>
  );
}

function Sparkle() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l2.4 7.2L22 9.6l-7.6 2.4L12 19l-2.4-7L2 9.6l7.6-2.4z" />
    </svg>
  );
}
