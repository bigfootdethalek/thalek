import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import type { Database } from '@/integrations/supabase/types';
import { exhibitionSchema } from './exhibitions';
import { z } from 'zod';

export const publicExhibitions = createServerFn({method:'GET'}).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']; const url = process.env['SUPABASE_URL'];
  if (!key || !url) throw new Error('No se pueden cargar las noticias');
  const client = createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const h=new Headers(init?.headers);if(h.get('Authorization')===`Bearer ${key}`&&key.startsWith('sb_'))h.delete('Authorization');h.set('apikey',key);return fetch(input,{...init,headers:h});}}});
  const {data,error}=await client.from('exhibitions').select('*').eq('status','approved').order('event_date',{ascending:false});
  if(error) throw new Error(error.message); return data;
});
export const reviewExhibitions = createServerFn({method:'GET'}).middleware([requireSupabaseAuth]).handler(async ({context}) => {
  const {data:editor,error:roleError}=await context.supabase.rpc('is_exhibition_editor');
  if(roleError || !editor) throw new Error('Esta cuenta no tiene permiso para revisar exposiciones.');
  const {data,error}=await context.supabase.from('exhibitions').select('*').order('event_date',{ascending:false});
  if(error) throw new Error(error.message);
  const {data:profile}=await context.supabase.from('profiles').select('*').eq('id',context.userId).maybeSingle();
  return {rows:data,profile};
});
export const saveExhibition = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>exhibitionSchema.parse(input)).handler(async ({data,context}) => {
  const {data:editor}=await context.supabase.rpc('is_exhibition_editor'); if(!editor) throw new Error('Sin permiso de edición');
  const {data:row,error}=await context.supabase.from('exhibitions').update({...data,updated_at:new Date().toISOString()}).eq('id',data.id).select().single();
  if(error) throw new Error(error.message); return row;
});
export const saveReviewerProfile = createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator(input=>z.object({display_name:z.string().trim().max(100)}).parse(input)).handler(async ({data,context})=>{
  const {error}=await context.supabase.from('profiles').upsert({id:context.userId,display_name:data.display_name}); if(error) throw new Error(error.message);return {ok:true};
});