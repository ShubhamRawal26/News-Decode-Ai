// Date helpers for NewsDecodedAI.
// Edition dates are computed in Asia/Kolkata (the user's timezone) so the
// "daily edition" aligns with the reader's calendar day, not the server's UTC clock.

export const EDITION_TZ = "Asia/Kolkata";
export const EDITION_START = "2025-06-20"; // the platform launched June 20, 2025

/** Returns today's edition date as YYYY-MM-DD in Asia/Kolkata. */
export function todayEditionDate(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: EDITION_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Parse a YYYY-MM-DD string into a human label, e.g. "June 22, 2025". */
export function formatEditionDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return dateStr;
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("en-US", {
    timeZone: EDITION_TZ,
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/** Short label e.g. "Jun 22". */
export function formatEditionDateShort(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return dateStr;
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("en-US", {
    timeZone: EDITION_TZ,
    month: "short",
    day: "numeric",
  }).format(date);
}

/** Day-of-week label e.g. "Sunday". */
export function editionDayOfWeek(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return "";
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("en-US", {
    timeZone: EDITION_TZ,
    weekday: "long",
  }).format(date);
}

/** Returns the list of edition date strings from EDITION_START up to today (inclusive). */
export function editionDateRange(now: Date = new Date()): string[] {
  const out: string[] = [];
  const [sy, sm, sd] = EDITION_START.split("-").map(Number);
  const start = new Date(Date.UTC(sy, sm - 1, sd));
  const today = todayEditionDate(now);
  const [ty, tm, td] = today.split("-").map(Number);
  const end = new Date(Date.UTC(ty, tm - 1, td));
  const cur = new Date(start);
  while (cur <= end) {
    out.push(
      `${cur.getUTCFullYear()}-${String(cur.getUTCMonth() + 1).padStart(2, "0")}-${String(cur.getUTCDate()).padStart(2, "0")}`,
    );
    cur.setUTCDate(cur.getUTCDate() + 1);
  }
  return out;
}

/** Validate a YYYY-MM-DD string and check it's within [EDITION_START, today]. */
export function isValidEditionDate(dateStr: string, now: Date = new Date()): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!m) return false;
  const y = +m[1], mo = +m[2], d = +m[3];
  const date = new Date(Date.UTC(y, mo - 1, d));
  if (isNaN(date.getTime())) return false;
  const [sy, sm, sd] = EDITION_START.split("-").map(Number);
  const start = new Date(Date.UTC(sy, sm - 1, sd));
  const today = todayEditionDate(now);
  const [ty, tm, td] = today.split("-").map(Number);
  const end = new Date(Date.UTC(ty, tm - 1, td));
  return date >= start && date <= end;
}
