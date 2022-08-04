import type { User } from "@supabase/supabase-js";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

import { browser } from "$app/env";

export const user: Writable<User | null> = writable(null);
// export const name: Writable<string | undefined> = writable(undefined);

function localStorageStore(key: string) {
    let v0 = null;
    if (browser) {
        v0 = localStorage.getItem(key);
    }
    const s = writable<string | null>(v0);
    if (browser) {
        s.subscribe((v) => localStorage.setItem(key, v));
    }
    return s;
}
export const name = localStorageStore("name2");

export const authStateNotifierId: Writable<string | null> = writable(null);
