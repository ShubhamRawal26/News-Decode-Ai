export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initDailyNewsCron } = await import("@/lib/cron-scheduler");
    initDailyNewsCron();
  }
}
