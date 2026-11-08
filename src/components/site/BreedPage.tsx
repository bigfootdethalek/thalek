import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageBody } from "@/components/site/PageBody";
import type { BreedSection } from "@/lib/breed-page";
import type { Lang } from "@/lib/content";
import photo from "@/assets/faq/shihtzu-blanco-narcisos.jpg.asset.json";

export function BreedPage({ lang, sections }: { lang: Lang; sections: BreedSection[] }) {
  return (
    <main>
      <section className="border-b border-border bg-turquoise/10">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-5 py-10 sm:grid-cols-[1fr_240px] sm:py-12">
          <div>
            <p className="eyebrow text-accent">Big-Foot de Thalek</p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-turquoise sm:text-5xl">{lang === "es" ? "La Raza" : "The Breed"}</h1>
            <p className="mt-3 font-display text-3xl text-foreground">Shih Tzu</p>
            <div className="mt-6 h-px w-24 bg-accent" />
          </div>
          <img src={photo.url} alt={lang === "es" ? "Shih Tzu entre narcisos" : "Shih Tzu among daffodils"} className="aspect-[4/3] w-full rounded-md object-cover shadow-soft sm:aspect-square" />
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-8">
        <Accordion type="single" collapsible>
          {sections.map((section) => (
            <AccordionItem value={section.id} key={section.id} className="border-turquoise/25">
              <AccordionTrigger className="gap-5 py-6 font-display text-2xl font-semibold text-turquoise hover:no-underline sm:text-3xl [&>svg]:h-7 [&>svg]:w-7 [&>svg]:rounded-full [&>svg]:bg-turquoise [&>svg]:p-1 [&>svg]:text-turquoise-foreground">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <div className="max-w-3xl pb-6"><PageBody blocks={section.page.blocks} unframed /></div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}