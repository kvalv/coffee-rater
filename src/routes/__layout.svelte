<script>
    import "../app.css";
    import { user } from "$lib/stores";
    import supabase from "$lib/db";
    import Navbar from "../Navbar.svelte";

    $user = supabase.auth.user();
    supabase.auth.onAuthStateChange((x, session) => {
        $user = session?.user || null;
        console.log("received onAuthStateChange -- set user to ", x, $user);
    });
</script>

<Navbar />

<div class="container bg-gray-50 mx-auto">
    <slot />
</div>
