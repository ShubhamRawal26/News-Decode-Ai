// POST /api/news/recommend  { followedTopics: string[], readIds: string[] }
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toArticle } from "@/lib/data";
import { getCurrentUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

function parseArr(s: string | null): string[] {
  if (!s) return [];
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  const { followedTopics = [], readIds = [] } = await req.json().catch(() => ({}));
  const readSet = new Set(readIds as string[]);

  const candidates = await db.article.findMany({
    orderBy: [{ publishedAt: "desc" }],
    take: 50,
  });

  const scored = candidates
    .filter((a) => !readSet.has(a.id))
    .map((a) => {
      const tags = parseArr(a.tags);
      const overlap = tags.filter((t) => followedTopics.includes(t)).length;
      return { a, score: overlap * 12 + a.impactScore * 0.5 + a.importanceScore * 0.3 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((s) => s.a);

  let savedIds: Set<string> | undefined;
  try {
    const uid = await getCurrentUserId();
    const saved = await db.savedArticle.findMany({
      where: { userId: uid },
      select: { articleId: true },
    });
    savedIds = new Set(saved.map((s) => s.articleId));
  } catch {
    savedIds = new Set();
  }

  return NextResponse.json({ recommendations: scored.map((r) => toArticle(r, savedIds)) });
}
