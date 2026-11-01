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
