import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY || '';

console.log('Supabase URL:', supabaseUrl);
export const supabase = createClient(supabaseUrl, supabaseKey);