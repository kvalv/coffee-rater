import type { User } from '@supabase/supabase-js';
import { writable, type Writable } from 'svelte/store';

export const user: Writable<User | null> = writable(null);
export const name: Writable<string|undefined> = writable(undefined);

export const authStateNotifierId: Writable<string|null> = writable(null);
