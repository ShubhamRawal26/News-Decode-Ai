// GET /api/news/[id] — article detail + related
import { NextResponse } from "next/server";
import { getArticleById, getRelated } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const related = await getRelated(article, 3);
  // Reading history is now recorded client-side to Firebase (for signed-in users).
  return NextResponse.json({ article, related });
}
