// POST /api/user/save  { articleId }
import { NextResponse } from "next/server";
import { toggleSave } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { articleId } = await req.json();
  if (!articleId) return NextResponse.json({ error: "articleId required" }, { status: 400 });
  const saved = await toggleSave(articleId);
  return NextResponse.json({ saved });
}
