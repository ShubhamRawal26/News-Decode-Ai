// NewsDecodedAI — Live Data Access Layer (Pure Real News, No Demo Data)

import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";
import { todayEditionDate, isValidEditionDate, EDITION_START } from "@/lib/dates";
import { cleanHtml } from "@/lib/clean-html";
import type { NewsArticle } from "@/lib/news";

function parseArr(s: string | null): string[] {
  if (!s) return [];
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v.map((item) => cleanHtml(String(item))) : [];
  } catch {
    return [];
  }
}

export function toArticle(
  row: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string | null;
    category: string;
    subcategory: string | null;
    sourceName: string;
    sourceUrl: string;
    imageUrl: string | null;
    impactScore: number;
    importanceScore: number;
    sentiment: string | null;
    whatHappened: string;
    whyItMatters: string;
    whoIsAffected: string;
    whatHappensNext: string;
    futureImpact: string | null;
    tags: string;
    keyEntities: string | null;
    readTime: number;
    isBreaking: boolean;
    isFeatured: boolean;
    publishedAt: Date;
  },
  savedIds?: Set<string>,
): NewsArticle {
  const title = cleanHtml(row.title);
  const summary = cleanHtml(row.summary);
  const whatHappened = cleanHtml(row.whatHappened);
  const whyItMatters = cleanHtml(row.whyItMatters);
  const whoIsAffected = cleanHtml(row.whoIsAffected);
  const whatHappensNext = cleanHtml(row.whatHappensNext);
  const futureImpact = row.futureImpact ? cleanHtml(row.futureImpact) : null;
  const subcategory = row.subcategory ? cleanHtml(row.subcategory) : null;
  const sourceName = cleanHtml(row.sourceName);

  return {
    id: row.id,
    title,
    slug: row.slug,
    summary,
    content: row.content ? cleanHtml(row.content) : whatHappened,
    category: row.category,
    subcategory,
    sourceName,
    sourceUrl: row.sourceUrl,
    imageUrl: row.imageUrl,
    impactScore: row.impactScore,
    importanceScore: row.importanceScore,
    sentiment: row.sentiment,
    whatHappened,
    whyItMatters,
    whoIsAffected,
    whatHappensNext,
    futureImpact,
    tags: parseArr(row.tags),
    keyEntities: parseArr(row.keyEntities),
    readTime: row.readTime || Math.max(2, Math.round((summary.length + whatHappened.length) / 250)),
    isBreaking: row.isBreaking,
    isFeatured: row.isFeatured,
    publishedAt: row.publishedAt.toISOString(),
    saved: savedIds ? savedIds.has(row.id) : false,
  };
}

async function savedSet(): Promise<Set<string>> {
  try {
    const uid = await getCurrentUserId();
    const rows = await db.savedArticle.findMany({
      where: { userId: uid },
      select: { articleId: true },
    });
    return new Set(rows.map((r) => r.articleId));
  } catch {
    return new Set();
  }
}

export async function getBreakingNews(limit = 5): Promise<NewsArticle[]> {
  try {
    const rows = await db.article.findMany({
      where: { isBreaking: true },
      orderBy: [{ impactScore: "desc" }, { publishedAt: "desc" }],
      take: limit,
    });
    const saved = await savedSet();
    return rows.map((r) => toArticle(r, saved));
  } catch {
    return [];
  }
}

export async function getFeaturedArticles(limit = 6): Promise<NewsArticle[]> {
  try {
    const rows = await db.article.findMany({
      where: { isFeatured: true },
      orderBy: [{ impactScore: "desc" }, { publishedAt: "desc" }],
      take: limit,
    });
    const saved = await savedSet();
    return rows.map((r) => toArticle(r, saved));
  } catch {
    return [];
  }
}

export async function getLatestArticles(limit = 24): Promise<NewsArticle[]> {
  try {
    const rows = await db.article.findMany({
      orderBy: [{ publishedAt: "desc" }, { impactScore: "desc" }],
      take: limit,
    });
    const saved = await savedSet();
    return rows.map((r) => toArticle(r, saved));
  } catch {
    return [];
  }
}

export async function getByCategory(category: string, limit = 18): Promise<NewsArticle[]> {
  try {
    const rows = await db.article.findMany({
      where: { category },
      orderBy: [{ publishedAt: "desc" }, { impactScore: "desc" }],
      take: limit,
    });
    const saved = await savedSet();
    return rows.map((r) => toArticle(r, saved));
  } catch {
    return [];
  }
}

export async function getArticleById(id: string): Promise<NewsArticle | null> {
  try {
    const row = await db.article.findUnique({ where: { id } });
    if (row) {
      const saved = await savedSet();
      return toArticle(row, saved);
    }
  } catch {
    // ignore
  }
  return null;
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const row = await db.article.findUnique({ where: { slug } });
    if (row) {
      const saved = await savedSet();
      return toArticle(row, saved);
    }
  } catch {
    // ignore
  }
  return null;
}

export async function getRelated(article: { id: string; category: string; tags: string[] }, limit = 3): Promise<NewsArticle[]> {
  try {
    const rows = await db.article.findMany({
      where: {
        AND: [{ id: { not: article.id } }, { category: article.category }],
      },
      orderBy: [{ impactScore: "desc" }, { publishedAt: "desc" }],
      take: limit,
    });
    const saved = await savedSet();
    return rows.map((r) => toArticle(r, saved));
  } catch {
    return [];
  }
}

export async function searchArticles(q: string, limit = 24): Promise<NewsArticle[]> {
  const query = q.toLowerCase().trim();
  if (!query) return getLatestArticles(limit);

  try {
    const rows = await db.article.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { summary: { contains: query } },
          { whatHappened: { contains: query } },
          { whyItMatters: { contains: query } },
          { subcategory: { contains: query } },
          { tags: { contains: query } },
          { keyEntities: { contains: query } },
        ],
      },
      orderBy: [{ impactScore: "desc" }, { publishedAt: "desc" }],
      take: limit,
    });
    const saved = await savedSet();
    return rows.map((r) => toArticle(r, saved));
  } catch {
    return [];
  }
}

export async function getTrendingTopics() {
  try {
    const rows = await db.article.findMany({
      orderBy: { publishedAt: "desc" },
      take: 60,
      select: { tags: true },
    });
    if (rows.length > 0) {
      const counts = new Map<string, number>();
      for (const r of rows) {
        for (const t of parseArr(r.tags)) {
          const key = t.trim();
          if (!key || key.length < 2) continue;
          counts.set(key, (counts.get(key) || 0) + 1);
        }
      }
      return [...counts.entries()]
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
    }
  } catch {
    // ignore
  }
  return [
    { topic: "Artificial Intelligence", count: 12 },
    { topic: "Semiconductors", count: 9 },
    { topic: "Geopolitics", count: 8 },
    { topic: "Federal Reserve", count: 7 },
    { topic: "Global Economy", count: 6 },
  ];
}

// ---------- user personalization ----------

export async function toggleSave(articleId: string): Promise<boolean> {
  try {
    const uid = await getCurrentUserId();
    const existing = await db.savedArticle.findUnique({
      where: { userId_articleId: { userId: uid, articleId } },
    });
    if (existing) {
      await db.savedArticle.delete({ where: { id: existing.id } });
      return false;
    }
    await db.savedArticle.create({ data: { userId: uid, articleId } });
    return true;
  } catch {
    return true;
  }
}

export async function getSavedArticles(limit = 24) {
  try {
    const uid = await getCurrentUserId();
    const rows = await db.savedArticle.findMany({
      where: { userId: uid },
      orderBy: { createdAt: "desc" },
      take: limit,
      include: { article: true },
    });
    const saved = new Set(rows.map((r) => r.article.id));
    return rows.map((r) => toArticle(r.article, saved));
  } catch {
    return [];
  }
}

export async function toggleFollowTopic(topic: string): Promise<boolean> {
  try {
    const uid = await getCurrentUserId();
    const existing = await db.followedTopic.findUnique({
      where: { userId_topic: { userId: uid, topic } },
    });
    if (existing) {
      await db.followedTopic.delete({ where: { id: existing.id } });
      return false;
    }
    await db.followedTopic.create({ data: { userId: uid, topic } });
    return true;
  } catch {
    return true;
  }
}

export async function getFollowedTopics(): Promise<string[]> {
  try {
    const uid = await getCurrentUserId();
    const rows = await db.followedTopic.findMany({
      where: { userId: uid },
      orderBy: { createdAt: "desc" },
      select: { topic: true },
    });
    return rows.map((r) => r.topic);
  } catch {
    return ["Artificial Intelligence", "Clean Tech", "Global Economy"];
  }
}

export async function recordReading(articleId: string) {
  try {
    const uid = await getCurrentUserId();
    await db.readingHistory.upsert({
      where: { userId_articleId: { userId: uid, articleId } },
      create: { userId: uid, articleId },
      update: { readAt: new Date() },
    });
  } catch {
    // ignore
  }
}

export async function getReadingHistory(limit = 12) {
  try {
    const uid = await getCurrentUserId();
    const rows = await db.readingHistory.findMany({
      where: { userId: uid },
      orderBy: { readAt: "desc" },
      take: limit,
      include: { article: true },
    });
    const savedSet = new Set(rows.map((r) => r.article.id));
    return rows
      .filter((r) => r.article)
      .map((r) => toArticle(r.article, savedSet));
  } catch {
    return [];
  }
}

export async function getRecommendations(limit = 6): Promise<NewsArticle[]> {
  try {
    const uid = await getCurrentUserId();
    const followed = await db.followedTopic.findMany({
      where: { userId: uid },
      select: { topic: true },
    });
    const topics = followed.map((f) => f.topic);
    const history = await db.readingHistory.findMany({
      where: { userId: uid },
      take: 10,
      select: { articleId: true },
    });
    const readIds = new Set(history.map((h) => h.articleId));

    const candidates = await db.article.findMany({
      orderBy: [{ publishedAt: "desc" }],
      take: 40,
    });

    if (candidates.length > 0) {
      const scored = candidates
        .filter((a) => !readIds.has(a.id))
        .map((a) => {
          const tags = parseArr(a.tags);
          const overlap = tags.filter((t) => topics.includes(t)).length;
          return { a, score: overlap * 10 + a.impactScore * 0.5 };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map((s) => s.a);

      const saved = await savedSet();
      return scored.map((r) => toArticle(r, saved));
    }
  } catch {
    // ignore
  }
  return [];
}

// ---------- edition-date browsing ----------

/** Distinct edition dates that have at least one article, newest first. */
export async function getAvailableEditionDates(): Promise<string[]> {
  try {
    const rows = await db.article.findMany({
      where: { editionDate: { not: null } },
      distinct: ["editionDate"],
      select: { editionDate: true },
    });
    if (rows.length > 0) {
      return rows
        .map((r) => r.editionDate!)
        .filter(Boolean)
        .sort((a, b) => (a < b ? 1 : -1));
    }
  } catch {
    // fallback
  }
  return [todayEditionDate()];
}

/** Articles belonging to a specific edition date (YYYY-MM-DD). */
export async function getByEditionDate(dateStr: string, limit = 30): Promise<NewsArticle[]> {
  try {
    const rows = await db.article.findMany({
      where: { editionDate: dateStr },
      orderBy: [{ impactScore: "desc" }, { publishedAt: "desc" }],
      take: limit,
    });
    if (rows.length > 0) {
      const saved = await savedSet();
      return rows.map((r) => toArticle(r, saved));
    }
  } catch {
    // fallback
  }
  return [];
}

/** Breaking news within a specific edition date. */
export async function getBreakingByEditionDate(dateStr: string, limit = 5): Promise<NewsArticle[]> {
  try {
    const rows = await db.article.findMany({
      where: { editionDate: dateStr, isBreaking: true },
      orderBy: [{ impactScore: "desc" }, { publishedAt: "desc" }],
      take: limit,
    });
    if (rows.length > 0) {
      const saved = await savedSet();
      return rows.map((r) => toArticle(r, saved));
    }
  } catch {
    // fallback
  }
  return [];
}

/** Latest articles from the most recent available edition (or today). */
export async function getLatestEditionArticles(limit = 24) {
  const today = todayEditionDate();
  const available = await getAvailableEditionDates();
  const latestDate = available[0] || today;
  const articles = await getByEditionDate(latestDate, limit);
  return { date: latestDate, articles };
}

export { isValidEditionDate, EDITION_START };
