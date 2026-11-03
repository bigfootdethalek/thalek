import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getDogs, getBobtails, type Dog } from "@/lib/dogs";
import { inLang, type Lang } from "@/lib/content";

/** Which legacy pages show the current dog cards, and for which sex. */
export const dogPages: Record<string, "male" | "female"> = {
  "shih-tzum": "male",
  "shih-tzum-en": "male",
  "shih-tzuh": "female",
  "shih-tzuh-en": "female",
};

/** Which legacy pages show the Bobtail cards, and for which sex. */
export const bobtailPages: Record<string, "male" | "female"> = {
  "bobtailm": "male",
  "bobtailm-en": "male",
  "bobtailh": "female",
  "bobtailh-en": "female",
};

function DogCard({ dog, lang }: { dog: Dog; lang: Lang }) {
  const [i, setI] = useState(0);
  const champion = dog.name.startsWith("CH.");
  const name = dog.name.replace(/^CH\.\s*/, "");
  // Deep links like /shih-tzum#perro-1109820 scroll straight to this card.
  useEffect(() => {
    if (window.location.hash === `#perro-${dog.id}`)
      document.getElementById(`perro-${dog.id}`)?.scrollIntoView({ block: "center" });
  }, [dog.id]);
  return (
    <article id={`perro-${dog.id}`} className="overflow-hidden rounded-md border border-border bg-card shadow-soft scroll-mt-24">
      <div className="aspect-[4/5] bg-muted">
        {dog.photos[i] && (
          dog.page ? (
            <Link to="/$slug" params={{ slug: inLang(dog.page, lang) }} className="block h-full w-full">
              <img src={dog.photos[i]} alt={name} loading="lazy" className="h-full w-full object-cover" />
            </Link>
          ) : (
            <img src={dog.photos[i]} alt={name} loading="lazy" className="h-full w-full object-cover" />
          )
        )}
      </div>
      {dog.photos.length > 1 && (
        <div className="flex gap-1 p-2">
          {dog.photos.map((p, j) => (
            <Button variant="ghost" key={p} onClick={() => setI(j)} aria-label={`${name}, ${lang === "en" ? "photo" : "foto"} ${j + 1}`} aria-pressed={j === i} className={`h-12 w-12 overflow-hidden rounded border-2 p-0 ${j === i ? "border-primary" : "border-transparent"}`}>
              <img src={p} alt="" className="h-full w-full object-cover" />
            </Button>
          ))}
        </div>
      )}
      <div className="p-5">
        {champion && <p className="eyebrow text-accent">{lang === "en" ? "Champion" : dog.sex === "female" ? "Campeona" : "Campeón"}</p>}
        <h3 className="mt-1 font-display text-2xl font-semibold leading-tight text-primary">
          {dog.page ? (
            <Link to="/$slug" params={{ slug: inLang(dog.page, lang) }} className="hover:underline">
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>
        {dog.born && (
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "en" ? "Born" : dog.sex === "female" ? "Nacida" : "Nacido"} {dog.born}
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
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
          {dog.page && (
            <Link to="/$slug" params={{ slug: inLang(dog.page, lang) }} className="text-sm font-semibold text-primary hover:underline">
              {lang === "en" ? `${dog.sex === "female" ? "Her" : "His"} story →` : "Su historia →"}
            </Link>
          )}
          {dog.pedigree && (
            <a href={dog.pedigree} target="_blank" rel="noreferrer" className="text-sm font-semibold text-primary hover:underline">
              {lang === "en" ? "Full pedigree →" : "Pedigrí completo →"}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Grid of dog cards; a single dog is shown centered instead of left-aligned. */
function DogsGrid({ dogs, lang }: { dogs: Dog[]; lang: Lang }) {
  if (dogs.length === 1 && dogs[0]) {
    return (
      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-sm"><DogCard dog={dogs[0]} lang={lang} /></div>
      </div>
    );
  }
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {dogs.map((d) => <DogCard key={d.id} dog={d} lang={lang} />)}
    </div>
  );
}

export function DogGrid({ sex, lang, hasArchive = true }: { sex: "male" | "female"; lang: Lang; hasArchive?: boolean }) {
  const list = getDogs(sex);
  const retired = sex === "female" ? getDogs("female", "retired") : [];
  const memorial = getDogs(sex, "memorial");
  return (
    <section className="mb-16">
      <h2 className="font-display text-3xl font-semibold text-foreground">
        {sex === "male" ? (lang === "en" ? "Our current males" : "Nuestros machos actuales") : lang === "en" ? "Our current females" : "Nuestras hembras actuales"}
      </h2>
      <DogsGrid dogs={list} lang={lang} />
      {retired.length > 0 && (
        <>
          <h2 className="mt-16 font-display text-3xl font-semibold text-foreground">{lang === "en" ? "Our retired females" : "Nuestras hembras retiradas"}</h2>
          <DogsGrid dogs={retired} lang={lang} />
        </>
      )}
      {memorial.length > 0 && (
        <>
          <h2 className="mt-16 font-display text-3xl font-semibold text-foreground">{lang === "en" ? "In memory" : "En memoria"}</h2>
          <DogsGrid dogs={memorial} lang={lang} />
        </>
      )}
      {hasArchive && (
        <h2 className="mt-16 font-display text-3xl font-semibold text-foreground">{lang === "en" ? "From our archive" : "De nuestro archivo"}</h2>
      )}
    </section>
  );
}

export function BobtailGrid({ sex, lang, hasArchive = true }: { sex: "male" | "female"; lang: Lang; hasArchive?: boolean }) {
  const current = getBobtails(sex);
  const homage = getBobtails(sex, "homage");
  return (
    <section className="mb-16">
      <h2 className="font-display text-3xl font-semibold text-foreground">
        {sex === "male" ? (lang === "en" ? "Our male" : "Nuestro macho") : lang === "en" ? "Our females" : "Nuestras hembras"}
      </h2>
      {current.length > 0 && <DogsGrid dogs={current} lang={lang} />}
      {homage.length > 0 && (
        <>
          <h2 className="mt-16 font-display text-3xl font-semibold text-foreground">{lang === "en" ? "In memoriam" : "En homenaje"}</h2>
          <DogsGrid dogs={homage} lang={lang} />
        </>
      )}
      {hasArchive && (
        <h2 className="mt-16 font-display text-3xl font-semibold text-foreground">{lang === "en" ? "From our archive" : "De nuestro archivo"}</h2>
      )}
    </section>
  );
}
