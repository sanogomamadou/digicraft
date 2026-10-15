import type { ReactNode } from 'react';

/**
 * Rendu Markdown des réponses du bot, sans HTML injecté (tout passe par des nœuds React).
 * Gère : titres, gras/italique, code, liens, emails, listes à puces / numérotées,
 * séparateurs et tableaux (convertis en blocs, plus lisibles dans une bulle étroite).
 */

type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: { n: string; text: string }[] }
  | { type: 'table'; header: string[]; rows: string[][] }
  | { type: 'hr' };

const RE_HEADING = /^\s*#{1,6}\s+(.*)$/;
const RE_HR = /^\s*(?:-{3,}|\*{3,}|_{3,}|—+)\s*$/;
const RE_UL = /^\s*[-*•]\s+(.*)$/;
const RE_UL_EMPTY = /^\s*[-*•]\s*$/;
const RE_OL = /^\s*(\d+)[.)]\s+(.*)$/;
const RE_TABLE_SEP = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

const splitRow = (line: string) =>
  line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim());

function parse(src: string): Block[] {
  const lines = src.replace(/\r\n?/g, '\n').replace(/<br\s*\/?>/gi, '\n').split('\n');
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    // Tableau : lignes commençant par « | » (une cellule peut déborder sur plusieurs lignes)
    if (line.trim().startsWith('|')) {
      const raw: string[] = [];
      while (i < lines.length && lines[i].trim()) {
        const l = lines[i].trim();
        if (l.startsWith('|')) raw.push(l);
        else if (raw.length) raw[raw.length - 1] += ' ' + l; // suite d'une cellule
        else break;
        i++;
      }
      const rows = raw.filter(r => !RE_TABLE_SEP.test(r)).map(splitRow);
      const hasSep = raw.some(r => RE_TABLE_SEP.test(r));
      blocks.push({ type: 'table', header: hasSep ? rows[0] ?? [] : [], rows: hasSep ? rows.slice(1) : rows });
      continue;
    }

    if (RE_HR.test(line)) { blocks.push({ type: 'hr' }); i++; continue; }

    const h = line.match(RE_HEADING);
    if (h) { blocks.push({ type: 'h', text: h[1] }); i++; continue; }

    if (RE_UL.test(line) || RE_UL_EMPTY.test(line)) {
      const items: string[] = [];
      while (i < lines.length && (RE_UL.test(lines[i]) || RE_UL_EMPTY.test(lines[i]))) {
        const m = lines[i].match(RE_UL);
        if (m) items.push(m[1]);
        // puce seule sur sa ligne : le texte est sur la ligne suivante
        else if (i + 1 < lines.length && lines[i + 1].trim()) { items.push(lines[i + 1].trim()); i++; }
        i++;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (RE_OL.test(line)) {
      const items: { n: string; text: string }[] = [];
      while (i < lines.length && RE_OL.test(lines[i])) {
        const m = lines[i].match(RE_OL)!;
        items.push({ n: m[1], text: m[2] });
        i++;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    // Paragraphe : lignes consécutives jusqu'à une ligne vide ou un autre bloc
    const para: string[] = [line.trim()];
    i++;
    while (
      i < lines.length && lines[i].trim() &&
      !RE_HEADING.test(lines[i]) && !RE_UL.test(lines[i]) && !RE_OL.test(lines[i]) &&
      !RE_HR.test(lines[i]) && !lines[i].trim().startsWith('|')
    ) {
      para.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: 'p', text: para.join('\n') });
  }
  return blocks;
}

/* ─── Inline : **gras**, *italique*, `code`, [lien](url), emails, URLs ─── */
const RE_INLINE = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[[^\]]+\]\((?:https?:\/\/|mailto:)[^)\s]+\)|\*[^*\s][^*]*\*|[\w.+-]+@[\w-]+\.[\w.-]+|https?:\/\/[^\s)]+)/g;

function inline(text: string, keyBase = ''): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let k = 0;
  for (const m of text.matchAll(RE_INLINE)) {
    const tok = m[0];
    const idx = m.index ?? 0;
    if (idx > last) out.push(...withBreaks(text.slice(last, idx), `${keyBase}t${k}`));
    const key = `${keyBase}i${k++}`;
    if (tok.startsWith('**') || tok.startsWith('__')) {
      out.push(<strong key={key} className="font-medium text-white">{inline(tok.slice(2, -2), key)}</strong>);
    } else if (tok.startsWith('`')) {
      out.push(<code key={key} className="px-1 rounded bg-white/10 text-[0.92em]">{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith('[')) {
      const [, label, href] = tok.match(/^\[([^\]]+)\]\(([^)]+)\)$/) ?? [];
      out.push(<a key={key} href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-blue-soft underline underline-offset-2 hover:text-white">{label}</a>);
    } else if (tok.startsWith('*')) {
      out.push(<em key={key}>{tok.slice(1, -1)}</em>);
    } else if (tok.includes('@') && !tok.startsWith('http')) {
      out.push(<a key={key} href={`mailto:${tok.replace(/\.$/, '')}`} className="text-blue-soft underline underline-offset-2 hover:text-white">{tok}</a>);
    } else {
      const url = tok.replace(/[.,;:]$/, '');
      out.push(<a key={key} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-soft underline underline-offset-2 hover:text-white">{url}</a>);
    }
    last = idx + tok.length;
  }
  if (last < text.length) out.push(...withBreaks(text.slice(last), `${keyBase}e`));
  return out;
}

function withBreaks(text: string, key: string): ReactNode[] {
  return text.split('\n').flatMap((part, i) => (i === 0 ? [part] : [<br key={`${key}b${i}`} />, part]));
}

export default function ChatMarkdown({ text }: { text: string }) {
  const blocks = parse(text);
  return (
    <div className="space-y-2.5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h':
            return <p key={i} className="font-medium text-white pt-1">{inline(b.text, `h${i}`)}</p>;
          case 'hr':
            return <hr key={i} className="border-white/10" />;
          case 'ul':
            return (
              <ul key={i} className="space-y-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2"><span className="text-blue-soft shrink-0">+</span><span>{inline(it, `u${i}-${j}`)}</span></li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i} className="space-y-1">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-2"><span className="text-blue-soft shrink-0 tabular-nums">{it.n}.</span><span>{inline(it.text, `o${i}-${j}`)}</span></li>
                ))}
              </ol>
            );
          case 'table':
            return (
              <div key={i} className="space-y-2">
                {b.rows.map((row, j) => (
                  <div key={j} className="rounded-xl bg-white/[0.04] px-3 py-2.5">
                    <p className="font-medium text-white">{inline(row[0] ?? '', `t${i}-${j}h`)}</p>
                    {row.slice(1).map((cell, c) => (
                      <p key={c} className="text-white/75 mt-0.5">
                        {b.header.length > 2 && b.header[c + 1] && <span className="text-white/45">{b.header[c + 1]} : </span>}
                        {inline(cell.replace(/\s*•\s*/g, '\n• ').trim(), `t${i}-${j}-${c}`)}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            );
          default:
            return <p key={i}>{inline(b.text, `p${i}`)}</p>;
        }
      })}
    </div>
  );
}

