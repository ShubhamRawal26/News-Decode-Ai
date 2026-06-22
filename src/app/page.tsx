"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { AuroraBackground } from "@/components/news/aurora-background";
import { PremiumNav } from "@/components/news/premium-nav";
import { Footer } from "@/components/news/footer";
import { HomeView } from "@/components/news/home-view";
import { CategoryView } from "@/components/news/category-view";
import { ArticleView } from "@/components/news/article-view";
import { DashboardView } from "@/components/news/dashboard-view";
import { SearchView } from "@/components/news/search-view";

export default function Home() {
  const { view, setSavedIds, setFollowedTopics } = useAppStore();
  const [booted, setBooted] = useState(false);

  // load user state once on mount
  useEffect(() => {
    let cancelled = false;
    fetch("/api/user/state")
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        setSavedIds(d.savedIds || []);
        setFollowedTopics(d.followedTopics || []);
      })
      .catch(() => {})
      .finally(() => !cancelled && setBooted(true));
    return () => { cancelled = true; };
  }, [setSavedIds, setFollowedTopics]);

  // deep-link via ?a=<id>
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const a = params.get("a");
    if (a) useAppStore.getState().go({ name: "article", id: a });
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <AuroraBackground />
      <PremiumNav />

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
              {view.name === "home" && <HomeView />}
              {view.name === "category" && <CategoryView slug={view.slug} />}
              {view.name === "article" && <ArticleView articleId={view.id} />}
              {view.name === "dashboard" && <DashboardView />}
              {view.name === "search" && <SearchView q={view.q} />}
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      <Footer />
    </div>
  );
}
