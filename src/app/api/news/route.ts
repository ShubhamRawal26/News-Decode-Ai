// GET /api/news — latest edition feed + breaking + featured + trending
// Also triggers a lazy background refresh if today's edition is missing.
import { NextResponse } from "next/server";
import {
  getLatestEditionArticles,
  getBreakingNews,
  getFeaturedArticles,
  getTrendingTopics,
} from "@/lib/data";
import { triggerBackgroundEditionRefresh, hasTodayEdition } from "@/lib/refresh-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [edition, breaking, featured, trending] = await Promise.all([
      getLatestEditionArticles(24),
      getBreakingNews(5),
      getFeaturedArticles(6),
      getTrendingTopics(),
    ]);

    // Lazy auto-refresh: if today has no edition yet, kick off a background refresh.
    // We don't await it — the response returns immediately with the latest available edition.
    hasTodayEdition()
      .then((has) => {
        if (!has) triggerBackgroundEditionRefresh();
      })
      .catch(() => {});

    return NextResponse.json({
      latest: edition.articles,
      editionDate: edition.date,
      hasTodayEdition: edition.date === new Date().toISOString().slice(0, 10),
      breaking,
      featured,
      trending,
    });
  } catch {
    return NextResponse.json({ latest: [], breaking: [], featured: [], trending: [] }, { status: 200 });
  }
}
