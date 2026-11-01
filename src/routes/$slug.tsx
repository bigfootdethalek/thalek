import { createFileRoute, notFound } from "@tanstack/react-router";
import { langOf, loadPage, twinOf } from "@/lib/content";
import { SiteFooter, SiteHeader } from "@/components/site/SiteHeader";
import { PageBody } from "@/components/site/PageBody";

export const Route = createFileRoute("/$slug")({
  loader: async ({ params }) => {
    const page = await loadPage(params.slug);
    if (!page) throw notFound();
    return { page, slug: params.slug };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.page.title} — Big-Foot de Thalek` : "Big-Foot de Thalek";
    const desc = "Big-Foot de Thalek: criadero de Bobtail y Shih Tzu en Burgos, España.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PageView,
});

function PageView() {
  const { page, slug } = Route.useLoaderData();
  const lang = langOf(slug);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader lang={lang} twin={twinOf(slug)} />
      <main className="mx-auto max-w-3xl px-5 pt-12">
        <p className="eyebrow text-accent">Big-Foot de Thalek</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-foreground md:text-5xl">{page.title}</h1>
        <div className="mt-6 h-px w-24 bg-accent" />
        <div className="mt-8">
          <PageBody blocks={page.blocks} />
        </div>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
