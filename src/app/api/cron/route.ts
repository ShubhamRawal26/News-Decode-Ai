// GET/POST /api/cron — triggers automated daily news ingestion
import { NextResponse } from "next/server";
import { refreshAllNews } from "@/lib/ai-pipeline";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const results = await refreshAllNews();
    const total = results.reduce((s, r) => s + r.inserted, 0);
    return NextResponse.json({ ok: true, timestamp: new Date().toISOString(), total, results });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function POST() {
  return GET();
}
