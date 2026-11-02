import type { Block, Lang } from './content';
import type { Tables } from '@/integrations/supabase/types';

export type Exhibition = Tables<'exhibitions'>;

export function exhibitionBlocks(rows: Exhibition[], lang: Lang): Block[] {
  const blocks: Block[] = [];
  let lastShow = '';
  let pendingTail: Block[] = [];
  for (const row of rows.filter(r => r.status === 'approved').sort((a,b) => b.event_date.localeCompare(a.event_date) || a.dog_name.localeCompare(b.dog_name))) {
    const show = `${row.event_date}|${row.event_es}`;
    const date = row.event_date.split('-').reverse().join('.');
    if (show !== lastShow) {
      blocks.push(...pendingTail); pendingTail = [];
      if (blocks.length) blocks.push({type:'divider'});
      blocks.push({type:'p',parts:[`${lang === 'es' ? row.event_es : row.event_en}. ${date}`],variant:'title'}, {type:'p',parts:['SHIH TZU'],variant:'subtitle'});
      const showImgs = rows.filter(r => r.status === 'approved' && `${r.event_date}|${r.event_es}` === show)
        .flatMap(r => [r.image_url, ...(r.extra_images ?? [])]).filter(Boolean);
      if (showImgs.length) blocks.push({type:'gallery',items:showImgs.map(src => ({type:'img' as const,src,uniform:true}))});
      lastShow = show;
    }
    const results = (lang === 'es' ? row.results_es : row.results_en).replace(/º/g, '');
    blocks.push({type:'p',parts:[row.dog_name],center:true}, {type:'p',parts:[results],center:true});
    const award = lang === 'es' ? row.award_es : row.award_en;
    if (award) {
      const [awardText = '', ...owner] = award.split(' · ');
      blocks.push({type:'p',parts:[awardText],heading:false,center:true});
      if (owner.length) blocks.push({type:'p',parts:[owner.join(' · ')],center:true});
    }
    const judge: Block = {type:'p',parts:[`${lang === 'es' ? 'Juez de Raza' : 'Breed Judge'}: ${lang === 'es' ? row.judge_es : row.judge_en}`],center:true};
    const seenAlbums = new Set<string>();
    const albumKey = (u: string) => u.match(/[?&]set=a\.(\d+)/)?.[0] ?? u;
    const links: Block[] = rows.filter(r => r.status === 'approved' && `${r.event_date}|${r.event_es}` === show)
      .map(r => r.source_url)
      .filter(src => { const k = albumKey(src); if (seenAlbums.has(k)) return false; seenAlbums.add(k); return true; })
      .map(src => ({type:'p',parts:[{text:lang === 'es' ? 'Ver exposición en Facebook' : 'View show on Facebook',href:src}],center:true}));
    pendingTail = [judge, ...links];
  }
  blocks.push(...pendingTail);
  return blocks;
}