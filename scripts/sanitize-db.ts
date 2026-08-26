import { getFirebaseArticles, saveArticleToFirebase } from "../src/lib/firebase/news-data";
import { cleanHtml } from "../src/lib/clean-html";

async function main() {
  console.log("Sanitizing all existing articles in Firebase...");
  const articles = await getFirebaseArticles();
  console.log(`Found ${articles.length} articles to sanitize.`);

  let updated = 0;
  for (const a of articles) {
    const title = cleanHtml(a.title);
    const summary = cleanHtml(a.summary);
    const whatHappened = cleanHtml(a.whatHappened);
    const whyItMatters = cleanHtml(a.whyItMatters);

    if (title !== a.title || summary !== a.summary || whatHappened !== a.whatHappened) {
      await saveArticleToFirebase({
        ...a,
        title,
        summary,
        whatHappened,
        whyItMatters,
      });
      updated++;
    }
  }

  console.log(`✔ Finished! Sanitized ${updated} articles in Firebase.`);
}

main().catch((e) => {
  console.error("Sanitize failed:", e);
  process.exit(1);
});
