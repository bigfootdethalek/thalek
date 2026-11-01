import { createFileRoute } from "@tanstack/react-router";
import { loadPage } from "@/lib/content";
import { Home } from "@/components/site/Home";

export const Route = createFileRoute("/")({
  loader: () => loadPage("inicioshi"),
  head: () => ({
    meta: [
      { title: "Big-Foot de Thalek — Criadero de Bobtail y Shih Tzu" },
      { name: "description", content: "Crianza selectiva y familiar de Bobtail y Shih Tzu en Burgos desde 1995. Cachorros, campeones y noticias." },
      { property: "og:title", content: "Big-Foot de Thalek — Bobtail y Shih Tzu" },
      { property: "og:description", content: "Crianza selectiva y familiar de Bobtail y Shih Tzu en Burgos desde 1995." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Home lang="es" updates={Route.useLoaderData()} />,
});
