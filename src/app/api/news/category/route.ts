// GET /api/news/category?slug=world
import { NextResponse } from "next/server";
import { getByCategory } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") || "world";
  const articles = await getByCategory(slug, 18);
  return NextResponse.json({ category: slug, articles });
}
