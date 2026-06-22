"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe2, Briefcase, Cpu, Landmark, TrendingUp, RefreshCw } from "lucide-react";
import { CATEGORIES, CATEGORY_LABELS, type NewsArticle } from "@/lib/news";
import { NewsGrid } from "./news-grid";
import { SectionHeader } from "./section-header";
import { BreakingTicker } from "./breaking-ticker";
import { NewsCard } from "./news-card";
import { useAppStore } from "@/store/use-app-store";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe2, Briefcase, Cpu, Landmark, TrendingUp,
};

export function CategoryView({ slug }: { slug: string }) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [breaking, setBreaking] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const Icon = ICONS[cat?.icon || "Globe2"] || Globe2;

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(`/api/news/category?slug=${slug}`).then((r) => r.json()),
      fetch("/api/news/breaking").then((r) => r.json()),
    ])
      .then(([catData, brkData]) => {
        if (cancelled) return;
        setArticles(catData.articles || []);
        setBreaking((brkData.breaking || []).filter((b: NewsArticle) => b.category === slug).slice(0, 3));
      })
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [slug]);

  const featured = articles.find((a) => a.isFeatured) || articles[0];
  const rest = featured ? articles.filter((a) => a.id !== featured.id) : articles;

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-10 mb-8"
        >
          <div className={`absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br ${cat?.gradient} opacity-20 blur-3xl`} />
          <div className="relative flex items-center gap-4">
            <span className={`inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${cat?.gradient} text-white shadow-xl`}>
              <Icon size={28} />
            </span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{cat?.label}</h1>
              <p className="text-muted-foreground mt-1 text-sm sm:text-base">{cat?.description}</p>
            </div>
          </div>
        </motion.div>

        {breaking.length > 0 && (
          <div className="mb-8">
            <BreakingTicker items={breaking} />
          </div>
        )}

        {featured && !loading && (
          <div className="mb-8">
            <SectionHeader title="Top story" subtitle="The most impactful development right now" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              <FeaturedLarge article={featured} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {rest.slice(0, 4).map((a, i) => (
                  <NewsCardMini key={a.id} article={a} index={i} />
                ))}
              </div>
            </div>
          </div>
        )}

        <SectionHeader title={`All ${cat?.label.toLowerCase()} stories`} subtitle={`${articles.length} stories decoded by AI`} />
        <NewsGrid articles={loading ? [] : rest} loading={loading} />

        {!loading && rest.length === 0 && (
          <div className="glass rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">No stories in this category yet. Our AI is still scanning.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedLarge({ article }: { article: NewsArticle }) {
  const go = useAppStore((s) => s.go);
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => go({ name: "article", id: article.id })}
      className="group glass-strong card-glow relative overflow-hidden rounded-3xl p-6 sm:p-8 text-left hover:shadow-2xl transition-all duration-500"
    >
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{article.subcategory || CATEGORY_LABELS[article.category]}</span>
          {article.isBreaking && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 text-rose-600 text-[11px] font-semibold px-2 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 breaking-pulse" /> Breaking
            </span>
          )}
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-tight mb-3 group-hover:text-gradient transition-all">{article.title}</h2>
        <p className="text-muted-foreground leading-relaxed mb-5 line-clamp-3">{article.summary}</p>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-semibold text-violet-600">Impact {article.impactScore}</span>
          <span>·</span>
          <span>{article.sourceName}</span>
        </div>
      </div>
    </motion.button>
  );
}

function NewsCardMini({ article, index }: { article: NewsArticle; index: number }) {
  return <NewsCard article={article} index={index} />;
}
