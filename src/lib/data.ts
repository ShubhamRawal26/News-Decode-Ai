// NewsDecodedAI — Live Firebase Data Access Layer
// 100% Firebase Realtime Database with Instant Offline Caching

import {
  getFirebaseArticles,
  getFirebaseArticleById,
  getFirebaseArticlesByCategory,
  getFirebaseArticlesByDate,
  getFirebaseAvailableEditionDates,
  getFirebaseDailyBrief,
} from "@/lib/firebase/news-data";
import type { NewsArticle, CategorySlug } from "@/lib/news";
import { TRENDING_TOPICS } from "@/lib/news";
import { todayEditionDate } from "@/lib/dates";

export async function getBreakingNews(limit = 5): Promise<NewsArticle[]> {
  const all = await getFirebaseArticles();
  const breaking = all.filter((a) => a.isBreaking || a.impactScore >= 80);
  return breaking.slice(0, limit);
}

export async function getFeaturedArticle(): Promise<NewsArticle | null> {
  const all = await getFirebaseArticles();
  const featured = all.find((a) => a.isFeatured) || all[0];
  return featured || null;
}

export async function getLatestArticles(limit = 30): Promise<NewsArticle[]> {
  const all = await getFirebaseArticles();
  return all.slice(0, limit);
}

export async function getLatestEditionArticles(limit = 36): Promise<NewsArticle[]> {
  const all = await getFirebaseArticles();
  return all.slice(0, limit);
}

export async function getArticlesByCategory(
  category: CategorySlug | string,
  limit = 20,
): Promise<NewsArticle[]> {
  const list = await getFirebaseArticlesByCategory(category);
  return list.slice(0, limit);
}

export async function getArticleById(id: string): Promise<NewsArticle | null> {
  return getFirebaseArticleById(id);
}

export async function getRelatedArticles(article: NewsArticle, limit = 3): Promise<NewsArticle[]> {
  const list = await getFirebaseArticlesByCategory(article.category);
  return list.filter((a) => a.id !== article.id).slice(0, limit);
}

export async function searchArticles(query: string, limit = 20): Promise<NewsArticle[]> {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  const all = await getFirebaseArticles();

  return all
    .filter((a) => {
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchSummary = a.summary.toLowerCase().includes(q);
      const matchTags = a.tags.some((t) => t.toLowerCase().includes(q));
      const matchCategory = a.category.toLowerCase().includes(q);
      const matchEntities = a.keyEntities?.some((e) => e.toLowerCase().includes(q));
      return matchTitle || matchSummary || matchTags || matchCategory || matchEntities;
    })
    .slice(0, limit);
}

export async function getTrendingTopics(): Promise<{ topic: string; count: number }[]> {
  const all = await getFirebaseArticles();
  const counts: Record<string, number> = {};

  for (const a of all) {
    for (const tag of a.tags) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([topic, count]) => ({ topic, count }));

  if (sorted.length < 5) {
    return TRENDING_TOPICS.slice(0, 8).map((t, idx) => ({
      topic: t,
      count: 14 - idx,
    }));
  }

  return sorted;
}

export async function getAvailableEditionDates(): Promise<string[]> {
  return getFirebaseAvailableEditionDates();
}

export async function getByEditionDate(dateStr: string): Promise<NewsArticle[]> {
  return getFirebaseArticlesByDate(dateStr);
}

export async function getBreakingByEditionDate(dateStr: string, limit = 3): Promise<NewsArticle[]> {
  const all = await getFirebaseArticlesByDate(dateStr);
  return all.filter((a) => a.isBreaking || a.impactScore >= 80).slice(0, limit);
}

export async function getDailyBrief(): Promise<{
  headline: string;
  summary: string;
  topStories: NewsArticle[];
}> {
  const brief = await getFirebaseDailyBrief();
  const all = await getFirebaseArticles();
  const topStories = all.slice(0, 4);

  return {
    headline: brief.headline,
    summary: brief.summary,
    topStories,
  };
}

// Aliases
export const getByCategory = getArticlesByCategory;
export const getRelated = getRelatedArticles;
export const getFeaturedArticles = getFeaturedArticle;
export const toggleSave = async (_id: string) => true;
export const toggleFollowTopic = async (_topic: string) => true;
export const toArticle = (a: any) => a;
