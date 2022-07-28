import dotenv from "dotenv";
import { goto } from "$app/navigation";
import { notify } from "$lib/notify";

import { createClient } from "@supabase/supabase-js";

const supabase_anon_key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const project_url = import.meta.env.VITE_SUPABASE_PROJECT_URL;

if (supabase_anon_key == null || project_url == null) {
    console.log(
        "supabase_anon_key = ",
        supabase_anon_key,
        "project_url=",
        project_url
    );
    throw "unable to fetch supabase key / url, cannot proceed";
}
const supabase = createClient(project_url, supabase_anon_key);

export default supabase;

export function getPublicUrlForBlob(p: string | null) {
    if (p == null) {
        return;
    }

    if (p.endsWith(".blob")) {
        if (p.startsWith("images/")) {
            // for some reason, it adds images to the url which gives a 404...
            p = p.replace(/^images/, "");
        }
        let r = supabase.storage.from("images").getPublicUrl(p);
        if (r.error != null) {
            console.error(r.error);
            return undefined;
        }
        // return "https://nkcfpjmzqpbdlmseyilr.supabase.co/storage/v1/object/public/images/public/d92fb7d7-ba57-434a-8f1a-ad948062aab6.blob"
        return r?.data?.publicURL;
    }
}

export async function signout() {
    let { error } = await supabase.auth.signOut();
    if (error) {
        console.error(error);
        notify(error.message, "danger");
    } else {
        notify("you signed out", "success");
        goto("/");
    }
}
