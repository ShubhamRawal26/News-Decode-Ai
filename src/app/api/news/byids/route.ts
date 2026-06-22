// GET /api/news/byids?ids=id1,id2,...
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { toArticle } from "@/lib/data";
import { getCurrentUserId } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const idsParam = searchParams.get("ids") || "";
  const ids = idsParam.split(",").map((s) => s.trim()).filter(Boolean);
  if (ids.length === 0) return NextResponse.json({ articles: [] });

  const rows = await db.article.findMany({ where: { id: { in: ids } } });

  // preserve requested order
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

  const ordered = ids
    .map((id) => rows.find((r) => r.id === id))
    .filter(Boolean) as typeof rows;
  return NextResponse.json({ articles: ordered.map((r) => toArticle(r, savedIds)) });
}
