import dotenv from 'dotenv'

import { createClient } from "@supabase/supabase-js";

const supabase_anon_key = import.meta.env.VITE_SUPABASE_ANON_KEY
const project_url = import.meta.env.VITE_SUPABASE_PROJECT_URL

if (supabase_anon_key == null || project_url == null) {
    console.log('supabase_anon_key = ', supabase_anon_key, 'project_url=' , project_url) 
    throw 'unable to fetch supabase key / url, cannot proceed'
}
const supabase = createClient(
    project_url,
    supabase_anon_key
);

export default supabase
