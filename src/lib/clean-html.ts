// NewsDecodedAI — Bulletproof HTML Entity Decoder and Text Sanitizer

export function decodeHtmlEntities(raw: string): string {
  if (!raw) return "";
  return raw
    // Numerical decimal entities (e.g. &#8216;, &#8217;, &#39;)
    .replace(/&#(\d+);?/g, (_, dec) => {
      try {
        return String.fromCharCode(Number(dec));
      } catch {
        return "";
      }
    })
    // Numerical hex entities (e.g. &#x2018;, &#x27;)
    .replace(/&#x([0-9a-fA-F]+);?/g, (_, hex) => {
      try {
        return String.fromCharCode(parseInt(hex, 16));
      } catch {
        return "";
      }
    })
    // Named whitespace and punctuation
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#39;|&#x27;/gi, "'")
    .replace(/&lsquo;|&rsquo;|&#8216;|&#8217;/gi, "'")
    .replace(/&ldquo;|&rdquo;|&#8220;|&#8221;/gi, '"')
    .replace(/&hellip;|&#8230;/gi, "...")
    .replace(/&mdash;|&#8212;/gi, "—")
    .replace(/&ndash;|&#8211;/gi, "–")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&cent;/gi, "¢")
    .replace(/&pound;/gi, "£")
    .replace(/&yen;/gi, "¥")
    .replace(/&euro;/gi, "€")
    .replace(/&copy;/gi, "©")
    .replace(/&reg;/gi, "®")
    .replace(/&trade;/gi, "™");
}

export function cleanHtml(raw: string): string {
  if (!raw) return "";
  // Strip any embedded HTML tags
  let text = raw.replace(/<[^>]*>/g, " ");
  // Decode HTML entities
  text = decodeHtmlEntities(text);
  // Run once more to catch double-encoded entities (e.g. &amp;#8216;)
  text = decodeHtmlEntities(text);
  // Clean up excessive whitespace
  return text.replace(/\s+/g, " ").trim();
}
