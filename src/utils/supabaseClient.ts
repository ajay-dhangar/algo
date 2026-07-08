import { createClient } from '@supabase/supabase-js';

// Docusaurus requires client-side env vars to be prefixed, or exposed in docusaurus.config.js
// We use a placeholder to prevent the app from crashing during build or local dev without keys.
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'placeholder-anon-key';

const isNode = typeof window === 'undefined';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: !isNode,
  },
  global: {
    WebSocket: isNode ? require('ws') : undefined,
  },
});
