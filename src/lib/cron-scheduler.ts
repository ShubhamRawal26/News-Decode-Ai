// NewsDecodedAI — Automated 6:00 AM Daily Ingestion Scheduler
import { refreshAllNews } from "@/lib/ai-pipeline";
import { todayEditionDate } from "@/lib/dates";
import { getFirebaseArticles } from "@/lib/firebase/news-data";

let schedulerInitialized = false;

function msUntilNext6AM(): number {
  const now = new Date();
  const next6AM = new Date();
  next6AM.setHours(6, 0, 0, 0);

  if (now.getTime() >= next6AM.getTime()) {
    next6AM.setDate(next6AM.getDate() + 1);
  }

  return next6AM.getTime() - now.getTime();
}

export async function runDailyMorningTask() {
  console.log(`[Cron Scheduler] ⏰ 6:00 AM Daily Ingestion triggered at ${new Date().toISOString()}`);
  try {
    const results = await refreshAllNews();
    const total = results.reduce((s, r) => s + r.inserted, 0);
    console.log(`[Cron Scheduler] ✔ 6:00 AM Daily Ingestion complete! Ingested ${total} new stories.`);
  } catch (e) {
    console.error("[Cron Scheduler] ❌ Failed to run 6:00 AM news ingestion:", e);
  }
}

export function initDailyNewsCron() {
  if (schedulerInitialized) return;
  schedulerInitialized = true;

  console.log("[Cron Scheduler] Initializing automated daily news pipeline...");

  setTimeout(async () => {
    try {
      const today = todayEditionDate();
      const all = await getFirebaseArticles();
      const count = all.filter((a) => a.publishedAt && a.publishedAt.startsWith(today)).length;
      if (count < 5) {
        console.log(`[Cron Scheduler] Today's edition (${today}) has only ${count} articles. Running initial ingestion...`);
        await runDailyMorningTask();
      } else {
        console.log(`[Cron Scheduler] Today's edition (${today}) already has ${count} articles active in Firebase.`);
      }
    } catch {
      /* ignore warmup errors */
    }
  }, 3000);

  const delay = msUntilNext6AM();
  const hoursUntil = (delay / (1000 * 60 * 60)).toFixed(2);
  console.log(`[Cron Scheduler] Next 6:00 AM scheduled in ${hoursUntil} hours.`);

  setTimeout(async () => {
    await runDailyMorningTask();
    setInterval(async () => {
      await runDailyMorningTask();
    }, 24 * 60 * 60 * 1000);
  }, delay);
}
