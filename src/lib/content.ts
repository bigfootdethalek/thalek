import index from "@/content/index.json";

export type Part = string | { text: string; to?: string; href?: string; dog?: string };
export type Block =
  | { type: "p"; parts: Part[] }
  | { type: "table"; headers: string[]; rows: Part[][][] }
  | { type: "gallery"; items: { type: "img"; src: string; to?: string; dog?: string }[] };
export type Page = { file: string; title: string; lang: "es" | "en"; blocks: Block[] };
export type Lang = "es" | "en";

type IndexEntry = { t: string; l: Lang; i: string | null };
export const pageIndex = index as Record<string, IndexEntry>;

const loaders = import.meta.glob<{ default: Page }>("../content/pages/*.json");

export function hasPage(slug: string) {
  return slug in pageIndex;
}

export async function loadPage(slug: string): Promise<Page | null> {
  const loader = loaders[`../content/pages/${slug}.json`];
  if (!loader) return null;
  return (await loader()).default;
}

export function legacySrc(src: string) {
  if (src.startsWith("/") || src.startsWith("http")) return src;
  return "/legacy/" + src.split("/").map(encodeURIComponent).join("/");
}

export function langOf(slug: string): Lang {
  return pageIndex[slug]?.l ?? (slug.endsWith("-en") ? "en" : "es");
}

/** Counterpart page in the other language, if it exists. */
export function twinOf(slug: string): string | null {
  const t = slug.endsWith("-en") ? slug.slice(0, -3) : `${slug}-en`;
  return hasPage(t) ? t : null;
}

/** Link to a page in the requested language, falling back to the original. */
export function inLang(slug: string, lang: Lang) {
  if (lang === "en" && hasPage(`${slug}-en`)) return `${slug}-en`;
  return slug;
}

export type NavGroup = { label: Record<Lang, string>; items: { label: Record<Lang, string>; slug: string }[] };

const l = (es: string, en: string) => ({ es, en });

export const nav: NavGroup[] = [
  {
    label: l("Nosotros", "About us"),
    items: [
      { label: l("Historia", "Our story"), slug: "criadero" },
      { label: l("La familia", "The family"), slug: "mis-perros" },
      { label: l("Entrevista", "Interview"), slug: "entrevista" },
      { label: l("Agradecimiento", "Thanks"), slug: "agradecimiento" },
      { label: l("Homenaje", "Tribute"), slug: "homenaje" },
    ],
  },
  {
    label: l("Shih Tzu", "Shih Tzu"),
    items: [
      { label: l("Machos", "Males"), slug: "shih-tzum" },
      { label: l("Hembras", "Females"), slug: "shih-tzuh" },
      { label: l("En el mundo", "Around the world"), slug: "shih-tzuw" },
      { label: l("Camada actual", "Current litter"), slug: "cachorroshihtzuact" },
      { label: l("La raza", "The breed"), slug: "razashi" },
      { label: l("Cuidados", "Care"), slug: "cuidados-1" },
      { label: l("Historia de la raza", "Breed history"), slug: "origen-e-historia-1" },
      { label: l("Standard", "Standard"), slug: "standardshi" },
      { label: l("Movimiento", "Movement"), slug: "movimiento-1" },
      { label: l("Simbolismo", "Symbolism"), slug: "simbolismo-1" },
    ],
  },
  {
    label: l("Bobtail", "Bobtail"),
    items: [
      { label: l("Macho", "Male"), slug: "bobtailm" },
      { label: l("Hembras", "Females"), slug: "bobtailh" },
      { label: l("En el mundo", "Around the world"), slug: "bobtailw" },
      { label: l("Camada actual", "Current litter"), slug: "cachorrobobtailact" },
      { label: l("Camadas anteriores", "Previous litters"), slug: "cachorrobobtailant" },
      { label: l("La raza", "The breed"), slug: "razabob" },
      { label: l("Cuidados", "Care"), slug: "cuidados" },
      { label: l("Historia de la raza", "Breed history"), slug: "origen-e-histora" },
      { label: l("Standard", "Standard"), slug: "standardbob" },
    ],
  },
  {
    label: l("Noticias", "News"),
    items: [
      { label: l("Noticias", "News"), slug: "noticias" },
      { label: l("Campeones", "Champions"), slug: "campeones" },
      { label: l("Handler", "Handler"), slug: "handler" },
      { label: l("Actualizaciones", "Site updates"), slug: "actualizacionweb" },
    ],
  },
].map((g) => ({ ...g, items: g.items.filter((i) => hasPage(i.slug)) }));
