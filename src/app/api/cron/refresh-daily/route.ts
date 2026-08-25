// POST /api/cron/refresh-daily — cron-friendly endpoint that ensures today's edition exists.
// Protect with CRON_SECRET query param or header in production.
// Example external cron:
//   curl -X POST "https://your-domain/api/cron/refresh-daily?secret=YOUR_SECRET"
import { NextResponse } from "next/server";
import { ensureDailyEdition } from "@/lib/refresh-guard";

export const dynamic = "force-dynamic";
export const maxDuration = 300; // allow up to 5 min for the full pipeline

export async function POST(req: Request) {
  // optional secret check
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const url = new URL(req.url);
    const provided = url.searchParams.get("secret") || req.headers.get("x-cron-secret");
    if (provided !== secret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }
  const result = await ensureDailyEdition(true);
  return NextResponse.json({ ...result, message: result.refreshed ? `Refreshed — ${result.total} new articles` : "Edition already up to date" });
}

export async function GET(req: Request) {
  return POST(req);
}
