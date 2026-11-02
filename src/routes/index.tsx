import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/site/Home";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Big-Foot de Thalek — Criadero de Shih Tzu y Bobtail" },
      { name: "description", content: "Criadores de Shih Tzu y también de Bobtail. Crianza selectiva y familiar desde 1995. Cachorros, campeones y noticias." },
      { property: "og:title", content: "Big-Foot de Thalek — Shih Tzu y Bobtail" },
      { property: "og:description", content: "Criadores de Shih Tzu y Bobtail. Crianza selectiva y familiar desde 1995." },
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
