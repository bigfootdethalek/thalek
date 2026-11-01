import { useState } from "react";
import dogs from "@/content/cdf-dogs.json";
import type { Lang } from "@/lib/content";

type Dog = (typeof dogs)[number];

const sortKey = (d: Dog) => (d.born ? d.born.split("/").reverse().join("") : "0");

/** Which legacy pages show the current dog cards, and for which sex. */
export const dogPages: Record<string, "male" | "female"> = {
  "shih-tzum": "male",
  "shih-tzum-en": "male",
  "shih-tzuh": "female",
  "shih-tzuh-en": "female",
};

function DogCard({ dog, lang }: { dog: Dog; lang: Lang }) {
  const [i, setI] = useState(0);
  const champion = dog.name.startsWith("CH.");
  const name = dog.name.replace(/^CH\.\s*/, "");
  return (
    <article className="overflow-hidden rounded-md border border-border bg-card shadow-soft">
      <div className="aspect-[4/5] bg-muted">
        {dog.photos[i] && <img src={dog.photos[i]} alt={name} loading="lazy" className="h-full w-full object-cover" />}
      </div>
      {dog.photos.length > 1 && (
        <div className="flex gap-1 p-2">
          {dog.photos.map((p, j) => (
            <button key={p} onClick={() => setI(j)} className={`h-12 w-12 overflow-hidden rounded border-2 ${j === i ? "border-primary" : "border-transparent"}`}>
              <img src={p} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="p-5">
        {champion && <p className="eyebrow text-accent">{lang === "en" ? "Champion" : "Campeón"}</p>}
        <h3 className="mt-1 font-display text-2xl font-semibold leading-tight text-primary">{name}</h3>
        {dog.born && (
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "en" ? "Born" : "Nacido"} {dog.born}
          </p>
        )}
        {(dog.sire || dog.dam) && (
          <dl className="mt-3 space-y-1 text-sm">
            {dog.sire && (
              <div><dt className="inline font-semibold">{lang === "en" ? "Sire: " : "Padre: "}</dt><dd className="inline">{dog.sire}</dd></div>
            )}
            {dog.dam && (
              <div><dt className="inline font-semibold">{lang === "en" ? "Dam: " : "Madre: "}</dt><dd className="inline">{dog.dam}</dd></div>
            )}
          </dl>
        )}
        <a href={dog.pedigree} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
          {lang === "en" ? "Full pedigree →" : "Pedigrí completo →"}
        </a>
      </div>
    </article>
  );
}

export function DogGrid({ sex, lang }: { sex: "male" | "female"; lang: Lang }) {
  const list = dogs.filter((d) => d.sex === sex).sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
  return (
    <section className="mb-16">
      <h2 className="font-display text-3xl font-semibold text-foreground">
        {sex === "male" ? (lang === "en" ? "Our current males" : "Nuestros machos actuales") : lang === "en" ? "Our current females" : "Nuestras hembras actuales"}
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((d) => <DogCard key={d.id} dog={d} lang={lang} />)}
      </div>
      <h2 className="mt-16 font-display text-3xl font-semibold text-foreground">{lang === "en" ? "From our archive" : "De nuestro archivo"}</h2>
    </section>
  );
}
