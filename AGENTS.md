<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Migrated legacy site
- Exhibition news is read-only public data: the Cloud `exhibitions` table is SELECT-only for anon/authenticated (approved rows only) and renders through `exhibitionBlocks` on the annual pages; the reviewer UI, auth routes and write paths were removed at the owner's request — do not reintroduce review/auth screens. Why: the owner asked to delete the review access and all related data.
- Modern annual exhibition pages use the same year-filtered public exhibition rows and shared renderer, with bilingual JSON page registrations and archive links. Why: each year must inherit the same display options without duplicating presentation logic.
- Historical exhibition rows retain the source breed and bilingual supplementary show notes in the shared catalogue. Why: Bobtail entries, group judges and Junior Handling results must not be mislabeled or lost during annual imports.
- Facebook links on show entries dedupe per album (`set=a.<id>`), the award owner text renders on its own line, and results never use the "º" ordinal (e.g. "Excelente 1"). Why: owner-requested display rules for exhibition entries.
- Preserve Google verification tags for existing accounts; additional account tags render directly in the shared HTML head to avoid same-name metadata deduplication.
- Missing addresses render the shared branded NotFoundPage with typed links to real public sections and keep HTTP 404 status. Why: visitors following obsolete links can recover without creating soft-404 pages.
- Search discovery uses a router-derived sitemap plus substantive legacy JSON pages; omit obsolete menu and alternate-home slugs and omit lastmod without authoritative page timestamps. Why: search engines need current public destinations, not invented update dates.
- Page-specific search descriptions derive from the page title and actual text, with self-referencing canonical URLs on leaf routes. Why: preserve the imported content while avoiding generic snippets across the archive.
- Legacy page content lives as one JSON per page in src/content/pages (slug = old filename, `-en` suffix = English) rendered by the `/$slug` route; edit content there rather than hardcoding pages. Why: 500+ pages imported from the old FrontPage site.
- Legacy photos are served from public/legacy with their original paths so extracted content references stay valid.
- Preserve legacy table content as structured table blocks in page JSON and render it through PageBody; this keeps original row order, cell relationships, and links intact instead of flattening them into paragraphs.
- Shih Tzu cards use a shared catalogue keyed by source dog ID (src/content/cdf-dogs.json), with optional retired and memorial flags and shared filtering; these groups appear separately on each sex's page in both languages so dogs are not duplicated or presented as current breeding dogs.
- Bobtail cards use a separate catalogue (src/content/bobtail-dogs.json) keyed by source ID or bobtail-* slugs; past dogs carry a `homage` flag and appear under "En homenaje" below the current section, so adding a new bobtail means adding a catalogue entry without the flag.
