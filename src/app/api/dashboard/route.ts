// GET /api/dashboard — generic dashboard data (brief, trending, latest).
// User-specific data (saved/history/recommendations) is now assembled client-side
// from Firebase Realtime DB + the /api/news/byids and /api/news/recommend endpoints.
import { NextResponse } from "next/server";
import { getLatestArticles, getTrendingTopics } from "@/lib/data";
import { generateDailyBrief } from "@/lib/ai-pipeline";

export const dynamic = "force-dynamic";

export async function GET() {
  const [latest, trending] = await Promise.all([
    getLatestArticles(6),
    getTrendingTopics(),
  ]);

  let brief;
  try {
    brief = await generateDailyBrief();
  } catch {
    brief = {
      headline: "Your daily intelligence briefing",
      summary: "Here are today's most important stories, decoded by AI.",
    };
  }

  return NextResponse.json({
    dailyBrief: { ...brief, topStories: latest },
    trendingTopics: trending,
    latest,
  });
}
