"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { AuroraBackground } from "@/components/news/aurora-background";
import { MacOSMenuBar } from "@/components/news/macos-menubar";
import { MacOSDock } from "@/components/news/macos-dock";
import { PremiumNav } from "@/components/news/premium-nav";
import { Footer } from "@/components/news/footer";
import { HomeView } from "@/components/news/home-view";
import { CategoryView } from "@/components/news/category-view";
import { ArticleView } from "@/components/news/article-view";
import { DashboardView } from "@/components/news/dashboard-view";
import { SearchView } from "@/components/news/search-view";
import { DateView } from "@/components/news/date-view";
import { AuthModal } from "@/components/auth/auth-modal";

export default function Home() {
  const { view, go } = useAppStore();
  const [booted, setBooted] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState("");

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

  // deep-link via ?a=<id>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const a = params.get("a");
    if (a) useAppStore.getState().go({ name: "article", id: a });
  }, []);

  // mark booted immediately (auth state is handled by AuthProvider)
  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSpotlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spotlightQuery.trim()) return;
    go({ name: "search", q: spotlightQuery.trim() });
    setSpotlightOpen(false);
    setSpotlightQuery("");
  };

  return (
    <div className="relative min-h-screen flex flex-col pt-7 pb-20">
      <AuroraBackground />
      <MacOSMenuBar onSearchOpen={() => setSpotlightOpen(true)} />
      <PremiumNav onAuthRequired={openAuth} />

      <main className="flex-1">
        {!booted ? (
          <div className="pt-32 pb-20 mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass rounded-2xl h-52 shimmer" />
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={view.name + (view.name === "category" ? view.slug : view.name === "article" ? view.id : view.name === "search" ? view.q : "")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {view.name === "home" && <HomeView onAuthRequired={openAuth} />}
              {view.name === "category" && <CategoryView slug={view.slug} />}
              {view.name === "article" && <ArticleView articleId={view.id} onAuthRequired={openAuth} />}
              {view.name === "dashboard" && <DashboardView onAuthRequired={openAuth} />}
              {view.name === "search" && <SearchView q={view.q} />}
              {view.name === "date" && <DateView date={view.date} onAuthRequired={openAuth} />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <Footer />

      {/* Floating macOS Dock Toolbar */}
      <MacOSDock onSearchOpen={() => setSpotlightOpen(true)} />

      {/* Auth Modal */}
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} mode={authMode} />

      {/* macOS Spotlight Search Modal */}
      <AnimatePresence>
        {spotlightOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-28 px-4">
            <div className="fixed inset-0 bg-background/50 backdrop-blur-md" onClick={() => setSpotlightOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              className="relative w-full max-w-xl macos-window p-4 shadow-2xl border border-border"
            >
              <form onSubmit={handleSpotlightSubmit} className="flex items-center gap-3">
                <span className="text-primary font-semibold text-sm">⌘</span>
                <input
                  autoFocus
                  value={spotlightQuery}
                  onChange={(e) => setSpotlightQuery(e.target.value)}
                  placeholder="Spotlight Intelligence Search (e.g. AI, Semiconductors, Clean Energy)..."
                  className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base font-medium"
                />
                <kbd className="text-[10px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                  ESC
                </kbd>
              </form>

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Press Enter to decode intelligence</span>
                <div className="flex gap-2">
                  <span>#Artificial Intelligence</span>
                  <span>#Clean Tech</span>
                  <span>#Markets</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
