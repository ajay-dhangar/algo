import { createClient } from '@supabase/supabase-js';
import siteConfig from '@generated/docusaurus.config';

const { customFields = {} } = siteConfig;
const supabaseUrl = (customFields.SUPABASE_URL as string) || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = (customFields.SUPABASE_ANON_KEY as string) || 'placeholder-anon-key';

const isNode = typeof window === 'undefined';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: !isNode,
  },
  realtime: {
    transport: isNode ? require('ws') : undefined,
  },
});
