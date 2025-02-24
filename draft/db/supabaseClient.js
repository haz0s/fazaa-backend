// src/db/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const SUPABASE_URL = 'https://idcjhzycrfdzhnyxqnoy.supabase.co';
const SUPABASE_ANON_KEY = 'public-anon-key'; // Use environment variable in production

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
