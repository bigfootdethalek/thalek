import { describe, expect, it } from "vitest";
import { loadBreedSections } from "@/lib/breed-page";
import { loadPage } from "@/lib/content";

describe("Unified breed content", () => {
  for (const lang of ["es", "en"] as const) {
    it(`keeps all five complete original sections in ${lang}`, async () => {
      const sections = await loadBreedSections(lang);
      expect(sections.map(section => section.id)).toEqual([
        "cuidados-1", "origen-e-historia-1", "standardshi", "movimiento-1", "simbolismo-1",
      ]);
      for (const section of sections) {
        const original = await loadPage(`${section.id}${lang === "en" ? "-en" : ""}`);
        expect(section.page.blocks).toEqual(original?.blocks);
        expect(section.page.blocks.length).toBeGreaterThan(0);
      }
    });
  }
});