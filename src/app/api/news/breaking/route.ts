// GET /api/news/breaking
import { NextResponse } from "next/server";
import { getBreakingNews } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const breaking = await getBreakingNews(6);
  return NextResponse.json({ breaking });
}
