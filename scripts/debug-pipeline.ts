import ZAI from "z-ai-web-dev-sdk";

async function main() {
  const zai = await ZAI.create();
  console.log("Searching web...");
  const results = await zai.functions.invoke("web_search", {
    query: "world news top stories today breaking",
    num: 6,
    recency_days: 3,
  });
  console.log("Search results count:", Array.isArray(results) ? results.length : typeof results);
  if (Array.isArray(results) && results.length > 0) {
    console.log("First result:", JSON.stringify(results[0], null, 2).slice(0, 500));
  }

  console.log("\nLLM analysis test...");
  const items = (results as any[]).slice(0, 4).map((r, i) => `${i+1}. TITLE: ${r.name}\n   SOURCE: ${r.host_name}\n   SNIPPET: ${r.snippet}`).join("\n\n");
  const completion = await zai.chat.completions.create({
    messages: [
      { role: "assistant", content: "You are an elite news analyst. Respond with STRICT valid JSON only, no markdown fences." },
      { role: "user", content: `Analyze these news items. Return JSON: { "articles": [ { "title": string, "summary": string, "whatHappened": string, "whyItMatters": string, "whoIsAffected": string, "whatHappensNext": string, "futureImpact": string, "impactScore": number, "importanceScore": number, "sentiment": string, "tags": string[], "keyEntities": string[], "isBreaking": boolean, "isFeatured": boolean, "subcategory": string, "source": string, "url": string, "date": string } ] }\n\nItems:\n${items}` },
    ],
    thinking: { type: "disabled" },
  });
  const raw = completion.choices[0]?.message?.content ?? "";
  console.log("Raw LLM response length:", raw.length);
  console.log("Raw first 600 chars:", raw.slice(0, 600));
  try {
    const cleaned = raw.replace(/^```(?:json)?/i, "").replace(/```$/i, "").trim();
    const parsed = JSON.parse(cleaned);
    console.log("Parsed articles count:", parsed.articles?.length ?? 0);
  } catch (e) {
    console.log("Parse error:", e);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
