// NewsDecodedAI — shared types and constants

export const CATEGORIES = [
  { slug: "world", label: "World News", description: "Global events shaping our planet", icon: "Globe2", gradient: "from-sky-400 to-blue-600", accent: "sky" },
  { slug: "business", label: "Business", description: "Markets, companies and the economy", icon: "Briefcase", gradient: "from-emerald-400 to-teal-600", accent: "emerald" },
  { slug: "ai-tech", label: "AI & Technology", description: "The frontier of innovation", icon: "Cpu", gradient: "from-violet-400 to-purple-600", accent: "violet" },
  { slug: "politics", label: "Politics", description: "Power, policy and governance", icon: "Landmark", gradient: "from-rose-400 to-pink-600", accent: "rose" },
  { slug: "markets", label: "Markets", description: "Stocks, crypto and finance", icon: "TrendingUp", gradient: "from-amber-400 to-orange-600", accent: "amber" },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const CATEGORY_LABELS: Record<string, string> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c.label]),
);

export const TRENDING_TOPICS = [
  "Artificial Intelligence",
  "Climate Action",
  "Global Economy",
  "Cryptocurrency",
  "Space Exploration",
  "Cybersecurity",
  "Renewable Energy",
  "Geopolitics",
  "Semiconductors",
  "Electric Vehicles",
];

export interface ArticleAnalysis {
  whatHappened: string;
  whyItMatters: string;
  whoIsAffected: string;
  whatHappensNext: string;
  futureImpact?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content?: string | null;
  category: string;
  subcategory?: string | null;
  sourceName: string;
  sourceUrl: string;
  imageUrl?: string | null;
  impactScore: number;
  importanceScore: number;
  sentiment?: string | null;
  whatHappened: string;
  whyItMatters: string;
  whoIsAffected: string;
  whatHappensNext: string;
  futureImpact?: string | null;
  tags: string[];
  keyEntities?: string[];
  readTime: number;
  isBreaking: boolean;
  isFeatured: boolean;
  publishedAt: string;
  saved?: boolean;
}

export interface BreakingNewsItem {
  id: string;
  title: string;
  summary: string;
  impactScore: number;
  category: string;
  sourceName: string;
  publishedAt: string;
}

export interface DashboardData {
  dailyBrief: {
    headline: string;
    summary: string;
    topStories: NewsArticle[];
  };
  saved: NewsArticle[];
  trendingTopics: { topic: string; count: number }[];
  recommendations: NewsArticle[];
  readingHistory: NewsArticle[];
}
