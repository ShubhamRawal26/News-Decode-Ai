import { PrismaClient } from "@prisma/client";
import { DEMO_ARTICLES } from "../src/lib/demo-data";
import { todayEditionDate } from "../src/lib/dates";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding NewsDecodedAI with high-quality curated demo news...");

  const today = todayEditionDate();

  for (const article of DEMO_ARTICLES) {
    await prisma.article.upsert({
      where: { id: article.id },
      update: {
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        category: article.category,
        subcategory: article.subcategory,
        sourceName: article.sourceName,
        sourceUrl: article.sourceUrl,
        imageUrl: article.imageUrl,
        impactScore: article.impactScore,
        importanceScore: article.importanceScore,
        sentiment: article.sentiment,
        whatHappened: article.whatHappened,
        whyItMatters: article.whyItMatters,
        whoIsAffected: article.whoIsAffected,
        whatHappensNext: article.whatHappensNext,
        futureImpact: article.futureImpact,
        tags: JSON.stringify(article.tags),
        keyEntities: JSON.stringify(article.keyEntities || []),
        readTime: article.readTime,
        isBreaking: article.isBreaking,
        isFeatured: article.isFeatured,
        editionDate: today,
        publishedAt: new Date(article.publishedAt),
      },
      create: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        category: article.category,
        subcategory: article.subcategory,
        sourceName: article.sourceName,
        sourceUrl: article.sourceUrl,
        imageUrl: article.imageUrl,
        impactScore: article.impactScore,
        importanceScore: article.importanceScore,
        sentiment: article.sentiment,
        whatHappened: article.whatHappened,
        whyItMatters: article.whyItMatters,
        whoIsAffected: article.whoIsAffected,
        whatHappensNext: article.whatHappensNext,
        futureImpact: article.futureImpact,
        tags: JSON.stringify(article.tags),
        keyEntities: JSON.stringify(article.keyEntities || []),
        readTime: article.readTime,
        isBreaking: article.isBreaking,
        isFeatured: article.isFeatured,
        editionDate: today,
        publishedAt: new Date(article.publishedAt),
      },
    });
  }

  const count = await prisma.article.count();
  console.log(`✅ Seeding complete! Database now has ${count} articles across all categories.`);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
