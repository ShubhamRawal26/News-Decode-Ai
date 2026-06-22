// GET /api/news/search?q=...
import { NextResponse } from "next/server";
import { searchArticles } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (!q) return NextResponse.json({ results: [] });
  const results = await searchArticles(q, 24);
  return NextResponse.json({ results });
}
