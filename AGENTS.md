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
- Legacy page content lives as one JSON per page in src/content/pages (slug = old filename, `-en` suffix = English) rendered by the `/$slug` route; edit content there rather than hardcoding pages. Why: 500+ pages imported from the old FrontPage site.
- Legacy photos are served from public/legacy with their original paths so extracted content references stay valid.
- Preserve legacy table content as structured table blocks in page JSON and render it through PageBody; this keeps original row order, cell relationships, and links intact instead of flattening them into paragraphs.
- Shih Tzu cards use a shared catalogue keyed by source dog ID (src/content/cdf-dogs.json), with optional retired and memorial flags and shared filtering; these groups appear separately on each sex's page in both languages so dogs are not duplicated or presented as current breeding dogs.
- Bobtail cards use a separate catalogue (src/content/bobtail-dogs.json) keyed by source ID or bobtail-* slugs; past dogs carry a `homage` flag and appear under "En homenaje" below the current section, so adding a new bobtail means adding a catalogue entry without the flag.
