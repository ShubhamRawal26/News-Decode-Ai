// GET /api/news — latest feed + breaking + featured
import { NextResponse } from "next/server";
import { getLatestArticles, getBreakingNews, getFeaturedArticles, getTrendingTopics } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [latest, breaking, featured, trending] = await Promise.all([
      getLatestArticles(24),
      getBreakingNews(5),
      getFeaturedArticles(6),
      getTrendingTopics(),
    ]);
    return NextResponse.json({ latest, breaking, featured, trending });
  } catch {
    return NextResponse.json({ latest: [], breaking: [], featured: [], trending: [] }, { status: 200 });
  }
}
