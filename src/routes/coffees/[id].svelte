<script lang="ts">
    import supabase from "$lib/db";
    import { notify } from "$lib/notify";
    import { user } from "$lib/stores";

    export let name: string;
    export let id: string;
    export let producer: string;
    export let image: string;
    export let date: string;
    export let profile_id: string;
    export let rating: { rating: number; profile: { name: string } };
</script>

<div class="grid grid-col gap-4 justify-center mx-auto my-8">
    <div class="inline-block">
        <span class="font-bold text-lg tracking-wider">{name}</span>
        <span class="font-thin text-lg tracking-wider">by {producer}</span>
    </div>
    <button
        disabled={profile_id != $user?.id}
        class="rounded-full px-2 py-1 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed text-white bg-c1"
        on:click={async () => {
            const { data, error } = await supabase
                .from("coffee")
                .delete()
                .match({ id });
            if (error) {
                notify(error.message, "danger", 4000);
            } else {
                notify("deleted coffee", "success", 4000);
            }
        }}>Delete coffee</button
    >
</div>
