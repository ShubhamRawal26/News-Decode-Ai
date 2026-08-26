import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Globe2, Briefcase, Cpu, Landmark, TrendingUp } from "lucide-react";
import { CATEGORIES, type NewsArticle } from "@/lib/news";
import { DEMO_ARTICLES } from "@/lib/demo-data";
import { getFirebaseArticlesByCategory } from "@/lib/firebase/news-data";
import { NewsGrid } from "./news-grid";
import { SectionHeader } from "./section-header";
import { BreakingTicker } from "./breaking-ticker";
import { NewsCard } from "./news-card";

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe2,
  Briefcase,
  Cpu,
  Landmark,
  TrendingUp,
};

export function CategoryView({ slug }: { slug: string }) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [breaking, setBreaking] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const Icon = ICONS[cat?.icon || "Globe2"] || Globe2;

  useEffect(() => {
    let cancelled = false;
    getFirebaseArticlesByCategory(slug)
      .then((fetched) => {
        if (cancelled) return;
        if (fetched && fetched.length > 0) {
          setArticles(fetched);
          setBreaking(fetched.filter((b) => b.isBreaking || b.impactScore >= 80).slice(0, 3));
        } else {
          const fallback = DEMO_ARTICLES.filter((a) => a.category === slug);
          setArticles(fallback);
          setBreaking(fallback.filter((a) => a.isBreaking).slice(0, 3));
        }
      })
      .catch(() => {
        if (!cancelled) {
          const fallback = DEMO_ARTICLES.filter((a) => a.category === slug);
          setArticles(fallback);
          setBreaking(fallback.filter((a) => a.isBreaking).slice(0, 3));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const featured = articles.find((a) => a.isFeatured) || articles[0];
  const rest = featured ? articles.filter((a) => a.id !== featured.id) : articles;

  return (
    <div className="pt-6 sm:pt-10 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-8">
        {/* hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="yupp-card-dark relative overflow-hidden p-8 sm:p-12 shadow-xl border border-white/10"
        >
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#E04E15]/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E04E15] text-white shadow-xl shadow-orange-950/30 shrink-0">
              <Icon size={32} />
            </span>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FBE2D5] text-xs font-bold mb-2">
                <span>Decoded Category Lens</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                {cat?.label}
              </h1>
              <p className="text-[#D4BEC3] mt-2 text-sm sm:text-base max-w-2xl">
                {cat?.description}
              </p>
            </div>
          </div>
        </motion.div>

        {breaking.length > 0 && (
          <div className="mb-8">
            <BreakingTicker items={breaking} />
          </div>
        )}

        {featured && !loading && (
          <div className="space-y-4">
            <SectionHeader
              title="Top Impact Development"
              subtitle="The highest ranked story in this lens right now"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7">
                <NewsCard article={featured} variant="featured" />
              </div>
              <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                {rest.slice(0, 2).map((a, i) => (
                  <NewsCard key={a.id} article={a} variant="default" index={i} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 pt-4">
          <SectionHeader
            title={`All ${cat?.label || "Category"} Briefs`}
            subtitle={`${articles.length} verified stories decoded by AI`}
          />
          <NewsGrid articles={loading ? [] : rest} loading={loading} />
        </div>

        {!loading && rest.length === 0 && (
          <div className="yupp-card-white p-12 text-center">
            <p className="text-muted-foreground">
              No stories in this category yet. Our AI is still scanning global feeds.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
