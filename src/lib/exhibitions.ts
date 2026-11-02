import { z } from 'zod';
import type { Block, Lang } from './content';
import type { Tables } from '@/integrations/supabase/types';

export type Exhibition = Tables<'exhibitions'>;
const text = z.string().trim().min(1).max(500);
export const exhibitionSchema = z.object({
  id: z.string().uuid(), event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(v => !Number.isNaN(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v),
  event_es: text, event_en: text, dog_name: text, results_es: text, results_en: text,
  award_es: z.string().trim().max(500), award_en: z.string().trim().max(500), judge_es: text, judge_en: text,
  image_url: z.string().refine(v => v === '' || v.startsWith('/__l5e/assets-v1/') || /^https:\/\//.test(v)),
  source_url: z.string().url().refine(v => new URL(v).hostname === 'www.facebook.com'), status: z.enum(['draft','approved']),
});
export function exhibitionBlocks(rows: Exhibition[], lang: Lang): Block[] {
  const blocks: Block[] = [];
  for (const row of rows.filter(r => r.status === 'approved').sort((a,b) => b.event_date.localeCompare(a.event_date))) {
    if (blocks.length) blocks.push({type:'divider'});
    const date = row.event_date.split('-').reverse().join('.');
    blocks.push({type:'p',parts:[`${lang === 'es' ? row.event_es : row.event_en}. ${date}`]}, {type:'p',parts:['SHIH TZU'],heading:true,noSplit:true}, {type:'p',parts:[`${row.dog_name}: ${lang === 'es' ? row.results_es : row.results_en}`]});
    const award = lang === 'es' ? row.award_es : row.award_en;
    if (award) blocks.push({type:'p',parts:[award],heading:false});
    blocks.push({type:'p',parts:[`${lang === 'es' ? 'Juez de Raza' : 'Breed Judge'}: ${lang === 'es' ? row.judge_es : row.judge_en}`]});
    if (row.image_url) blocks.push({type:'gallery',items:[{type:'img',src:row.image_url,uniform:true}]});
    blocks.push({type:'p',parts:[{text:lang === 'es' ? 'Ver exposición en Facebook' : 'View show on Facebook',href:row.source_url}]});
  }
  return blocks;
}