import {describe,it,expect} from 'vitest';
import {exhibitionBlocks,exhibitionSchema,type Exhibition} from '@/lib/exhibitions';
const row:Exhibition={id:'00000000-0000-4000-8000-000000000001',event_date:'2026-09-13',event_es:'Muskiz',event_en:'Muskiz',dog_name:'Oreo',results_es:'CAC, CACIB, BOS',results_en:'CAC, CACIB, BOS',judge_es:'Istvan Orcik',judge_en:'Istvan Orcik',award_es:'',award_en:'',image_url:'', extra_images: [],source_url:'https://www.facebook.com/photo/?fbid=123',status:'draft',updated_at:'2026-11-02T16:00:00Z'};
describe('Exhibition review',()=>{
 it('does not show unapproved exhibitions in public news',()=>{expect(exhibitionBlocks([row],'es')).toEqual([]);});
 it('shows approved exhibitions with their actual event date',()=>{const blocks=exhibitionBlocks([{...row,status:'approved'}],'es');expect(blocks[0]).toEqual({type:'p',parts:['Muskiz. 13.09.2026'],variant:'title'});});
 it('lists several dogs from the same show under one title',()=>{const b=exhibitionBlocks([{...row,status:'approved'},{...row,id:'00000000-0000-4000-8000-000000000002',dog_name:'Thunder',status:'approved'}],'es');expect(b.filter(x=>x.type==='p'&&x.variant==='title').length).toBe(1);});
 it('rejects invalid event dates before saving',()=>{expect(exhibitionSchema.safeParse({...row,event_date:'2026-02-30'}).success).toBe(false);});
});