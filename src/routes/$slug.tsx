import { createFileRoute, notFound } from "@tanstack/react-router";
import { langOf, loadPage, twinOf } from "@/lib/content";
import { SiteFooter, SiteHeader } from "@/components/site/SiteHeader";
import { PageBody } from "@/components/site/PageBody";
import { DogGrid, BobtailGrid, bobtailPages, dogPages } from "@/components/site/DogGrid";
import { pageDescription, pageSearchLinks, PUBLIC_ORIGIN } from "@/lib/search-metadata";
import { NotFoundPage } from "@/components/site/NotFoundPage";

export const Route = createFileRoute("/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params }) => {
    const page = await loadPage(params.slug);
    if (!page) throw notFound();
    return { page, slug: params.slug };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.page.title} — Big-Foot de Thalek` : "Big-Foot de Thalek";
    const desc = loaderData ? pageDescription(loaderData.page, langOf(loaderData.slug)) : "Big-Foot de Thalek: Bobtail y Shih Tzu.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        ...(loaderData ? [{ property: "og:url", content: `${PUBLIC_ORIGIN}/${encodeURIComponent(loaderData.slug)}` }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        ...(!loaderData ? [{ name: "robots", content: "noindex" }] : []),
      ],
      links: loaderData ? pageSearchLinks(loaderData.slug, langOf(loaderData.slug)) : [],
    };
  },
  component: PageView,
  notFoundComponent: NotFoundPage,
  errorComponent: () => <NotFoundPage />,
});

function PageView() {
  const { page, slug } = Route.useLoaderData();
  const lang = langOf(slug);
  // Camadas Actuales is shown with centered text, both languages.
  const centered = slug === "cachorroshihtzuact" || slug === "cachorroshihtzuact-en";
  // Pages with tables (e.g. Campeones) get a wider main column so names fit on one row.
  const hasTable = page.blocks.some((b) => b.type === "table");
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader lang={lang} twin={twinOf(slug)} />
      {dogPages[slug] && (
        <div className="mx-auto max-w-6xl px-5 pt-12">
          <DogGrid sex={dogPages[slug]} lang={lang} />
        </div>
      )}
      {bobtailPages[slug] && (
        <div className="mx-auto max-w-6xl px-5 pt-12">
          <BobtailGrid sex={bobtailPages[slug]} lang={lang} />
        </div>
      )}
      <main className={`mx-auto ${hasTable ? "max-w-4xl" : "max-w-3xl"} px-5 pt-12`}>
        <p className="eyebrow text-accent">Big-Foot de Thalek</p>
        <h1 className="mt-2 font-display text-4xl font-semibold italic text-turquoise md:text-5xl">{page.title}</h1>
        <div className="mt-6 h-px w-24 bg-accent" />
        <div className="mt-8">
          <PageBody blocks={page.blocks} center={centered} />
        </div>
      </main>
      <SiteFooter lang={lang} />
    </div>
  );
}
