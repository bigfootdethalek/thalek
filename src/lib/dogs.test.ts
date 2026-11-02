import { describe, expect, it } from "vitest";
import dogs from "@/content/cdf-dogs.json";
import { getDogs } from "./dogs";

describe("Combined breeder lists", () => {
  it("keeps each source dog only once across both imported lists", () => {
    expect(new Set(dogs.map(dog => dog.id)).size).toBe(dogs.length);
  });

  it("adds both retired females without presenting them as current", () => {
    expect(getDogs("female", "retired").map(dog => dog.id).sort()).toEqual(["1017897", "1218031"]);
    expect(getDogs("female").some(dog => ["1017897", "1218031"].includes(dog.id))).toBe(false);
  });

  it("combines every missing memorial dog on the corresponding sex's page", () => {
    const imported = [...getDogs("female", "memorial"), ...getDogs("male", "memorial")];
    expect(imported.map(dog => dog.id).sort()).toEqual([
      "1156009", "1218036", "890089", "908052", "908058", "941206", "993224", "993229",
      "993233", "993245", "993311", "993315", "993319", "993321", "993323",
    ].sort());
    expect([...getDogs("female"), ...getDogs("male")].some(dog => imported.some(item => item.id === dog.id))).toBe(false);
  });
});