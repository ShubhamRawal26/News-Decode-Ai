// Seed NewsDecodedAI with initial news via the AI pipeline.
// Run: bun run scripts/seed.ts
import { refreshAllNews } from "../src/lib/ai-pipeline";

async function main() {
  console.log("Seeding NewsDecodedAI...");
  const results = await refreshAllNews();
  let total = 0;
  for (const r of results) {
    console.log(`  ${r.category}: ${r.inserted} articles`);
    total += r.inserted;
  }
  console.log(`Done. Total articles seeded: ${total}`);
  process.exit(0);
}

main().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
