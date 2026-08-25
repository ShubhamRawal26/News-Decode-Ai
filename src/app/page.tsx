"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { YuppNavbar } from "@/components/yupp/yupp-navbar";
import { YuppHeroSections } from "@/components/yupp/yupp-hero-sections";
import { YuppPromptBar } from "@/components/yupp/yupp-prompt-bar";
import { YuppComparisonArena } from "@/components/yupp/yupp-comparison-arena";
import { YuppLeaderboard } from "@/components/yupp/yupp-leaderboard";
import { BreakingTicker } from "@/components/news/breaking-ticker";
import { CategoryNav } from "@/components/news/category-nav";
import { NewsCard } from "@/components/news/news-card";
import { SectionHeader } from "@/components/news/section-header";
import { Footer } from "@/components/news/footer";
import { CategoryView } from "@/components/news/category-view";
import { ArticleView } from "@/components/news/article-view";
import { DashboardView } from "@/components/news/dashboard-view";
import { SearchView } from "@/components/news/search-view";
import { DateView } from "@/components/news/date-view";
import { AuthModal } from "@/components/auth/auth-modal";
import { CATEGORIES, type NewsArticle } from "@/lib/news";
import { Sparkles, Flame } from "lucide-react";

export default function Home() {
  const { view, go } = useAppStore();
  const [booted, setBooted] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState("");

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [breaking, setBreaking] = useState<NewsArticle[]>([]);
  const [trending, setTrending] = useState<{ topic: string; count: number }[]>([]);

  const openAuth = (mode: "signin" | "signup" = "signin") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSpotlightOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Fetch initial news feed
  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => {
        if (d.latest) setArticles(d.latest);
        if (d.breaking) setBreaking(d.breaking);
        if (d.trending) setTrending(d.trending);
      })
      .catch(() => {})
      .finally(() => setBooted(true));
  }, []);

  // deep-link via ?a=<id>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const a = params.get("a");
    if (a) useAppStore.getState().go({ name: "article", id: a });
  }, []);

  const handleSpotlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotlightQuery.trim()) return;
    go({ name: "search", q: spotlightQuery.trim() });
    setSpotlightOpen(false);
    setSpotlightQuery("");
  };

  const featuredStory = articles.find((a) => a.isFeatured) || articles[0];

  const counts = CATEGORIES.reduce((acc, c) => {
    acc[c.slug] = articles.filter((a) => a.category === c.slug).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground yupp-grid-bg">
      {/* Yupp Floating Rounded Navbar */}
      <YuppNavbar
        onSearchOpen={() => setSpotlightOpen(true)}
        onAuthOpen={() => openAuth("signin")}
      />

      <main className="flex-1 pt-6 pb-16">
        {!booted ? (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-[2.5rem] bg-card border border-border shimmer" />
              ))}
            </div>
          </div>
        ) : view.name === "home" ? (
          <div className="space-y-12 sm:space-y-16">
            {/* Top Yupp Hero Banner */}
            <YuppHeroSections
              featuredStory={featuredStory}
              onAuthOpen={() => openAuth("signin")}
              onExplore={() => {
                document.getElementById("yupp-arena")?.scrollIntoView({ behavior: "smooth" });
              }}
            />

            {/* Central Yupp Prompt & Model Selector */}
            <div id="yupp-prompt" className="scroll-mt-28">
              <YuppPromptBar onSearch={(q) => go({ name: "search", q })} />
            </div>

            {/* Breaking News Ticker */}
            {breaking.length > 0 && (
              <div className="mb-8">
                <BreakingTicker items={breaking} />
              </div>
            )}

            {/* Multi-Model Side-by-Side Comparison Arena */}
            {featuredStory && (
              <div id="yupp-arena" className="scroll-mt-28">
                <YuppComparisonArena featuredArticle={featuredStory} />
              </div>
            )}

            {/* Intelligence Lenses Category Nav */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="yupp-card-white p-6 sm:p-8">
                <SectionHeader
                  title="Intelligence Lenses"
                  subtitle="Browse decoded global stories by category"
                />
                <CategoryNav counts={counts} />
              </div>
            </section>

            {/* Full Decoded Intelligence Feed */}
            <section id="yupp-feed" className="mx-auto max-w-7xl px-4 sm:px-6 scroll-mt-28">
              <SectionHeader
                title="Latest Decoded Intelligence"
                subtitle="Ranked by multi-model consensus & AI impact scoring"
                icon={<Sparkles size={18} className="text-[#E04E15]" />}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.map((art, i) => (
                  <NewsCard
                    key={art.id}
                    article={art}
                    index={i}
                    onAuthRequired={() => openAuth("signin")}
                  />
                ))}
              </div>
            </section>

            {/* Live Model Leaderboard */}
            <div id="yupp-leaderboard" className="scroll-mt-28">
              <YuppLeaderboard />
            </div>

            {/* Trending Topics Strip */}
            {trending.length > 0 && (
              <section className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="yupp-card-white p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame size={16} className="text-[#E04E15]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Trending on the Wire
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {trending.map((t) => (
                      <button
                        key={t.topic}
                        onClick={() => go({ name: "search", q: t.topic })}
                        className="px-3.5 py-1.5 rounded-full bg-secondary hover:bg-[#E04E15]/10 hover:text-[#E04E15] text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E04E15]" />
                        #{t.topic}
                        <span className="text-[10px] text-muted-foreground">({t.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={view.name + (view.name === "category" ? view.slug : view.name === "article" ? view.id : view.name === "search" ? view.q : "")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {view.name === "category" && <CategoryView slug={view.slug} />}
              {view.name === "article" && <ArticleView articleId={view.id} onAuthRequired={() => openAuth("signin")} />}
              {view.name === "dashboard" && <DashboardView onAuthRequired={() => openAuth("signin")} />}
              {view.name === "search" && <SearchView q={view.q} />}
              {view.name === "date" && <DateView date={view.date} onAuthRequired={() => openAuth("signin")} />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <Footer />

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} mode={authMode} />

      {/* Spotlight Search Modal */}
      <AnimatePresence>
        {spotlightOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-md"
              onClick={() => setSpotlightOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              className="relative w-full max-w-xl rounded-3xl bg-card p-5 shadow-2xl border border-border z-10"
            >
              <form onSubmit={handleSpotlightSubmit} className="flex items-center gap-3">
                <span className="text-[#E04E15] font-bold text-lg">⌘</span>
                <input
                  autoFocus
                  value={spotlightQuery}
                  onChange={(e) => setSpotlightQuery(e.target.value)}
                  placeholder="Search intelligence topics, entities, models..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base font-medium"
                />
                <kbd className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                  ESC
                </kbd>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
