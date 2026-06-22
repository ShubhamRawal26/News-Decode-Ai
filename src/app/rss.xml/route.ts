import { db } from "@/lib/db";
import { CATEGORY_LABELS } from "@/lib/news";

export const dynamic = "force-dynamic";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const articles = await db.article.findMany({
    orderBy: { publishedAt: "desc" },
    take: 50,
  });

  const items = articles
    .map(
      (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>https://newsdecoded.ai/?a=${a.id}</link>
      <guid isPermaLink="true">https://newsdecoded.ai/?a=${a.id}</guid>
      <pubDate>${new Date(a.publishedAt).toUTCString()}</pubDate>
      <category>${escapeXml(CATEGORY_LABELS[a.category] || a.category)}</category>
      <description>${escapeXml(a.summary)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NewsDecodedAI — Understand What Actually Matters</title>
    <link>https://newsdecoded.ai</link>
    <description>AI scans thousands of sources and explains the world's most important stories in minutes.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://newsdecoded.ai/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
    },
  });
}
