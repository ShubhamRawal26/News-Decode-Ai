"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { AuroraBackground } from "@/components/news/aurora-background";
import { YuppSidebar } from "@/components/yupp/yupp-sidebar";
import { YuppTopbar } from "@/components/yupp/yupp-topbar";
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
import { Sparkles, X, Menu, Flame } from "lucide-react";

export default function Home() {
  const { view, go } = useAppStore();
  const [booted, setBooted] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"arena" | "feed" | "leaderboard">("arena");
  const [quickTakeActive, setQuickTakeActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // Category article counts
  const counts = CATEGORIES.reduce((acc, c) => {
    acc[c.slug] = articles.filter((a) => a.category === c.slug).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="relative min-h-screen flex bg-background text-foreground">
      <AuroraBackground />

      {/* Yupp.ai Left Sidebar */}
      <YuppSidebar
        onAuthRequired={() => openAuth("signin")}
        activeTab={activeTab}
        setActiveTab={(tab: string) => setActiveTab(tab as "arena" | "feed" | "leaderboard")}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Yupp.ai Topbar */}
        <YuppTopbar
          activeTab={activeTab}
          setActiveTab={(tab: string) => setActiveTab(tab as "arena" | "feed" | "leaderboard")}
          quickTakeActive={quickTakeActive}
          setQuickTakeActive={setQuickTakeActive}
          onSearchOpen={() => setSpotlightOpen(true)}
          onMobileMenuToggle={() => setMobileMenuOpen(true)}
        />

        {/* Workspace Body */}
        <main className="flex-1 py-6 sm:py-8">
          {!booted ? (
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-56 rounded-2xl bg-card border border-border shimmer" />
                ))}
              </div>
            </div>
          ) : view.name === "home" ? (
            <div>
              {/* Central Yupp Prompt & Model Selector */}
              <YuppPromptBar onSearch={(q) => go({ name: "search", q })} />

              {/* Breaking Ticker */}
              {breaking.length > 0 && (
                <div className="mb-8">
                  <BreakingTicker items={breaking} />
                </div>
              )}

              {/* Tab: Model Arena (Yupp Core Experience) */}
              {activeTab === "arena" && (
                <div>
                  {featuredStory && (
                    <YuppComparisonArena
                      featuredArticle={featuredStory}
                      quickTakeActive={quickTakeActive}
                    />
                  )}

                  {/* Grid of Other Stories for Comparative Analysis */}
                  <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-16">
                    <SectionHeader
                      title="Stories Ready for Multi-Model Analysis"
                      subtitle="Select any story to compare AI model reasoning & forecasts"
                      icon={<Sparkles size={18} className="text-primary" />}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                      {articles.slice(1, 7).map((art, i) => (
                        <NewsCard
                          key={art.id}
                          article={art}
                          index={i}
                          onAuthRequired={() => openAuth("signin")}
                        />
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* Tab: Feed Mode */}
              {activeTab === "feed" && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                  {/* Category Nav */}
                  <section className="mb-10">
                    <SectionHeader
                      title="Intelligence Lenses"
                      subtitle="Browse stories by category"
                    />
                    <CategoryNav counts={counts} />
                  </section>

                  {/* Feed Grid */}
                  <section className="mb-16">
                    <SectionHeader
                      title="Latest Decoded Intelligence"
                      subtitle="Real-time global news synthesis"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
                </div>
              )}

              {/* Tab: Leaderboard Mode */}
              {activeTab === "leaderboard" && <YuppLeaderboard />}

              {/* Trending Topics Strip */}
              {trending.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 sm:px-6 mb-12">
                  <div className="p-5 rounded-2xl bg-card border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Flame size={16} className="text-rose-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Trending Across Models
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {trending.map((t) => (
                        <button
                          key={t.topic}
                          onClick={() => go({ name: "search", q: t.topic })}
                          className="px-3 py-1 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary text-xs font-medium transition-colors flex items-center gap-1.5"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
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
      </div>

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} mode={authMode} />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-background/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="relative z-10 w-72 bg-card border-r border-border h-full flex flex-col p-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white">
                    <Sparkles size={16} />
                  </div>
                  <span>Yupp AI</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-1 flex-1 overflow-y-auto">
                <button
                  onClick={() => {
                    setActiveTab("arena");
                    go({ name: "home" });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium hover:bg-secondary"
                >
                  Model Arena
                </button>
                <button
                  onClick={() => {
                    setActiveTab("feed");
                    go({ name: "home" });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium hover:bg-secondary"
                >
                  Intelligence Feed
                </button>
                <button
                  onClick={() => {
                    setActiveTab("leaderboard");
                    go({ name: "home" });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium hover:bg-secondary"
                >
                  Model Leaderboard
                </button>
                <button
                  onClick={() => {
                    go({ name: "dashboard" });
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium hover:bg-secondary"
                >
                  Saved Library & Dashboard
                </button>

                <div className="my-3 h-px bg-border" />
                <div className="px-3 text-[10px] uppercase font-bold text-muted-foreground">Categories</div>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => {
                      go({ name: "category", slug: c.slug });
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium hover:bg-secondary"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Spotlight Search Modal */}
      <AnimatePresence>
        {spotlightOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
            <div
              className="fixed inset-0 bg-background/60 backdrop-blur-md"
              onClick={() => setSpotlightOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              className="relative w-full max-w-xl rounded-2xl bg-card p-4 shadow-2xl border border-border z-10"
            >
              <form onSubmit={handleSpotlightSubmit} className="flex items-center gap-3">
                <span className="text-primary font-bold">⌘</span>
                <input
                  autoFocus
                  value={spotlightQuery}
                  onChange={(e) => setSpotlightQuery(e.target.value)}
                  placeholder="Search intelligence topics, entities, models..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
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
