// GET /api/daily-brief
import { NextResponse } from "next/server";
import { generateDailyBrief } from "@/lib/ai-pipeline";

export const dynamic = "force-dynamic";

export async function GET() {
  const brief = await generateDailyBrief();
  return NextResponse.json(brief);
}
