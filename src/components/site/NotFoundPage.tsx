import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { inLang } from "@/lib/content";
import { SiteFooter, SiteHeader } from "./SiteHeader";

export function NotFoundPage() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const lang = pathname.endsWith("-en") || pathname.startsWith("/en/") ? "en" : "es";
  const english = lang === "en";
  const sections = [
    { slug: "criadero", label: english ? "Our story" : "Nuestra historia" },
    { slug: "shih-tzum", label: "Shih Tzu" },
    { slug: "bobtailm", label: "Bobtail" },
    { slug: "campeones", label: english ? "Champions" : "Campeones" },
    { slug: "noticias", label: english ? "News" : "Noticias" },
    { slug: "contacto", label: english ? "Contact" : "Contacto" },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader lang={lang} />
      <main className="mx-auto max-w-4xl px-5 py-16 md:py-24">
        <p className="eyebrow text-accent">Big-Foot de Thalek · 404</p>
        <h1 className="mt-5 font-display text-4xl font-semibold md:text-5xl">
          {english ? "This page has wandered off" : "Esta página se ha perdido"}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          {english ? "The address may be from our old website or may be incorrect. Our Bobtails and Shih Tzus are waiting for you here." : "Puede que hayas llegado desde una dirección de nuestra antigua web o que el enlace no sea correcto. Nuestros Bobtails y Shih Tzus te esperan aquí."}
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link to={english ? "/en" : "/"}><Home />{english ? "Back to home" : "Volver al inicio"}</Link>
        </Button>
        <nav aria-label={english ? "Main sections" : "Secciones principales"} className="mt-12 grid gap-x-10 sm:grid-cols-2">
          {sections.map(({ slug, label }) => (
            <Button asChild variant="link" key={slug} className="h-14 justify-between rounded-none border-b border-border px-0 text-base">
              <Link to="/$slug" params={{ slug: inLang(slug, lang) }}>{label}<ArrowRight /></Link>
            </Button>
          ))}
        </nav>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}