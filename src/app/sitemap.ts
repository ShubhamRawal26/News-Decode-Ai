import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { CATEGORIES } from "@/lib/news";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://newsdecoded.ai";
  const staticRoutes = [
    { url: base, lastModified: new Date(), changeFrequency: "hourly" as const, priority: 1 },
    ...CATEGORIES.map((c) => ({
      url: `${base}/?c=${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.9,
    })),
  ];

  try {
    const articles = await db.article.findMany({
      select: { id: true, updatedAt: true },
      take: 500,
    });
    const articleRoutes = articles.map((a) => ({
      url: `${base}/?a=${a.id}`,
      lastModified: a.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...articleRoutes];
  } catch (error) {
    console.warn("Sitemap DB query fallback:", error);
    return staticRoutes;
  }
}
