import { Link } from "@tanstack/react-router";
import { inLang, legacySrc, type Lang, type Page } from "@/lib/content";
import { SiteFooter, SiteHeader } from "./SiteHeader";
import { PageBody } from "./PageBody";

const copy = {
  es: {
    eyebrow: "Afijo R.S.C.E. 8.852 · Desde 1995",
    title: "Bobtail & Shih Tzu",
    sub: "Crianza selectiva y totalmente familiar.\nBienvenido al maravilloso mundo del Shih Tzu y el Bobtail.",
    notice: "Estamos renovando nuestra antigua página para darle un toque más moderno, y la estamos poniendo al día poco a poco.",
    puppies: "Ver cachorros",
    champions: "Nuestros campeones",
    breeds: "Nuestras razas",
    shih: "Alta selección de Shih Tzu, con las mejores líneas americanas y canadienses.",
    bob: "Especialistas en Bobtail desde nuestros comienzos como criadores.",
    males: "Machos",
    females: "Hembras",
    news: "Últimas actualizaciones",
  },
  en: {
    eyebrow: "R.S.C.E. kennel 8.852 · Since 1995",
    title: "Bobtail & Shih Tzu",
    sub: "Selective, family-raised breeding in Burgos, Spain. Welcome to the wonderful world of the Shih Tzu and the Bobtail.",
    notice: "We are renewing our old website to give it a more modern touch, and we are updating it little by little.",
    puppies: "See puppies",
    champions: "Our champions",
    breeds: "Our breeds",
    shih: "Highly selected Shih Tzu from the best American and Canadian lines.",
    bob: "Bobtail specialists since our very beginnings as breeders.",
    males: "Males",
    females: "Females",
    news: "Latest updates",
  },
};

export function Home({ lang, updates }: { lang: Lang; updates: Page | null }) {
  const c = copy[lang];
  const news = updates
    ? updates.blocks.filter((b) => b.type === "p" && /^\s*\d{2}-\d{2}-\d{4}/.test(String(b.parts[0]))).slice(0, 8)
    : [];
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
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          {[
            { name: "Shih Tzu", text: c.shih, img: "fotos/Criadero/Miss/06MISSFRENTE.jpg", m: "shih-tzum", f: "shih-tzuh", r: "razashi" },
            { name: "Bobtail", text: c.bob, img: "fotos/Criadero/London/ZDSC04808.JPG", m: "bobtailm", f: "bobtailh", r: "razabob" },
          ].map((b) => (
            <article key={b.name} className="overflow-hidden rounded-md border border-border bg-card shadow-soft">
              <Link {...L(b.r)}>
                <img src={legacySrc(b.img)} alt={b.name} className="h-72 w-full object-cover" />
              </Link>
              <div className="p-6">
                <h2 className="font-display text-3xl font-semibold text-primary">{b.name}</h2>
                <p className="mt-2 text-muted-foreground">{b.text}</p>
                <div className="mt-4 flex gap-4 text-sm font-semibold">
                  <Link {...L(b.m)} className="text-primary hover:underline">{c.males} →</Link>
                  <Link {...L(b.f)} className="text-primary hover:underline">{c.females} →</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {news.length > 0 && (
        <section className="bg-secondary">
          <div className="mx-auto max-w-3xl px-5 py-16">
            <h2 className="font-display text-4xl font-semibold text-primary">{c.news}</h2>
            <div className="mt-6 [&_p]:border-b [&_p]:border-border [&_p]:pb-3">
              <PageBody blocks={news} />
            </div>
          </div>
        </section>
      )}
      <SiteFooter lang={lang} />
    </div>
  );
}
