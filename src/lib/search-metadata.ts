import { hasPage, twinOf, type Page } from "@/lib/content";

export const PUBLIC_ORIGIN = "https://archive-to-studio-46.lovable.app";
const obsoletePages = new Set(["menushi", "menubob", "inicioshi", "iniciobob", "inicioshi-en", "iniciobob-en"]);

export function isSearchPage(slug: string, page: Page): boolean {
  return hasPage(slug) && !obsoletePages.has(slug) && page.blocks.some((block) =>
    block.type === "gallery" ? block.items.length > 0 : block.type === "table" ? block.rows.length > 0 : block.type === "divider" ? false : block.parts.length > 0,
  );
}

export function pageDescription(page: Page, lang: "es" | "en"): string {
  const text = page.blocks.flatMap((block) => block.type === "p" ? block.parts.map((part) => typeof part === "string" ? part : part.text) : [])
    .join(" ").replace(/\s+/g, " ").trim();
  const prefix = `${page.title} — Big-Foot de Thalek. `;
  const body = text || (lang === "en" ? "Bobtail and Shih Tzu breeding: photographs and kennel archive." : "Cría de Bobtail y Shih Tzu: fotografías y archivo del criadero.");
  return `${prefix}${body}`.slice(0, 180).trim();
}

export function pageSearchLinks(slug: string, lang: "es" | "en") {
  const url = `${PUBLIC_ORIGIN}/${encodeURIComponent(slug)}`;
  const twin = twinOf(slug);
  return [
    { rel: "canonical", href: url },
    ...(twin ? [
      { rel: "alternate", hrefLang: lang, href: url },
      { rel: "alternate", hrefLang: lang === "es" ? "en" : "es", href: `${PUBLIC_ORIGIN}/${encodeURIComponent(twin)}` },
    ] : []),
  ];
}