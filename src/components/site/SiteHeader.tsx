import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Facebook, Instagram, Menu, X } from "lucide-react";
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
      <div className="flex flex-col items-center gap-3 pb-8">
        <p className="text-xs uppercase tracking-[0.2em] opacity-70">{lang === "en" ? "Follow us" : "Síguenos"}</p>
        <div className="flex gap-3">
          <a
            href="https://www.facebook.com/thalekshihtzu"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="rounded-full border border-primary-foreground/25 p-2.5 opacity-85 transition hover:bg-primary-foreground/10 hover:opacity-100"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://www.instagram.com/bigfootdethalek"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="rounded-full border border-primary-foreground/25 p-2.5 opacity-85 transition hover:bg-primary-foreground/10 hover:opacity-100"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.tiktok.com/@bigfootdethalek"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="rounded-full border border-primary-foreground/25 p-2.5 opacity-85 transition hover:bg-primary-foreground/10 hover:opacity-100"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.91 1.57-1.34 3.73-1.91 5.75-1.58.03 1.32.01 2.65-.02 3.97-.88-.29-1.85-.25-2.68.15-.98.47-1.71 1.39-1.93 2.45-.13.6-.09 1.23.09 1.81.34 1.11 1.24 2.03 2.35 2.4.98.33 2.11.25 3.02-.24.83-.44 1.45-1.25 1.67-2.17.09-.38.1-.78.1-1.17.01-2.92-.01-5.84.02-8.75.01-1.13.06-2.27.28-3.38.28-1.44 1.02-2.76 2.06-3.78.97-.95 2.2-1.63 3.53-1.95z" />
            </svg>
          </a>
        </div>
      </div>
      <p className="pb-6 text-center text-xs opacity-60">© Big-Foot de Thalek</p>
    </footer>
  );
}
