import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/site/Home";

export const Route = createFileRoute("/en")({
  staticData: { sitemap: true },
  loader: () => loadPage("inicioshi-en"),
  head: () => ({
    meta: [
      { title: "Big-Foot de Thalek — Bobtail & Shih Tzu Breeder in Spain" },
      { name: "description", content: "Selective, family-raised Bobtail and Shih Tzu breeding in Burgos, Spain, since 1995." },
      { property: "og:title", content: "Big-Foot de Thalek — Bobtail & Shih Tzu" },
      { property: "og:description", content: "Selective, family-raised Bobtail and Shih Tzu breeding in Spain since 1995." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://archive-to-studio-46.lovable.app/en" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://archive-to-studio-46.lovable.app/en" },
      { rel: "alternate", hrefLang: "es", href: "https://archive-to-studio-46.lovable.app/" },
      { rel: "alternate", hrefLang: "en", href: "https://archive-to-studio-46.lovable.app/en" },
    ],
  }),
  component: () => <Home lang="en" />,
});
