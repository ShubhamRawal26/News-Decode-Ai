import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { YuppNavbar } from "@/components/yupp/yupp-navbar";
import { YuppHeroSections } from "@/components/yupp/yupp-hero-sections";
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
import { CATEGORIES, type NewsArticle, TRENDING_TOPICS } from "@/lib/news";
import { DEMO_ARTICLES } from "@/lib/demo-data";
import { getFirebaseArticles } from "@/lib/firebase/news-data";
import { cn } from "@/lib/utils";
import { Sparkles, Flame, Zap } from "lucide-react";

export default function App() {
  const { view, go } = useAppStore();
  const [booted, setBooted] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>("all");
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

  // Fetch initial news feed directly from Firebase
  useEffect(() => {
    getFirebaseArticles()
      .then((data) => {
        if (data && data.length > 0) {
          setArticles(data);
          setBreaking(data.filter((a) => a.isBreaking || a.impactScore >= 80));
        } else {
          setArticles(DEMO_ARTICLES);
          setBreaking(DEMO_ARTICLES.filter((a) => a.isBreaking));
        }
      })
      .catch(() => {
        setArticles(DEMO_ARTICLES);
        setBreaking(DEMO_ARTICLES.filter((a) => a.isBreaking));
      })
      .finally(() => {
        setTrending(
          TRENDING_TOPICS.slice(0, 8).map((t, idx) => ({
            topic: t,
            count: 14 - idx,
          })),
        );
        setBooted(true);
      });
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
      {/* Floating Rounded Navbar */}
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
            {/* Top Hero Section with Phone Mockup Decoded Card */}
            <YuppHeroSections
              featuredStory={featuredStory}
              onAuthOpen={() => openAuth("signin")}
              onExplore={() => {
                document.getElementById("decoded-feed")?.scrollIntoView({ behavior: "smooth" });
              }}
            />

            {/* Breaking News Ticker */}
            {breaking.length > 0 && (
              <div className="mb-8">
                <BreakingTicker items={breaking} />
              </div>
            )}

            {/* Category Lenses Navigation */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="yupp-card-white p-6 sm:p-8">
                <SectionHeader
                  title="Explore by Category Lens"
                  subtitle="Five global perspectives, scored and decoded daily"
                  icon={<Zap size={18} className="text-[#E04E15]" />}
                />
                <CategoryNav counts={counts} />
              </div>
            </section>

            {/* Decoded News Intelligence Feed */}
            <section id="decoded-feed" className="mx-auto max-w-7xl px-4 sm:px-6 scroll-mt-28">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                <SectionHeader
                  title="Today's Decoded Stories"
                  subtitle="Ranked by AI Impact Score with structured takeaways and future foresight"
                  icon={<Sparkles size={18} className="text-[#E04E15]" />}
                />
              </div>

              {/* Quick Lens Filter Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
                <button
                  onClick={() => setActiveCategoryFilter("all")}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap",
                    activeCategoryFilter === "all"
                      ? "bg-[#E04E15] text-white shadow-md shadow-orange-950/20"
                      : "bg-card border border-border text-foreground hover:bg-secondary/70",
                  )}
                >
                  All Stories ({articles.length})
                </button>
                {CATEGORIES.map((c) => {
                  const count = counts[c.slug] || 0;
                  return (
                    <button
                      key={c.slug}
                      onClick={() => setActiveCategoryFilter(c.slug)}
                      className={cn(
                        "px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5",
                        activeCategoryFilter === c.slug
                          ? "bg-[#E04E15] text-white shadow-md shadow-orange-950/20"
                          : "bg-card border border-border text-foreground hover:bg-secondary/70",
                      )}
                    >
                      <span>{c.label}</span>
                      <span
                        className={cn(
                          "text-[10px] px-1.5 py-0.2 rounded-full",
                          activeCategoryFilter === c.slug
                            ? "bg-white/20 text-white"
                            : "bg-secondary text-muted-foreground",
                        )}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Grid of Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(activeCategoryFilter === "all"
                  ? articles
                  : articles.filter((a) => a.category === activeCategoryFilter)
                ).map((art, i) => (
                  <NewsCard
                    key={art.id}
                    article={art}
                    index={i}
                    onAuthRequired={() => openAuth("signin")}
                  />
                ))}
              </div>
            </section>

            {/* Trending Topics Strip */}
            {trending.length > 0 && (
              <section className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="yupp-card-white p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame size={16} className="text-[#E04E15]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Trending on the Global Wire
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {trending.map((t) => (
                      <button
                        key={t.topic}
                        onClick={() => go({ name: "search", q: t.topic })}
                        className="px-3.5 py-1.5 rounded-full bg-secondary hover:bg-[#E04E15]/10 hover:text-[#E04E15] text-xs font-semibold transition-colors flex items-center gap-1.5 text-foreground"
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
              key={
                view.name +
                (view.name === "category"
                  ? view.slug
                  : view.name === "article"
                    ? view.id
                    : view.name === "search"
                      ? view.q
                      : "")
              }
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {view.name === "category" && <CategoryView slug={view.slug} />}
              {view.name === "article" && (
                <ArticleView articleId={view.id} onAuthRequired={() => openAuth("signin")} />
              )}
              {view.name === "dashboard" && (
                <DashboardView onAuthRequired={() => openAuth("signin")} />
              )}
              {view.name === "search" && <SearchView q={view.q} />}
              {view.name === "date" && (
                <DateView date={view.date} onAuthRequired={() => openAuth("signin")} />
              )}
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
                  placeholder="Search intelligence topics, entities, news..."
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
