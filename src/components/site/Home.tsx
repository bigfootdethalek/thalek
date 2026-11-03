import { Link } from "@tanstack/react-router";
import { inLang, legacySrc, type Lang } from "@/lib/content";
import shihCover from "@/assets/shihtzu-cojin.jpg";
import { SiteFooter, SiteHeader } from "./SiteHeader";

const copy = {
  es: {
    eyebrow: "Afijo R.S.C.E. 8.852 · Desde 1995",
    title: "Shih Tzu",
    sub: "Crianza selectiva y totalmente familiar.\nBienvenido al maravilloso mundo del Shih Tzu y el Bobtail.",
    notice: "Estamos renovando nuestra antigua página para darle un toque más moderno y la iremos poniendo al día poco a poco.",
    puppies: "Cachorros",
    champions: "Nuestros campeones",
    breeds: "Nuestra raza",
    shih: "Alta selección de Shih Tzu, con las mejores líneas americanas y europeas.",
    bob: "Especialistas en Bobtail desde nuestros comienzos como criadores.",
    males: "Machos",
    females: "Hembras",
    shihBreed: [
      "La característica más fuerte del Shih Tzu es su personalidad. Es divertido y cariñoso, para nada agresivo y un excelente compañero para niños y adultos. Es alerta, vivaz y disfruta de un buen paseo. Puede jugar por horas y no habrá día en que no le haga reír. Ama más que nada la compañía y el afecto de la gente. Es feliz entreteniendo a cualquier extraño y concede su afecto a la persona más cercana. Es grandioso con los niños. Jugará con ellos por horas y la pregunta es: ¿Quiénes se cansarán primero: los niños o el perro?",
      "Alta selección de Shih Tzu, con las mejores líneas americanas y europeas.",
    ],
  },
  en: {
    eyebrow: "R.S.C.E. kennel 8.852 · Since 1995",
    title: "Shih Tzu",
    sub: "Selective, family-raised breeding in Spain. Welcome to the wonderful world of the Shih Tzu and the Bobtail.",
    notice: "We are renewing our old website to give it a more modern touch, and we are updating it little by little.",
    puppies: "Puppies",
    champions: "Our champions",
    breeds: "Our breed",
    shih: "Highly selected Shih Tzu from the best American and European lines.",
    bob: "Bobtail specialists since our very beginnings as breeders.",
    males: "Males",
    females: "Females",
    shihBreed: [
      "The Shih Tzu's strongest trait is its personality. It is fun and affectionate, never aggressive, and an excellent companion for children and adults. It is alert, lively and enjoys a good walk. It can play for hours and not a day will go by without it making you laugh. More than anything it loves people's company and affection. It happily entertains any stranger and gives its affection to the person closest to it. It is wonderful with children: it will play with them for hours, and the question is who will tire first, the children or the dog?",
      "Highly selected Shih Tzu from the best American and European lines.",
    ],
  },
};

export function Home({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const L = (slug: string) => ({ to: "/$slug" as const, params: { slug: inLang(slug, lang) } });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader lang={lang} twin={lang === "en" ? "/" : "/en"} />
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="eyebrow text-accent">{c.eyebrow}</p>
            <h1 className="mt-4 font-display text-6xl font-semibold leading-none md:text-7xl">
              Big-Foot <span className="italic">de Thalek</span>
            </h1>
            <p className="mt-3 font-display text-3xl italic opacity-90">{c.title}</p>
            <p className="mt-6 max-w-md text-base opacity-85">{c.sub}</p>
            <p className="mt-3 flex items-start gap-2 max-w-md text-sm italic opacity-75">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              {c.notice}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link {...L("cachorroshihtzuact")} className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90">
                {c.puppies}
              </Link>
              <Link {...L("campeones")} className="rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10">
                {c.champions}
              </Link>
            </div>
          </div>
          <img
            src={legacySrc("fotos/Criadero/Chicho/DSC01134.JPG")}
            alt="Shih Tzu Ch. Universal Beauty"
            className="mx-auto max-h-[520px] rounded-md shadow-soft"
          />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow text-accent">{c.breeds}</p>
        <div className="mx-auto mt-6 grid max-w-2xl gap-8">
          {[
            { name: "Shih Tzu", text: "", img: shihCover, m: "shih-tzum", f: "shih-tzuh", r: "", breed: true },
          ].map((b) => (
            <article key={b.name} className="overflow-hidden rounded-md border border-border bg-card shadow-soft">
              {b.r ? (
                <Link {...L(b.r)}>
                  <img src={b.img.startsWith("fotos/") ? legacySrc(b.img) : b.img} alt={b.name} className="h-auto w-full" />
                </Link>
              ) : (
                <img src={b.img.startsWith("fotos/") ? legacySrc(b.img) : b.img} alt={b.name} className="h-auto w-full" />
              )}
              <div className="p-6">
                <h2 className="font-display text-3xl font-semibold text-turquoise">{b.name}</h2>
                {b.text && <p className="mt-2 text-muted-foreground">{b.text}</p>}
                {b.breed && (
                  <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {c.shihBreed.map((p) => <p key={p}>{p}</p>)}
                  </div>
                )}
                <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-semibold">
                  <Link {...L(b.m)} className="inline-flex items-center gap-2 rounded-full bg-turquoise px-6 py-3 text-turquoise-foreground shadow-soft transition hover:-translate-y-0.5 hover:opacity-90">{c.males} →</Link>
                  <Link {...L(b.f)} className="inline-flex items-center gap-2 rounded-full bg-turquoise px-6 py-3 text-turquoise-foreground shadow-soft transition hover:-translate-y-0.5 hover:opacity-90">{c.females} →</Link>
                </div>
                {b.breed && (
                  <img src={legacySrc("fotos/Criadero/Chicho/11DSC03903.JPG")} alt="Shih Tzu" className="mx-auto mt-6 max-h-80 rounded-md shadow-soft" />
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter lang={lang} />
    </div>
  );
}
