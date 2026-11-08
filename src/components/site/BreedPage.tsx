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
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {lang === "es"
                ? "La característica más fuerte del Shih Tzu es su personalidad. Es divertido y cariñoso, para nada agresivo y un excelente compañero para niños y adultos. Es alerta, vivaz y disfruta de un buen paseo. Puede jugar por horas y no habrá día en que no le haga reír. Ama más que nada la compañía y el afecto de la gente. Es feliz entreteniendo a cualquier extraño y concede su afecto a la persona más cercana. Es grandioso con los niños. Jugará con ellos por horas y la pregunta es: ¿Quiénes se cansarán primero: los niños o el perro?"
                : "The Shih Tzu's strongest trait is its personality. It is fun and affectionate, never aggressive, and an excellent companion for children and adults alike. It is alert, lively and enjoys a good walk. It can play for hours, and there will not be a day when it does not make you laugh. More than anything, it loves people's company and affection. It is happy entertaining any stranger and gives its affection to the person closest to it. It is wonderful with children. It will play with them for hours, and the question is: who will tire first — the children or the dog?"}
            </p>
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