<script>
    import "../app.css";
    import { name, user } from "$lib/stores";
    import supabase, { signout } from "$lib/db";
    import { SvelteToast } from "@zerodevx/svelte-toast";
    import { Icon } from "@steeze-ui/svelte-icon";
    import { Logout } from "@steeze-ui/heroicons";
    import { capitalize } from "$lib/utils";

    $user = supabase.auth.user();
    let sub = supabase.auth.onAuthStateChange(async (x, session) => {
        $user = session?.user || null;
        if ($user == null) return;
        let { data, error } = await supabase
            .from("profile")
            .select("name")
            .match({ id: $user?.id });
        if (error) {
            console.log("got error when trying to fetch profile data", error);
        } else {
            if (Array.isArray(data)) {
                $name = capitalize(data[0].name);
            } else {
                $name = capitalize(data.name);
            }
        }
    }).data;
</script>

<SvelteToast />
<div class="bg-c4 min-h-screen py-0 my-0 mx-auto">
    <!-- <Notifications> -->
    <nav
        class="bg-c1 px-2 h-12 flex text-white flex-row flex-none flex-nowrap justify-between items-center"
    >
        <a href="/">Bula Coffee Rater Club</a>

        {#if !$user}
            <form method="get" action="/login">
                <input
                    type="submit"
                    class="bg-c2 text-white py-1 px-1 rounded-sm"
                    value="log in"
                />
            </form>
        {:else}
            <div class="flex gap-1">
                <div>{$name || "unknown user"}</div>
                <div on:click={signout}>
                    <Icon src={Logout} class="text-gray-400 h-6" />
                </div>
            </div>
        {/if}
    </nav>

    <div class="">
        <slot />
    </div>
    <!-- </Notifications> -->
</div>
