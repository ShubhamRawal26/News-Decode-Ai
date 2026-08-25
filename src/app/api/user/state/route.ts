// GET /api/user/state — saved ids + followed topics + history (lightweight)
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const uid = await getCurrentUserId();
  const [saved, followed, history] = await Promise.all([
    db.savedArticle.findMany({ where: { userId: uid }, select: { articleId: true } }),
    db.followedTopic.findMany({ where: { userId: uid }, select: { topic: true } }),
    db.readingHistory.findMany({
      where: { userId: uid },
      orderBy: { readAt: "desc" },
      take: 12,
      select: { articleId: true },
    }),
  ]);
  return NextResponse.json({
    savedIds: saved.map((s) => s.articleId),
    followedTopics: followed.map((f) => f.topic),
    historyIds: history.map((h) => h.articleId),
  });
}
