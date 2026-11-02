import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/site/Home";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  loader: () => loadPage("inicioshi"),
  head: () => ({
    meta: [
      { title: "Big-Foot de Thalek — Criadero de Bobtail y Shih Tzu" },
      { name: "description", content: "Crianza selectiva y familiar de Bobtail y Shih Tzu en Burgos desde 1995. Cachorros, campeones y noticias." },
      { property: "og:title", content: "Big-Foot de Thalek — Bobtail y Shih Tzu" },
      { property: "og:description", content: "Crianza selectiva y familiar de Bobtail y Shih Tzu en Burgos desde 1995." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://archive-to-studio-46.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://archive-to-studio-46.lovable.app/" },
      { rel: "alternate", hrefLang: "es", href: "https://archive-to-studio-46.lovable.app/" },
      { rel: "alternate", hrefLang: "en", href: "https://archive-to-studio-46.lovable.app/en" },
    ],
  }),
  component: () => <Home lang="es" />,
});
