import { createFileRoute } from "@tanstack/react-router";
import { loadPage } from "@/lib/content";
import { Home } from "@/components/site/Home";

export const Route = createFileRoute("/en")({
  loader: () => loadPage("inicioshi-en"),
  head: () => ({
    meta: [
      { title: "Big-Foot de Thalek — Bobtail & Shih Tzu Breeder in Spain" },
      { name: "description", content: "Selective, family-raised Bobtail and Shih Tzu breeding in Burgos, Spain, since 1995." },
      { property: "og:title", content: "Big-Foot de Thalek — Bobtail & Shih Tzu" },
      { property: "og:description", content: "Selective, family-raised Bobtail and Shih Tzu breeding in Spain since 1995." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Home lang="en" updates={Route.useLoaderData()} />,
});
