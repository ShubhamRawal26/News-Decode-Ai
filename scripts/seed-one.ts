import { refreshCategoryNews } from "../src/lib/ai-pipeline";

async function main() {
  console.log("Seeding single category: world");
  try {
    const n = await refreshCategoryNews("world");
    console.log("Inserted:", n);
  } catch (e) {
    console.error("ERROR:", e);
  }
  process.exit(0);
}
main();
