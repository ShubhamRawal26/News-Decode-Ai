// GET /api/news/bydate?date=YYYY-MM-DD — all articles for an edition date
import { NextResponse } from "next/server";
import { getByEditionDate, getBreakingByEditionDate } from "@/lib/data";
import { isValidEditionDate } from "@/lib/dates";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || "";
  if (!isValidEditionDate(date)) {
    return NextResponse.json(
      { error: "Invalid date. Must be YYYY-MM-DD within the available range.", articles: [], breaking: [] },
      { status: 400 },
    );
  }
  const [articles, breaking] = await Promise.all([
    getByEditionDate(date, 30),
    getBreakingByEditionDate(date, 5),
  ]);
  return NextResponse.json({ date, articles, breaking, count: articles.length });
}
