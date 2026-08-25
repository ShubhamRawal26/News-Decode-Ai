import { refreshAllNews } from "../src/lib/ai-pipeline";

async function main() {
  console.log("==================================================");
  console.log(" NewsDecodedAI — Live AI News Pipeline Ingestion ");
  console.log("==================================================");
  console.log("Fetching live RSS feeds & synthesizing intelligence with AI...");

  const startTime = Date.now();
  const results = await refreshAllNews();
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log("\n--- Ingestion Results ---");
  let total = 0;
  for (const r of results) {
    console.log(`• [${r.category.toUpperCase()}] Added ${r.inserted} decoded stories`);
    total += r.inserted;
  }

  console.log(`\n✔ Completed in ${duration}s. Total stories ingested: ${total}`);
  console.log("Open http://localhost:3000 to see your new decoded stories!");
}

main()
  .catch((e) => {
    console.error("Error running AI pipeline:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
