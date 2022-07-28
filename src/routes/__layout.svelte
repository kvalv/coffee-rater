<script>
    import "../app.css";
    import { name, user } from "$lib/stores";
    import supabase from "$lib/db";
    import Navbar from "../Navbar.svelte";
    import Notifications from "svelte-notifications";
    import { SvelteToast } from "@zerodevx/svelte-toast";

    $user = supabase.auth.user();
    let sub = supabase.auth.onAuthStateChange(async (x, session) => {
        $user = session?.user || null;
        if ($user == null) return;
        let { data, error } = await supabase
            .from("profile")
            .select("name")
            .match({ id: $user?.id });
        console.log('got data...', data)
        if (error) {
            console.log("got error when trying to fetch profile data", error);
        } else {
            if (Array.isArray(data)) {
                $name = data[0].name;
            } else {
                $name = data.name
            }
        }
    }).data;
</script>

<SvelteToast />
<div class="bg-c4 min-h-screen py-0 my-0 mx-auto">
    <!-- <Notifications> -->
    <Navbar username={$user?.email} />

    <div class="">
        <slot />
    </div>
    <!-- </Notifications> -->
</div>
