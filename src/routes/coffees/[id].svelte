<script lang="ts">
    import { goto, invalidate } from "$app/navigation";

    import { page } from "$app/stores";

    import BeanValue from "$lib/BeanValue.svelte";
    import supabase from "$lib/db";
    import { notify } from "$lib/notify";
    import { user } from "$lib/stores";
    import { capitalize } from "$lib/utils";
    import { Trash } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
    import { formatDistance, format, addMinutes, parseISO } from "date-fns";

    export let error;
    if (error) {
        console.error(error);
    }

    export let name: string;
    export let producer: string;
    export let image: string;
    export let date: string;
    export let profile_id: string;
    export let rating: {
        id: string;
        rating: number;
        profile: { id: string; name: string };
        description: string;
        date: string;
    }[];

    function dformat(r) {
        let a = (a) => addMinutes(a, a.getTimezoneOffset()); // hack to get proper time diff
        if (r.date != null) {
            return formatDistance(new Date(r.date), a(new Date()), {
                addSuffix: true,
            });
        } else {
            return "unknown date...";
        }
    }

    async function delete_coffee() {
        let res = await supabase
            .from("coffee")
            .delete()
            .match({ id: $page.params.id });
        goto("/");
        if (res.error) {
            notify(res.error.message, "danger");
        } else {
            notify("deleted coffee", "success");
        }
    }

    async function delete_rating() {
        const res = await supabase
            .from("rating")
            .delete()
            .match({ coffee_id: $page.params.id, profile_id: $user?.id });
        invalidate(`/coffees/${$page.params.id}`);
        goto(`/coffees/${$page.params.id}`);
        if (res.error) {
            notify(res.error.message, "danger");
        } else {
            notify("deleted rating", "success");
        }
    }

    $: disabled = rating.some((r) => r.profile.id == $user?.id);
</script>

<div class="flex flex-col gap-4 bg-white justify-center mx-4 rounded-sm my-8">
    <div class="flex flex-row justify-between">
        <div class="flex flex-col gap-1 ml-4 mt-4">
            <p class="font-bold text-lg tracking-wider">{name}</p>
            <p class="font-thin text-lg tracking-wider">{producer}</p>
        </div>
        {#if profile_id == $user?.id}
            <div
                class="self-center mr-2"
                on:click={async () => await delete_coffee()}
            >
                <Icon src={Trash} class="h-8 text-gray-400" />
            </div>
        {/if}
    </div>

    <button
        {disabled}
        class="text-center disabled:bg-gray-500 mt-8 py-2 self-center text-white font-bold bg-c2 w-[100%] place-self-end"
        on:click={() => {
            location.href = `${$page.params.id}-rate`;
        }}
    >
        {disabled ? "Already checked in" : "Check-In"}
    </button>

    <div class="flex flex-col gap-1 px-2 border border-c2 w-[100%]">
        {#each rating.sort((a, b) => new Date(b.date) - new Date(a.date)) as r}
            <div class="flex flex-row justify-between">
                <div class="flex flex-col gap-1 my-2">
                    <div>
                        <span class="font-bold"
                            >{capitalize(r.profile.name) || "no name"}</span
                        ><span>, {dformat(r)}</span>
                    </div>
                    {#if r.description}
                        <p class="">{r.description}</p>
                    {/if}
                    <BeanValue value={r.rating} />
                </div>
                {#if r.profile.id == $user?.id}
                    <div
                        on:click={async () => await delete_rating()}
                        id="remove"
                        class="self-center"
                    >
                        <Icon src={Trash} class="h-8 text-gray-400" />
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</div>
