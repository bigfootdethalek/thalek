import type { Block, Lang } from './content';
import type { Tables } from '@/integrations/supabase/types';

export type Exhibition = Tables<'exhibitions'>;

export function exhibitionBlocks(rows: Exhibition[], lang: Lang): Block[] {
  const blocks: Block[] = [];
  let lastShow = '';
  let lastEvent = '';
  let pendingTail: Block[] = [];
  for (const row of rows.filter(r => r.status === 'approved').sort((a,b) => b.event_date.localeCompare(a.event_date) || a.event_es.localeCompare(b.event_es) || a.breed.localeCompare(b.breed) || a.dog_name.localeCompare(b.dog_name))) {
    const show = `${row.event_date}|${row.event_es}|${row.breed}`;
    const date = row.event_date.split('-').reverse().join('.');
    if (show !== lastShow) {
      blocks.push(...pendingTail); pendingTail = [];
      const event = `${row.event_date}|${row.event_es}`;
      if (event !== lastEvent) {
        if (blocks.length) blocks.push({type:'divider'});
        blocks.push({type:'p',parts:[`${lang === 'es' ? row.event_es : row.event_en}. ${date}`],variant:'title'});
        lastEvent = event;
      }
      blocks.push({type:'p',parts:[row.breed.toUpperCase()],variant:'subtitle'});
      const showImgs = rows.filter(r => r.status === 'approved' && `${r.event_date}|${r.event_es}|${r.breed}` === show)
        .flatMap(r => [r.image_url, ...(r.extra_images ?? [])]).filter(Boolean);
      if (showImgs.length) blocks.push({type:'gallery',items:[...new Set(showImgs)].map(src => ({type:'img' as const,src,uniform:true}))});
      lastShow = show;
    }
    const results = (lang === 'es' ? row.results_es : row.results_en).replace(/(\d)\.?º/g, '$1');
    blocks.push({type:'p',parts:[row.dog_name],heading:false,center:true}, {type:'p',parts:[results],heading:false,center:true});
    const award = lang === 'es' ? row.award_es : row.award_en;
    if (award) {
      const [awardText = '', ...owner] = award.split(' · ');
      blocks.push({type:'p',parts:[awardText],heading:false,center:true});
      if (owner.length) blocks.push({type:'p',parts:[owner.join(' · ')],center:true});
    }
    const judge: Block = {type:'p',parts:[`${lang === 'es' ? 'Juez de Raza' : 'Breed Judge'}: ${lang === 'es' ? row.judge_es : row.judge_en}`],center:true};
    const seenAlbums = new Set<string>();
    const albumKey = (u: string) => u.match(/[?&]set=a\.(\d+)/)?.[1] ?? u;
    const showRows = rows.filter(r => r.status === 'approved' && `${r.event_date}|${r.event_es}|${r.breed}` === show);
    const notes = [...new Set(showRows.map(r => lang === 'es' ? r.notes_es : r.notes_en).filter(Boolean))]
      .flatMap(note => note.split('\n').filter(Boolean).map(text => ({type:'p' as const,parts:[text],heading:false,center:true})));
    const links: Block[] = showRows
      .map(r => r.source_url)
      .filter(src => { const k = albumKey(src); if (seenAlbums.has(k)) return false; seenAlbums.add(k); return true; })
      .map(src => ({type:'p',parts:[{text:lang === 'es' ? 'Ver exposición en Facebook' : 'View show on Facebook',href:src}],center:true}));
    pendingTail = [...notes, ...(row.judge_es || row.judge_en ? [judge] : []), ...links];
  }
  blocks.push(...pendingTail);
  return blocks;
}