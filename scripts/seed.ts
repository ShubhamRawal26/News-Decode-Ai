// NewsDecodedAI — Firebase Seed Script
// Seeds curated articles directly into Firebase Realtime Database without Prisma or SQL.

import { DEMO_ARTICLES } from "../src/lib/demo-data";
import { seedFirebaseDatabase } from "../src/lib/firebase/news-data";

async function main() {
  console.log("🌱 Seeding NewsDecodedAI directly into Firebase Realtime Database...");

  const count = await seedFirebaseDatabase(DEMO_ARTICLES);
  console.log(`✅ Firebase Seeding complete! Ingested ${count} articles into Firebase.`);
}

main().catch((e) => {
  console.error("❌ Seed failed:", e);
  process.exit(1);
});
