// POST /api/news/refresh — triggers AI pipeline (admin/seed)
import { NextResponse } from "next/server";
import { refreshAllNews } from "@/lib/ai-pipeline";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const results = await refreshAllNews();
    const total = results.reduce((s, r) => s + r.inserted, 0);
    return NextResponse.json({ ok: true, total, results });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}
