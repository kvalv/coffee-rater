<script>
    import "../app.css";
    import { user } from "$lib/stores";
    import supabase from "$lib/db";
    import Navbar from "../Navbar.svelte";
    import Notifications from "svelte-notifications";

    $user = supabase.auth.user();
    supabase.auth.onAuthStateChange((x, session) => {
        $user = session?.user || null;
        // console.log("received onAuthStateChange -- set user to ", x, $user);
    });
</script>

<div class="bg-c4 min-h-screen py-0 my-0 mx-auto">
<Notifications>
    <Navbar username={$user?.email} />

    <div class="">
        <slot />
    </div>
</Notifications>
        </div>
