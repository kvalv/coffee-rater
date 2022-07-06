<script lang="ts">
    import type { definitions } from "src/types";
    import { user } from "$lib/stores";
    import supabase from "./db";

    export let coffee: definitions["coffee"];
    export let existing_ratings: definitions["rating"][];

    let rating: Record<string, number> = {};

    let items = [
        { key: "rating", title: "overall rating" },
        { key: "aroma", title: "aroma" },
        { key: "body", title: "body" },
        { key: "flavor", title: "flavor" },
        { key: "aftertaste", title: "aftertaste" },
        { key: "with_milk", title: "with milk" },
    ];

    async function addNewRatingToDatabase() {
        if ($user?.id == null) {
            console.log("error; user is null, cannot create new rating.")
            return;
        }
        let sql_row = { user_id: $user?.id, coffee_id: coffee.id, ...rating}
        const res = await supabase.from("rating").insert([sql_row]);
        if (res.error) {
            alert("error on creating rating")
            console.log(res.error, res)
            return
        }

    }

    $: has_rated = existing_ratings.some((r) => r.user_id == $user?.id);
</script>

<div class="w-96 py-4 px-4 border shadow-lg rounded-md bg-white">
    <div class="my-3 text-center">
        <div class="mx-auto flex items-center justify-center">
            <p class="text-sm text-gray-500">
                Add rating for {coffee.name} by {coffee.producer}
            </p>
        </div>
    </div>

    <div class="flex items-center border-indigo-600 rounded-lg ">
        <div class="flex flex-col ">
            {#each items as { key, title }}
                <label class="block">
                    <span class="text-sm font-medium text-slate-700"
                        >{title}</span
                    >
                    <input
                        type="range"
                        min="0"
                        max="10"
                        bind:value={rating[key]}
                        step="0.25"
                        class="mt-1"
                        name={key}
                    />
                    <span class="">{rating[key]}</span>
                </label>
            {/each}
        </div>
    </div>
    <button
        on:click={addNewRatingToDatabase}
        class="rounded-full hover:scale-110 transition relative px-4 py-2 left-4 disabled:bg-gray-500 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-700 text-white font-bold shadow"
        disabled={has_rated}>Add rating</button
    >
</div>
