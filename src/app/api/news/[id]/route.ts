// GET /api/news/[id] — article detail + related + records reading
import { NextResponse } from "next/server";
import { getArticleById, getRelated, recordReading } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const related = await getRelated(article, 3);
  // fire-and-forget reading record
  recordReading(id).catch(() => {});
  return NextResponse.json({ article, related });
}
