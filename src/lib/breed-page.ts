import { loadPage, type Lang, type Page } from "@/lib/content";

export const breedTopics = [
  { slug: "cuidados-1", es: "Cuidados", en: "Care" },
  { slug: "origen-e-historia-1", es: "Historia de la raza", en: "Breed history" },
  { slug: "standardshi", es: "Estándar", en: "Breed standard" },
  { slug: "movimiento-1", es: "Movimiento", en: "Movement" },
  { slug: "simbolismo-1", es: "Simbolismo", en: "Symbolism" },
] as const;

export type BreedSection = { id: string; title: string; page: Page };

export async function loadBreedSections(lang: Lang): Promise<BreedSection[]> {
  return Promise.all(breedTopics.map(async (topic) => {
    const slug = `${topic.slug}${lang === "en" ? "-en" : ""}`;
    const page = await loadPage(slug);
    if (!page) throw new Error(`Missing breed content: ${slug}`);
    return { id: topic.slug, title: topic[lang], page };
  }));
}