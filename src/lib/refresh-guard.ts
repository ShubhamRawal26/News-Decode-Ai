// Daily refresh guard — ensures today's news edition exists.
// Used by lazy auto-refresh (on homepage load) and the cron endpoint.

import { todayEditionDate } from "@/lib/dates";
import { refreshAllNews } from "@/lib/ai-pipeline";
import { getFirebaseArticles } from "@/lib/firebase/news-data";

let inFlight: Promise<{ ok: boolean; total: number; refreshed: boolean }> | null = null;
let lastRefreshAt = 0;
const MIN_REFRESH_INTERVAL_MS = 30 * 60 * 1000; // at most once per 30 min

export interface DailyRefreshResult {
  ok: boolean;
  total: number;
  refreshed: boolean;
  today: string;
  hasEdition: boolean;
}

/** True if today's edition has at least one article. */
export async function hasTodayEdition(): Promise<boolean> {
  const today = todayEditionDate();
  const all = await getFirebaseArticles();
  const todayArticles = all.filter((a) => a.publishedAt && a.publishedAt.startsWith(today));
  return todayArticles.length > 0;
}

export async function ensureDailyEdition(force = false): Promise<DailyRefreshResult> {
  const today = todayEditionDate();
  const has = await hasTodayEdition();

  if (has && !force) {
    return { ok: true, total: 0, refreshed: false, today, hasEdition: true };
  }

  // throttle non-forced refreshes
  if (!force && Date.now() - lastRefreshAt < MIN_REFRESH_INTERVAL_MS) {
    return { ok: true, total: 0, refreshed: false, today, hasEdition: has };
  }

  // dedupe concurrent calls
  if (inFlight) {
    const r = await inFlight;
    return { ...r, today, hasEdition: has };
  }

  lastRefreshAt = Date.now();
  inFlight = (async () => {
    try {
      const results = await refreshAllNews();
      const total = results.reduce((s, r) => s + r.inserted, 0);
      return { ok: true, total, refreshed: true };
    } catch {
      return { ok: false, total: 0, refreshed: false };
    } finally {
      inFlight = null;
    }
  })();

  const r = await inFlight;
  const hasAfter = await hasTodayEdition();
  return { ...r, today, hasEdition: hasAfter };
}

export function triggerBackgroundEditionRefresh(force = false) {
  ensureDailyEdition(force).catch(() => {
    /* swallow */
  });
}
