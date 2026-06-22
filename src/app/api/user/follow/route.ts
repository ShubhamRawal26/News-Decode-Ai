// POST /api/user/follow  { topic }
import { NextResponse } from "next/server";
import { toggleFollowTopic } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { topic } = await req.json();
  if (!topic) return NextResponse.json({ error: "topic required" }, { status: 400 });
  const followed = await toggleFollowTopic(topic);
  return NextResponse.json({ followed });
}
