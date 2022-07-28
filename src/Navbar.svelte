<script lang="ts">
import { goto } from "$app/navigation";

    import supabase from "$lib/db";
import { notify } from "$lib/notify";

    import { user, name } from "$lib/stores";

    export let username: string | null;

    $: txt = (username && `signed in as ${$name}`) || "not logged in";
    async function signout() {
        let {error} = await supabase.auth.signOut();
        if (error) {
            console.error(error)
            notify(error.message, "danger")
        } else {
            notify("you signed out", "success")
            goto("/")
        }

    }
</script>

<nav
    class="bg-c1 text-c4 border-gray-200 px-2 pb-4 dark:bg-gray-800 overflow-hidden"
>
    <div
        class="container flex flex-row flex-none flex-nowrap justify-between items-center mx-auto"
    >
        <a href="/" class="flex items-center">
            <span
                class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
                >Bula Coffee Rater Club</span
            >
        </a>
        <div class="justify-self-end">
            <p class="block py-2 pr-4 pl-3 ">{txt}</p>
        </div>
        <div class="justify-self-end">
            {#if !$user}
                <form method="get" action="/login">
                    <input
                        type="submit"
                        class="bg-c2 text-white py-1 px-1 rounded-sm"
                        value="sign in"
                    />
                </form>
            {:else}
                <button
                    on:click={signout}
                    class="bg-c2 text-white py-1 px-1 rounded-sm"
                >
                    <p>sign out</p>
                </button>
            {/if}

            <!-- <SignOut /> -->
        </div>
    </div>
</nav>
