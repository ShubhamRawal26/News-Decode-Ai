// GET /api/dashboard — personalized dashboard
import { NextResponse } from "next/server";
import {
  getSavedArticles,
  getReadingHistory,
  getRecommendations,
  getTrendingTopics,
  getLatestArticles,
} from "@/lib/data";
import { generateDailyBrief } from "@/lib/ai-pipeline";

export const dynamic = "force-dynamic";

export async function GET() {
  const [saved, history, recommendations, trending, latest] = await Promise.all([
    getSavedArticles(12),
    getReadingHistory(12),
    getRecommendations(6),
    getTrendingTopics(),
    getLatestArticles(6),
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
    saved,
    trendingTopics: trending,
    recommendations: recommendations.length ? recommendations : latest,
    readingHistory: history,
  });
}
