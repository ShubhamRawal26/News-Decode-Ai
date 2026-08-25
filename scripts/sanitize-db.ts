import { db } from "../src/lib/db";
import { cleanHtml } from "../src/lib/clean-html";

async function main() {
  console.log("Sanitizing all existing articles in database...");
  const articles = await db.article.findMany();
  console.log(`Found ${articles.length} articles to sanitize.`);

  let updated = 0;
  for (const a of articles) {
    const title = cleanHtml(a.title);
    const summary = cleanHtml(a.summary);
    const whatHappened = cleanHtml(a.whatHappened);
    const whyItMatters = cleanHtml(a.whyItMatters);
    const whoIsAffected = cleanHtml(a.whoIsAffected);
    const whatHappensNext = cleanHtml(a.whatHappensNext);
    const futureImpact = a.futureImpact ? cleanHtml(a.futureImpact) : null;
    const sourceName = cleanHtml(a.sourceName);
    const subcategory = a.subcategory ? cleanHtml(a.subcategory) : null;

    if (
      title !== a.title ||
      summary !== a.summary ||
      whatHappened !== a.whatHappened ||
      whyItMatters !== a.whyItMatters
    ) {
      await db.article.update({
        where: { id: a.id },
        data: {
          title,
          summary,
          whatHappened,
          content: whatHappened,
          whyItMatters,
          whoIsAffected,
          whatHappensNext,
          futureImpact,
          sourceName,
          subcategory,
        },
      });
      updated++;
    }
  }

  console.log(`✔ Finished! Sanitized and cleaned ${updated} articles.`);
}

main()
  .catch((e) => {
    console.error("Sanitize failed:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
