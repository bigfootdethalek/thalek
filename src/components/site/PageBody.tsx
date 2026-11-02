import { Link } from "@tanstack/react-router";
import { hasPage, legacySrc, type Block, type Part } from "@/lib/content";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function Inline({ part }: { part: Part }) {
  if (typeof part === "string") return <>{part}</>;
  if (part.href) return <a href={part.href} className="font-medium text-primary underline underline-offset-4">{part.text}</a>;
  if (part.to && hasPage(part.to))
    return (
      <Link to="/$slug" params={{ slug: part.to }} {...(part.dog ? { hash: `perro-${part.dog}` } : {})} className="font-medium text-primary underline decoration-accent underline-offset-4 hover:decoration-primary">
        {part.text}
      </Link>
    );
  return <>{part.text}</>;
}

const SEX_ABBR: Record<string, string> = { MACHO: "M", HEMBRA: "H", MALE: "M", FEMALE: "F" };

function CellContent({ cell }: { cell: Part[] }) {
  const text = cell.map((p) => (typeof p === "string" ? p : p.text)).join("").trim();
  const abbr = SEX_ABBR[text];
  if (abbr)
    return (
      <>
        <span className="sm:hidden">{abbr}</span>
        <span className="hidden sm:inline">{cell.map((part, n) => <Inline key={n} part={part} />)}</span>
      </>
    );
  return <>{cell.map((part, n) => <Inline key={n} part={part} />)}</>;
}

function isHeading(text: string) {
  const t = text.trim();
  return t.length > 2 && t.length < 70 && t === t.toUpperCase() && /[A-ZÁÉÍÓÚÑ]/.test(t);
}

function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-accent/70 sm:w-28" />
      <span className="h-2 w-2 rotate-45 rounded-[2px] bg-accent shadow-soft" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-accent/70 sm:w-28" />
    </div>
  );
}

function renderGroup(blocks: Block[], align: string) {
  return blocks.map((b, i) => {
        if (b.type === "table") {
          return (
            <Table key={i} className="table-fixed border border-border text-xs sm:text-sm">
              <colgroup>
                <col className="w-[44%]" />
                <col className="w-[10%]" />
                <col className="w-[46%]" />
              </colgroup>
              <TableHeader className="bg-secondary">
                <TableRow>
                  {b.headers.map((header, j) => (
                    <TableHead key={j} scope="col" className="border-r border-border px-2 py-3 text-center font-semibold text-primary sm:px-3">{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {b.rows.map((row, j) => (
                  <TableRow key={j}>
                    {row.map((cell, k) => (
                      <TableCell key={k} className={`border-r border-border py-4 text-center leading-relaxed sm:px-3 ${k === 1 ? "whitespace-nowrap px-1" : "whitespace-pre-line break-words px-2"}`}>
                        <CellContent cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          );
        }
        if (b.type === "divider") {
          return <Ornament key={i} className="my-12" />;
        }
        if (b.type === "gallery") {
          const single = b.items.length === 1;
          const itemClass = single ? "" : "w-[calc(50%-0.375rem)] sm:w-[calc((100%-1.5rem)/3)]";
          return (
            <div key={i} className={single ? "my-8 flex justify-center" : `my-8 flex flex-wrap justify-center gap-3 ${align ? "mx-auto max-w-xl" : ""}`}>
              {b.items.map((it, j) => {
                if (it.placeholder) {
                  return (
                    <div key={j} className={`${itemClass} aspect-[4/7] rounded-md border border-dashed border-border bg-secondary/40`} aria-hidden="true" />
                  );
                }
                const img = (
                  <img
                    src={legacySrc(it.src)}
                    alt=""
                    loading="lazy"
                    className={single ? "max-h-[520px] w-auto rounded-md shadow-soft" : "h-full w-full rounded-md object-cover shadow-soft transition hover:opacity-90"}
                  />
                );
                if (it.uniform) {
                  const uniImg = (
                    <img
                      src={legacySrc(it.src)}
                      alt=""
                      loading="lazy"
                      className="h-full w-auto max-w-full rounded-md shadow-soft"
                    />
                  );
                  return it.to && hasPage(it.to) ? (
                    <Link key={j} to="/$slug" params={{ slug: it.to }} {...(it.dog ? { hash: `perro-${it.dog}` } : {})} className="h-40 sm:h-[300px]">{uniImg}</Link>
                  ) : (
                    <div key={j} className="h-40 sm:h-[300px]">{uniImg}</div>
                  );
                }
                if (it.tall) {
                  const tallImg = (
                    <img
                      src={legacySrc(it.src)}
                      alt=""
                      loading="lazy"
                      style={it.focus ? { objectPosition: it.focus } : undefined}
                      className="h-full w-full rounded-md object-cover shadow-soft transition hover:opacity-90"
                    />
                  );
                  const ratioClass = it.ratio === "3/4" ? "aspect-[3/4]" : it.ratio === "4/5" ? "aspect-[4/5]" : "aspect-[4/7]";
                  return it.to && hasPage(it.to) ? (
                    <Link key={j} to="/$slug" params={{ slug: it.to }} {...(it.dog ? { hash: `perro-${it.dog}` } : {})} className={`${itemClass} ${ratioClass}`}>{tallImg}</Link>
                  ) : (
                    <div key={j} className={`${itemClass} ${ratioClass}`}>{tallImg}</div>
                  );
                }
                return it.to && hasPage(it.to) ? (
                  <Link key={j} to="/$slug" params={{ slug: it.to }} {...(it.dog ? { hash: `perro-${it.dog}` } : {})} className={itemClass}>{img}</Link>
                ) : (
                  <div key={j} className={itemClass}>{img}</div>
                );
              })}
            </div>
          );
        }
        const text = b.parts.map((p) => (typeof p === "string" ? p : p.text)).join("");
        if (b.type === "quote")
          return (
            <p key={i} className={`pt-4 text-center font-display text-2xl font-semibold italic leading-relaxed text-turquoise sm:text-3xl ${align}`}>
              <span aria-hidden="true" className="mr-1">«</span>
              {b.parts.map((p, j) => <Inline key={j} part={p} />)}
              <span aria-hidden="true" className="ml-1">»</span>
            </p>
          );
        if (b.type === "p" && b.heading === true)
          return (
            <h2 key={i} className={`pt-4 text-center font-display font-semibold text-3xl italic leading-snug text-turquoise ${align}`}>
              {b.parts.map((p, j) => <Inline key={j} part={p} />)}
            </h2>
          );
        if (isHeading(text) && b.heading !== false) {
          // Lines grouped with neighbouring all-caps lines (a poem) keep the
          // original heading look instead of the large turquoise title style.
          const prev = i > 0 ? blocks[i - 1] : undefined;
          const next = i < blocks.length - 1 ? blocks[i + 1] : undefined;
          const poemLine = (prev && isHeadingBlock(prev)) || (next && isHeadingBlock(next));
          const isParentLine = /^\s*[PM]:/.test(text);
          return (
            <h2
              key={i}
              className={`pt-4 whitespace-pre-line font-display font-semibold ${b.center ? "text-center" : align} ${
                isParentLine
                  ? "text-[clamp(1.05rem,2.1vw,1.35rem)] italic leading-snug text-turquoise"
                  : poemLine
                    ? "text-2xl text-primary"
                    : "text-3xl italic text-turquoise"
              }`}
            >
              {b.parts.map((p, j) =>
                isParentLine && typeof p === "string" ? (
                  <span key={j} className="font-medium text-primary underline decoration-accent underline-offset-4">{p}</span>
                ) : (
                  <Inline key={j} part={p} />
                )
              )}
            </h2>
          );
        }
        if (b.lead)
          return (
            <p key={i} className={`text-center font-display text-2xl font-semibold italic leading-relaxed text-turquoise sm:text-3xl ${align}`}>
              {b.parts.map((p, j) => <Inline key={j} part={p} />)}
            </p>
          );
        return (
          <p key={i} className={`leading-relaxed text-foreground/90 ${b.center === false ? "" : b.center ? "text-center" : align}`}>
            {b.parts.map((p, j) => <Inline key={j} part={p} />)}
          </p>
        );
  });
}

function isHeadingBlock(b: Block) {
  return b.type === "p" && b.heading !== false && isHeading(b.parts.map((p) => (typeof p === "string" ? p : p.text)).join(""));
}

// Sections are separated by explicit dividers, all-caps headings, or a photo
// gallery that follows plain text once the section already has photos.
function splitGroups(blocks: Block[]): Block[][] {
  const groups: Block[][] = [];
  let current: Block[] = [];
  const flush = () => {
    if (current.length) {
      groups.push(current);
      current = [];
    }
  };
  for (const b of blocks) {
    if (b.type === "divider") {
      flush();
      continue;
    }
    // Consecutive all-caps lines (e.g. a poem) stay together in one panel.
    // An explicit noSplit keeps a heading with the previous panel instead.
    const last = current[current.length - 1];
    if (isHeadingBlock(b) && !("noSplit" in b && b.noSplit) && current.length && !(last && isHeadingBlock(last))) flush();
    if (b.type === "gallery" && current.length) {
      const groupHasGallery = current.some((x) => x.type === "gallery");
      if (groupHasGallery && last && last.type === "p" && !isHeadingBlock(last)) flush();
    }
    current.push(b);
  }
  flush();
  return groups;
}

export function PageBody({ blocks, center = false, singlePanel = false }: { blocks: Block[]; center?: boolean; singlePanel?: boolean }) {
  const align = center ? "text-center" : "";
  const groups = singlePanel ? [blocks.filter((b) => b.type !== "divider")] : splitGroups(blocks);
  return (
    <div className="space-y-8">
      {groups.map((g, gi) => (
        <div key={gi} className="space-y-8">
          {gi > 0 && <Ornament />}
          <section
            className={`rounded-3xl border p-6 shadow-soft sm:p-10 ${
              gi % 2 === 1 ? "border-border bg-secondary/50" : "border-accent/25 bg-accent/10"
            }`}
          >
            <div className="space-y-4">{renderGroup(g, align)}</div>
          </section>
        </div>
      ))}
    </div>
  );
}
