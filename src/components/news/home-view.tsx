"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Flame, Newspaper, ArrowRight, LayoutGrid } from "lucide-react";
import type { NewsArticle } from "@/lib/news";
import { CATEGORIES } from "@/lib/news";
import { HeroSection } from "./hero-section";
import { BreakingTicker } from "./breaking-ticker";
import { MacOSWidgets } from "./macos-widgets";
import { CategoryNav } from "./category-nav";
import { NewsCard } from "./news-card";
import { NewsGrid } from "./news-grid";
import { SectionHeader } from "./section-header";
import { useAppStore } from "@/store/use-app-store";

interface FeedData {
  latest: NewsArticle[];
  breaking: NewsArticle[];
  featured: NewsArticle[];
  trending: { topic: string; count: number }[];
}

export function HomeView({ onAuthRequired }: { onAuthRequired?: () => void }) {
  const go = useAppStore((s) => s.go);
  const [data, setData] = useState<FeedData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => !cancelled && setData(d))
      .catch(() => {})
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  const breaking = data?.breaking || [];
  const featured = data?.featured || [];
  const latest = data?.latest || [];
  const trending = data?.trending || [];
  const editionDate = data?.editionDate || "";

  // category counts for nav
  const counts = CATEGORIES.reduce((acc, c) => {
    acc[c.slug] = latest.filter((a) => a.category === c.slug).length;
    return acc;
  }, {} as Record<string, number>);

  const topFeatured = featured[0] || latest[0];
  const moreFeatured = (featured.length > 1 ? featured.slice(1) : latest.slice(1, 4)).slice(0, 4);

  return (
    <div className="pb-24">
      {/* Hero with macOS Window Frame */}
      <HeroSection
        onExplore={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
        breakingCount={breaking.length}
        totalStories={latest.length}
        editionDate={editionDate}
      />

      {/* Breaking ticker */}
      {breaking.length > 0 && (
        <div className="mb-10 sm:mb-12">
          <BreakingTicker items={breaking} />
        </div>
      )}

      {/* macOS Intelligence Widgets */}
      <MacOSWidgets />

      {/* Category nav */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16">
        <SectionHeader
          title="Explore by category"
          subtitle="Five lenses on the world, decoded daily"
          icon={<Newspaper size={18} className="text-primary" />}
        />
        <CategoryNav counts={counts} />
      </section>

      {/* Featured */}
      <section id="featured" className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16 scroll-mt-24">
        <SectionHeader
          title={<><span className="text-gradient">Today&apos;s intelligence</span></>}
          subtitle="The most important stories, ranked by AI impact score"
          icon={<Sparkles size={18} className="text-primary" />}
          action={{ label: "View all", onClick: () => go({ name: "category", slug: "world" }) }}
        />

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="glass rounded-3xl h-80 shimmer" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <div key={i} className="glass rounded-2xl h-36 shimmer" />)}
            </div>
          </div>
        ) : topFeatured ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <NewsCard article={topFeatured} variant="featured" index={0} onAuthRequired={onAuthRequired} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {moreFeatured.map((a, i) => (
                <NewsCard key={a.id} article={a} index={i} onAuthRequired={onAuthRequired} />
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* Trending topics strip */}
      {trending.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16">
          <div className="glass rounded-2xl p-5 sm:p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Flame size={16} className="text-rose-500" />
              <span className="text-sm font-semibold text-foreground">Trending on the wire</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {trending.slice(0, 10).map((t) => (
                <button
                  key={t.topic}
                  onClick={() => go({ name: "search", q: t.topic })}
                  className="group inline-flex items-center gap-1.5 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary px-3 py-1.5 text-xs font-medium transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  #{t.topic}
                  <span className="text-[10px] text-muted-foreground">{t.count}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest feed per category preview */}
      {CATEGORIES.map((cat) => {
        const items = latest.filter((a) => a.category === cat.slug).slice(0, 3);
        if (items.length === 0) return null;
        return (
          <section key={cat.slug} className="mx-auto max-w-7xl px-4 sm:px-6 mb-12 sm:mb-16">
            <SectionHeader
              title={cat.label}
              subtitle={cat.description}
              action={{ label: "See all", onClick: () => go({ name: "category", slug: cat.slug }) }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {items.map((a, i) => (
                <NewsCard key={a.id} article={a} index={i} onAuthRequired={onAuthRequired} />
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="macos-window relative overflow-hidden p-8 sm:p-12 text-center border border-border"
        >
          <div className="relative">
            <h2 className="font-display text-2xl sm:text-4xl font-normal tracking-tight mb-3 text-foreground">
              The world, <span className="text-gradient italic font-medium">decoded daily.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
              Build your personal intelligence feed. Follow topics, save stories, and let AI surface what matters to you.
            </p>
            <button
              onClick={() => go({ name: "dashboard" })}
              className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-6 py-3 text-sm font-medium shadow-lg shadow-primary/25 hover:opacity-90 active:scale-95 transition-all"
            >
              <span>Open your dashboard</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
