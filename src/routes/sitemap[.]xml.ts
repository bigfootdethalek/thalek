import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { loadPage, pageIndex } from "@/lib/content";
import { isSearchPage } from "@/lib/search-metadata";
import { isSitemapRouteIncluded, sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
        if (isSitemapRouteIncluded(router.routesById["/$slug"])) {
          for (const slug of Object.keys(pageIndex).sort()) {
            const page = await loadPage(slug);
            if (!page) throw new Error(`Missing public page: ${slug}`);
            if (!isSearchPage(slug, page)) continue;
            const location = router.buildLocation({ to: "/$slug", params: { slug }, search: () => ({}), hash: "" });
            const path = sitemapPathForLocation(router, location, "/$slug");
            if (path) entries.push({ path });
          }
        }
        return new Response(sitemapXML("https://thalek.es", entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});