"use client";

import { motion } from "framer-motion";
import { Bookmark, Share2, Clock, ArrowUpRight } from "lucide-react";
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
        toast.success("Link copied to clipboard");
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
        className="group w-full rounded-2xl p-4 text-left flex gap-3 items-start bg-card border border-border hover:border-[#E04E15]/30 hover:shadow-md transition-all"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{catLabel}</span>
            <ImpactBadge score={article.impactScore} size="sm" showLabel={false} />
          </div>
          <h3 className="font-heading font-bold text-sm leading-snug line-clamp-2 text-foreground group-hover:text-[#E04E15] transition-colors">
            {article.title}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">{article.summary}</p>
        </div>
        <ArrowUpRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-[#E04E15] transition-all shrink-0 mt-1" />
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
        className="group yupp-card-dark relative overflow-hidden p-6 sm:p-8 cursor-pointer hover:shadow-2xl transition-all duration-500 border border-white/10"
      >
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#E04E15]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E04E15] text-white text-[11px] font-bold px-3 py-1">
              <Sparkle /> Featured Brief
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4BEC3]">{catLabel}</span>
            {article.isBreaking && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/20 text-rose-300 text-[11px] font-bold px-2 py-0.5 border border-rose-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400 breaking-pulse" /> Breaking
              </span>
            )}
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3 group-hover:text-[#FBE2D5] transition-colors">
            {article.title}
          </h2>
          <p className="text-[#D4BEC3] text-[15px] leading-relaxed mb-5 line-clamp-3">
            {article.summary}
          </p>

          {/* AI analysis preview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <AnalysisPill label="Why it matters" text={article.whyItMatters} dark />
            <AnalysisPill label="What happens next" text={article.whatHappensNext} dark />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-white/10">
            <div className="flex items-center gap-3">
              <ImpactBadge score={article.impactScore} size="lg" />
              <div className="flex items-center gap-3 text-xs text-[#D4BEC3]">
                <span className="inline-flex items-center gap-1"><Clock size={12} /> {article.readTime} min</span>
                <span className="inline-flex items-center gap-1 truncate max-w-[140px]">{article.sourceName}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <IconBtn onClick={toggleSave} active={saved} disabled={saving} label="Save" dark>
                <Bookmark size={15} className={cn(saved && "fill-current")} />
              </IconBtn>
              <IconBtn onClick={share} label="Share" dark>
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
      className="group yupp-card-white relative overflow-hidden p-6 cursor-pointer hover:shadow-xl hover:border-[#E04E15]/30 transition-all duration-300 flex flex-col justify-between min-h-[260px]"
    >
      <div className="relative flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{catLabel}</span>
            {article.isBreaking && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-bold px-2 py-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 breaking-pulse" /> Breaking
              </span>
            )}
          </div>
          <ImpactBadge score={article.impactScore} size="sm" />
        </div>

        <h3 className="font-heading font-bold text-base sm:text-lg leading-snug mb-2 line-clamp-2 text-foreground group-hover:text-[#E04E15] transition-colors">
          {article.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3 flex-1">
          {article.summary}
        </p>

        {article.tags.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mb-3">
            {article.tags.slice(0, 3).map((t) => (
              <button
                key={t}
                onClick={(e) => {
                  e.stopPropagation();
                  go({ name: "search", q: t });
                }}
                className="px-2 py-0.5 rounded-md bg-secondary/80 hover:bg-[#E04E15]/10 hover:text-[#E04E15] text-[10px] font-semibold text-muted-foreground transition-colors cursor-pointer"
              >
                #{t}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 pt-3 border-t border-border/60">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground min-w-0">
            <span className="truncate max-w-[120px] font-semibold text-foreground/80">{article.sourceName}</span>
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

function AnalysisPill({ label, text, dark }: { label: string; text: string; dark?: boolean }) {
  return (
    <div className={cn(
      "rounded-2xl p-3 border",
      dark ? "bg-white/5 border-white/10 text-[#D4BEC3]" : "bg-secondary/40 border-border text-foreground/80"
    )}>
      <div className="text-[10px] font-bold uppercase tracking-wider text-[#E04E15] mb-1">{label}</div>
      <p className="text-xs line-clamp-2 leading-relaxed">{text}</p>
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
  dark,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  small?: boolean;
  dark?: boolean;
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
        dark
          ? active
            ? "bg-[#E04E15] text-white"
            : "text-[#D4BEC3] hover:bg-white/10 hover:text-white"
          : active
            ? "bg-[#E04E15]/15 text-[#E04E15]"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
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
