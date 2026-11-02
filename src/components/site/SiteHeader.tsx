import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { inLang, nav, type Lang } from "@/lib/content";

export function SiteHeader({ lang, twin }: { lang: Lang; twin?: string | null }) {
  const [open, setOpen] = useState(false);
  const home = lang === "en" ? "/en" : "/";
  const otherLang = lang === "en" ? "es" : "en";
  const switchTo = twin ?? (otherLang === "en" ? "/en" : "/");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to={home} className="font-display text-2xl font-semibold text-primary">
          Big-Foot <span className="italic text-foreground">de Thalek</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((g) => (
            <div key={g.label.es} className="group relative">
              <button className="flex items-center gap-1 rounded px-3 py-2 text-sm font-medium text-foreground hover:text-primary">
                {g.label[lang]} <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <div className="invisible absolute left-0 top-full min-w-52 rounded-md border border-border bg-popover p-2 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {g.items.map((i) => (
                  <Link
                    key={i.slug}
                    to="/$slug"
                    params={{ slug: inLang(i.slug, lang) }}
                    className="block rounded px-3 py-1.5 text-sm text-popover-foreground hover:bg-muted hover:text-primary"
                  >
                    {i.label[lang]}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            to="/$slug"
            params={{ slug: inLang("contacto", lang) }}
            className="rounded px-3 py-2 text-sm font-medium hover:text-primary"
          >
            {lang === "en" ? "Contact" : "Contacto"}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={switchTo.startsWith("/") ? switchTo : `/${switchTo}`}
            className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary"
          >
            {otherLang}
          </a>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-border px-5 py-4 lg:hidden">
          {nav.map((g) => (
            <div key={g.label.es} className="mb-4">
              <p className="eyebrow mb-1 text-accent">{g.label[lang]}</p>
              {g.items.map((i) => (
                <Link
                  key={i.slug}
                  to="/$slug"
                  params={{ slug: inLang(i.slug, lang) }}
                  onClick={() => setOpen(false)}
                  className="block py-1 text-sm"
                >
                  {i.label[lang]}
                </Link>
              ))}
            </div>
          ))}
          <Link to="/$slug" params={{ slug: inLang("contacto", lang) }} onClick={() => setOpen(false)} className="block py-1 text-sm font-semibold">
            {lang === "en" ? "Contact" : "Contacto"}
          </Link>
        </div>
      )}
    </header>
  );
}

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="mt-24 bg-plum-deep text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl">Big-Foot de Thalek</p>
          <p className="mt-2 text-sm opacity-75">
            {lang === "en" ? "Bobtail & Shih Tzu. Selective breeding since 1995." : "Bobtail y Shih Tzu. Crianza selectiva desde 1995."}
          </p>
        </div>
        <div className="text-sm opacity-85">
          <p>Afijo R.S.C.E. 8.852</p>
        </div>
        <div className="text-sm opacity-85">
          <p>+34 676 22 08 96</p>
          <a href="mailto:BFDT@hotmail.com" className="underline-offset-4 hover:underline">BFDT@hotmail.com</a>
        </div>
      </div>
      <p className="pb-6 text-center text-xs opacity-60">© Big-Foot de Thalek</p>
    </footer>
  );
}
