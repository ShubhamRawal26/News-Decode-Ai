// GET /api/news/dates — available edition dates (newest first) + today + range info
import { NextResponse } from "next/server";
import { getAvailableEditionDates } from "@/lib/data";
import { todayEditionDate, EDITION_START, editionDateRange } from "@/lib/dates";

export const dynamic = "force-dynamic";

export async function GET() {
  const available = await getAvailableEditionDates();
  const today = todayEditionDate();
  const all = editionDateRange(); // [EDITION_START .. today]
  return NextResponse.json({
    available, // dates that actually have articles
    today,
    start: EDITION_START,
    range: all, // every valid selectable date
  });
}
