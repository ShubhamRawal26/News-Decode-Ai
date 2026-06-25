// NewsDecodedAI — AI Pipeline
// Searches the web for news per category, then uses the LLM to
// dedupe, summarize, categorize, and compute impact scores.
// z-ai-web-dev-sdk is used server-side only.

import ZAI from "z-ai-web-dev-sdk";
import { db } from "@/lib/db";
import { CATEGORIES, type CategorySlug } from "@/lib/news";
import { todayEditionDate } from "@/lib/dates";

// ---------- helpers ----------

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function estimateReadTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(2, Math.min(12, Math.round(words / 200)));
}

function safeJsonParse<T>(raw: string, fallback: T): T {
  if (!raw) return fallback;
  try {
    // strip code fences
    let cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```\s*$/i, "").trim();
    // try direct parse
    try {
      return JSON.parse(cleaned) as T;
    } catch {
      /* fall through to brace matching */
    }
    // brace-match the first {...} block
    const start = cleaned.indexOf("{");
    if (start === -1) return fallback;
    let depth = 0;
    let inStr = false;
    let esc = false;
    for (let i = start; i < cleaned.length; i++) {
      const ch = cleaned[i];
      if (esc) { esc = false; continue; }
      if (ch === "\\") { esc = true; continue; }
      if (ch === '"') { inStr = !inStr; continue; }
      if (inStr) continue;
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          const block = cleaned.slice(start, i + 1);
          return JSON.parse(block) as T;
        }
      }
    }
    return fallback;
  } catch {
    return fallback;
  }
}

// ---------- search raw news ----------

interface RawSearchItem {
  url: string;
  name: string;
  snippet: string;
  host_name: string;
  date: string;
}

async function searchCategoryNews(slug: CategorySlug): Promise<RawSearchItem[]> {
  const zai = await ZAI.create();
  const label = CATEGORIES.find((c) => c.slug === slug)!.label;
  // multiple targeted queries to get real article snippets
  const queries = [
    `${label} news today latest`,
    `${label} breaking news update this week`,
  ];
  const all: RawSearchItem[] = [];
  const seen = new Set<string>();
  for (const q of queries) {
    try {
      const results = await zai.functions.invoke("web_search", {
        query: q,
        num: 8,
        recency_days: 4,
      });
      for (const r of results as RawSearchItem[]) {
        if (!r || !r.name || !r.url || !r.snippet) continue;
        // skip homepage-only entries with weak snippets
        if (r.snippet.length < 40) continue;
        if (seen.has(r.url)) continue;
        seen.add(r.url);
        all.push(r);
      }
    } catch {
      // ignore query errors
    }
  }
  return all;
}

// ---------- LLM batch analysis ----------

interface LlmArticle {
  title: string;
  snippet: string;
  source: string;
  url: string;
  date: string;
}

interface AnalyzedArticle extends LlmArticle {
  category: string;
  subcategory: string;
  summary: string;
  whatHappened: string;
  whyItMatters: string;
  whoIsAffected: string;
  whatHappensNext: string;
  futureImpact: string;
  impactScore: number;
  importanceScore: number;
  sentiment: string;
  tags: string[];
  keyEntities: string[];
  isBreaking: boolean;
  isFeatured: boolean;
}

async function analyzeBatch(
  category: CategorySlug,
  items: LlmArticle[],
): Promise<AnalyzedArticle[]> {
  if (items.length === 0) return [];
  const zai = await ZAI.create();
  const label = CATEGORIES.find((c) => c.slug === category)!.label;

  const itemsBlock = items
    .map((it, i) => `${i + 1}. TITLE: ${it.title}\n   SOURCE: ${it.source}\n   SNIPPET: ${it.snippet}\n   URL: ${it.url}\n   DATE: ${it.date}`)
    .join("\n\n");

  const system = `You are NewsDecodedAI, an elite news intelligence engine. You analyze raw news search results and produce premium, structured intelligence.
You ALWAYS respond with STRICT valid JSON only — no prose, no markdown fences.`;

  const user = `Analyze these ${label} news items. Deduplicate stories that cover the same event (keep the best one). For each UNIQUE story, produce deep intelligence.

Input items:
${itemsBlock}

Return a JSON object: { "articles": [ ... ] } where each article has:
- title: a clear, polished headline (rewrite for clarity, no clickbait)
- snippet: original snippet (keep)
- source: source name
- url: source url
- date: original date
- subcategory: a short subcategory label (e.g. "Semiconductors", "Monetary Policy")
- summary: 2-3 sentence AI summary of what happened
- whatHappened: 1-2 sentences, factual
- whyItMatters: 2-3 sentences explaining significance and stakes
- whoIsAffected: 1-2 sentences on impacted groups
- whatHappensNext: 1-2 sentences on likely next developments
- futureImpact: 1 sentence predicting longer-term implications
- impactScore: integer 0-100 (how big the real-world impact is)
- importanceScore: integer 0-100 (how important for a reader to know)
- sentiment: one of "positive" | "neutral" | "negative" | "mixed"
- tags: array of 3-5 short tags
- keyEntities: array of 3-6 key people/orgs/companies
- isBreaking: boolean (true for fast-moving major events)
- isFeatured: boolean (true only for the single most important story in this batch)

Dedup aggressively. Return at most 6 stories. Sort by impactScore descending.`;

  const completion = await zai.chat.completions.create({
    messages: [
      { role: "assistant", content: system },
      { role: "user", content: user },
    ],
    thinking: { type: "disabled" },
  });

  const raw = completion.choices[0]?.message?.content ?? "";
  const parsed = safeJsonParse<{ articles: AnalyzedArticle[] }>(raw, { articles: [] });

  // Force category + guard
  return (parsed.articles || [])
    .filter((a) => a.title && a.summary && a.whatHappened)
    .slice(0, 6)
    .map((a) => ({
      ...a,
      category,
      impactScore: Math.max(0, Math.min(100, Math.round(a.impactScore ?? 50))),
      importanceScore: Math.max(0, Math.min(100, Math.round(a.importanceScore ?? 50))),
      tags: Array.isArray(a.tags) ? a.tags.slice(0, 6) : [],
      keyEntities: Array.isArray(a.keyEntities) ? a.keyEntities.slice(0, 8) : [],
    }));
}

// ---------- persist ----------

async function persistArticles(articles: AnalyzedArticle[]): Promise<number> {
  let inserted = 0;
  for (const a of articles) {
    const slug = `${slugify(a.title)}-${Date.now().toString(36).slice(-5)}`;
    const publishedAt = a.date && !isNaN(new Date(a.date).getTime())
      ? new Date(a.date)
      : new Date();
    try {
      await db.article.create({
        data: {
          title: a.title,
          slug,
          summary: a.summary,
          content: a.snippet,
          category: a.category,
          subcategory: a.subcategory || null,
          sourceName: a.source,
          sourceUrl: a.url,
          imageUrl: null,
          impactScore: a.impactScore,
          importanceScore: a.importanceScore,
          sentiment: a.sentiment || null,
          whatHappened: a.whatHappened,
          whyItMatters: a.whyItMatters,
          whoIsAffected: a.whoIsAffected,
          whatHappensNext: a.whatHappensNext,
          futureImpact: a.futureImpact || null,
          tags: JSON.stringify(a.tags),
          keyEntities: JSON.stringify(a.keyEntities),
          readTime: estimateReadTime(`${a.summary} ${a.whatHappened} ${a.whyItMatters}`),
          isBreaking: !!a.isBreaking,
          isFeatured: !!a.isFeatured,
          editionDate: todayEditionDate(),
          publishedAt,
        },
      });
      inserted++;
    } catch {
      // slug collision or other — skip
    }
  }
  return inserted;
}

// ---------- public entrypoints ----------

export async function refreshCategoryNews(slug: CategorySlug): Promise<number> {
  const raw = await searchCategoryNews(slug);
  const llmItems: LlmArticle[] = raw.slice(0, 12).map((r) => ({
    title: r.name,
    snippet: r.snippet,
    source: r.host_name,
    url: r.url,
    date: r.date,
  }));
  let analyzed = await analyzeBatch(slug, llmItems);

  // Fallback: if LLM produced nothing, synthesize lightweight articles from raw search
  // so the UI is never empty. These still get stored with basic structure.
  if (analyzed.length === 0 && llmItems.length > 0) {
    analyzed = llmItems.slice(0, 5).map((it, idx) => ({
      title: it.title.length > 110 ? it.title.slice(0, 107) + "..." : it.title,
      snippet: it.snippet,
      source: it.source,
      url: it.url,
      date: it.date,
      category: slug,
      subcategory: "General",
      summary: it.snippet,
      whatHappened: it.snippet,
      whyItMatters: "This development is part of today's evolving story landscape and may influence related sectors.",
      whoIsAffected: "Investors, policymakers and the public following this space.",
      whatHappensNext: "Further updates are expected as the story develops.",
      futureImpact: "Continued monitoring is recommended to assess long-term implications.",
      impactScore: 55 + (idx === 0 ? 10 : 0),
      importanceScore: 55 + (idx === 0 ? 10 : 0),
      sentiment: "neutral",
      tags: [slug],
      keyEntities: [],
      isBreaking: idx === 0,
      isFeatured: idx === 0,
    }));
  }

  return persistArticles(analyzed);
}

export async function refreshAllNews(): Promise<{ category: string; inserted: number }[]> {
  const results: { category: string; inserted: number }[] = [];
  for (const cat of CATEGORIES) {
    try {
      const inserted = await refreshCategoryNews(cat.slug);
      results.push({ category: cat.slug, inserted });
    } catch (e) {
      results.push({ category: cat.slug, inserted: 0 });
    }
  }
  return results;
}

// Generate a synthesized daily brief using the top stories of the day.
export async function generateDailyBrief(): Promise<{ headline: string; summary: string }> {
  const zai = await ZAI.create();
  const top = await db.article.findMany({
    orderBy: [{ impactScore: "desc" }, { publishedAt: "desc" }],
    take: 8,
  });
  if (top.length === 0) {
    return {
      headline: "Your daily intelligence briefing is warming up.",
      summary: "Our AI is scanning thousands of sources right now. Check back in a moment for today's most important stories.",
    };
  }
  const block = top
    .map((a, i) => `${i + 1}. [${a.category}] ${a.title} — ${a.summary} (impact ${a.impactScore})`)
    .join("\n");

  const completion = await zai.chat.completions.create({
    messages: [
      {
        role: "assistant",
        content: "You are NewsDecodedAI's chief intelligence analyst. Produce a crisp, premium morning brief. Respond with STRICT JSON only: {\"headline\": string, \"summary\": string}.",
      },
      {
        role: "user",
        content: `Today's top stories:\n${block}\n\nWrite a punchy 6-12 word headline capturing the through-line of today, and a 3-4 sentence executive summary that weaves the stories together. JSON only.`,
      },
    ],
    thinking: { type: "disabled" },
  });
  const raw = completion.choices[0]?.message?.content ?? "";
  return safeJsonParse(raw, {
    headline: "Today's intelligence briefing",
    summary: "Here are the stories shaping the world today.",
  });
}
