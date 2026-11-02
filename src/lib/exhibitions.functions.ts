import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

export const publicExhibitions = createServerFn({method:'GET'}).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY']; const url = process.env['SUPABASE_URL'];
  if (!key || !url) throw new Error('No se pueden cargar las noticias');
  const client = createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{const h=new Headers(init?.headers);if(h.get('Authorization')===`Bearer ${key}`&&key.startsWith('sb_'))h.delete('Authorization');h.set('apikey',key);return fetch(input,{...init,headers:h});}}});
  const {data,error}=await client.from('exhibitions').select('*').eq('status','approved').order('event_date',{ascending:false});
  if(error) throw new Error(error.message); return data;
});
