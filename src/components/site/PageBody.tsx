import { Link } from "@tanstack/react-router";
import { hasPage, legacySrc, type Block, type Part } from "@/lib/content";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function Inline({ part }: { part: Part }) {
  if (typeof part === "string") return <>{part}</>;
  if (part.href) return <a href={part.href} className="font-medium text-primary underline underline-offset-4">{part.text}</a>;
  if (part.to && hasPage(part.to))
    return (
      <Link to="/$slug" params={{ slug: part.to }} className="font-medium text-primary underline decoration-accent underline-offset-4 hover:decoration-primary">
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

export function PageBody({ blocks, center = false }: { blocks: Block[]; center?: boolean }) {
  const align = center ? "text-center" : "";
  return (
    <div className="space-y-4">
      {blocks.map((b, i) => {
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
        if (b.type === "gallery") {
          const single = b.items.length === 1;
          return (
            <div key={i} className={single ? "my-8 flex justify-center" : `my-8 grid grid-cols-2 gap-3 sm:grid-cols-3 ${align ? "mx-auto max-w-xl" : ""}`}>
              {b.items.map((it, j) => {
                const img = (
                  <img
                    src={legacySrc(it.src)}
                    alt=""
                    loading="lazy"
                    className={single ? "max-h-[520px] w-auto rounded-md shadow-soft" : "h-full w-full rounded-md object-cover shadow-soft transition hover:opacity-90"}
                  />
                );
                return it.to && hasPage(it.to) ? (
                  <Link key={j} to="/$slug" params={{ slug: it.to }}>{img}</Link>
                ) : (
                  <div key={j}>{img}</div>
                );
              })}
            </div>
          );
        }
        const text = b.parts.map((p) => (typeof p === "string" ? p : p.text)).join("");
        if (isHeading(text))
          return (
            <h2 key={i} className={`pt-4 font-display text-2xl font-semibold text-primary ${align}`}>
              {b.parts.map((p, j) => <Inline key={j} part={p} />)}
            </h2>
          );
        return (
          <p key={i} className="leading-relaxed text-foreground/90">
            {b.parts.map((p, j) => <Inline key={j} part={p} />)}
          </p>
        );
      })}
    </div>
  );
}
