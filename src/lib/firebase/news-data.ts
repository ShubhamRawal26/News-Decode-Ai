// NewsDecodedAI — Firebase Realtime Database News Service
// Provides unified REST & client-side access
// for articles, editions, categories, and AI daily briefings.

import type { NewsArticle } from "@/lib/news";
import { DEMO_ARTICLES } from "@/lib/demo-data";
import { todayEditionDate, isValidEditionDate } from "@/lib/dates";

const FIREBASE_DB_URL =
  (typeof process !== "undefined" && process?.env?.NEXT_PUBLIC_FIREBASE_DATABASE_URL) ||
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_FIREBASE_DATABASE_URL) ||
  "https://sign-up-e0b5e-default-rtdb.firebaseio.com";

// In-memory cache for ultra-fast response
let memoryArticlesCache: NewsArticle[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute

/**
 * Fetch all articles from Firebase Realtime Database with DEMO_ARTICLES fallback
 */
export async function getFirebaseArticles(): Promise<NewsArticle[]> {
  const now = Date.now();
  if (memoryArticlesCache && now - lastCacheTime < CACHE_TTL_MS) {
    return memoryArticlesCache;
  }

  try {
    const res = await fetch(`${FIREBASE_DB_URL}/articles.json`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`Firebase returned status ${res.status}`);
    const data = await res.json();

    if (data && typeof data === "object") {
      const list: NewsArticle[] = Object.values(data);
      // Sort newest published first, then impact score
      list.sort((a, b) => {
        const timeDiff = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        if (timeDiff !== 0) return timeDiff;
        return b.impactScore - a.impactScore;
      });

      if (list.length > 0) {
        memoryArticlesCache = list;
        lastCacheTime = now;
        return list;
      }
    }

    return DEMO_ARTICLES;
  } catch (err) {
    console.warn("[Firebase] Could not fetch articles, falling back to local dataset:", err);
    return DEMO_ARTICLES;
  }
}

/**
 * Fetch single article by id
 */
export async function getFirebaseArticleById(id: string): Promise<NewsArticle | null> {
  try {
    const all = await getFirebaseArticles();
    return all.find((a) => a.id === id || a.slug === id) || null;
  } catch {
    return DEMO_ARTICLES.find((a) => a.id === id || a.slug === id) || null;
  }
}

/**
 * Fetch articles filtered by category
 */
export async function getFirebaseArticlesByCategory(
  category: string,
): Promise<NewsArticle[]> {
  const all = await getFirebaseArticles();
  return all.filter((a) => a.category.toLowerCase() === category.toLowerCase());
}

/**
 * Fetch articles for a specific edition date (YYYY-MM-DD)
 */
export async function getFirebaseArticlesByDate(dateStr: string): Promise<NewsArticle[]> {
  if (!isValidEditionDate(dateStr)) return [];
  const all = await getFirebaseArticles();
  return all.filter((a) => a.publishedAt.startsWith(dateStr));
}

/**
 * Fetch list of unique available edition dates
 */
export async function getFirebaseAvailableEditionDates(): Promise<string[]> {
  const all = await getFirebaseArticles();
  const dateSet = new Set<string>();
  for (const a of all) {
    if (a.publishedAt) {
      dateSet.add(a.publishedAt.slice(0, 10));
    }
  }
  dateSet.add(todayEditionDate());
  return Array.from(dateSet).sort().reverse();
}

/**
 * Save / Upsert an article into Firebase Realtime Database
 */
export async function saveArticleToFirebase(article: NewsArticle): Promise<boolean> {
  try {
    const cleanId = article.id.replace(/[.#$/[\]]/g, "_");
    const res = await fetch(`${FIREBASE_DB_URL}/articles/${cleanId}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });

    if (res.ok) {
      // Invalidate cache
      memoryArticlesCache = null;
      return true;
    }
    return false;
  } catch (err) {
    console.error("[Firebase] Error saving article:", err);
    return false;
  }
}

/**
 * Bulk seed articles into Firebase Realtime Database
 */
export async function seedFirebaseDatabase(articles: NewsArticle[]): Promise<{ count: number }> {
  try {
    const map: Record<string, NewsArticle> = {};
    for (const a of articles) {
      const cleanId = a.id.replace(/[.#$/[\]]/g, "_");
      map[cleanId] = a;
    }

    const res = await fetch(`${FIREBASE_DB_URL}/articles.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(map),
    });

    if (res.ok) {
      memoryArticlesCache = null;
      return { count: Object.keys(map).length };
    }
    throw new Error(`Firebase returned ${res.status}`);
  } catch (err) {
    console.error("[Firebase] Seeding error:", err);
    throw err;
  }
}

/**
 * Fetch daily executive brief from Firebase
 */
export async function getFirebaseDailyBrief(): Promise<{ headline: string; summary: string }> {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/dailyBrief.json`, {
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.headline) return data;
    }
  } catch (err) {
    console.warn("[Firebase] Could not fetch daily brief:", err);
  }

  return {
    headline: "Global Intelligence & Macro Disruption Brief",
    summary:
      "Cross-sector AI intelligence scans highlight semiconductor supply stabilization, sovereign AI investments, central bank inflation recalibration, and emerging regulatory frameworks.",
  };
}

/**
 * Save daily executive brief to Firebase
 */
export async function saveFirebaseDailyBrief(brief: {
  headline: string;
  summary: string;
}): Promise<boolean> {
  try {
    const res = await fetch(`${FIREBASE_DB_URL}/dailyBrief.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(brief),
    });
    return res.ok;
  } catch (err) {
    console.error("[Firebase] Error saving daily brief:", err);
    return false;
  }
}
