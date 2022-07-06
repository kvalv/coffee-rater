
import { createClient } from "@supabase/supabase-js";

const supabase_anon_key = process.env.SUPABASE_ANON_KEY
const project_url = process.env.SUPABASE_PROJECT_URL

if (supabase_anon_key == null || project_url == null) {
    throw 'unable to fetch supabase key / url, cannot proceed'
}
const supabase = createClient(
    project_url,
    supabase_anon_key
);

export default supabase
