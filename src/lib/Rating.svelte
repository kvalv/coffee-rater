<script lang="ts">
    import type { definitions } from "src/types";
    import { user } from "$lib/stores";
    import supabase from "./db";

    export let coffee: definitions["coffee"];
    export let existing_ratings: definitions["rating"][];

    // let rating: Record<string, number> = {};
    let rating: number;

    let items = [
        { key: "rating", title: "overall rating" },
        // { key: "description", title: "description"},
        // { key: "aroma", title: "aroma" },
        // { key: "body", title: "body" },
        // { key: "flavor", title: "flavor" },
        // { key: "aftertaste", title: "aftertaste" },
        // { key: "with_milk", title: "with milk" },
    ];

    async function addNewRatingToDatabase() {
        if ($user?.id == null) {
            console.log("error; user is null, cannot create new rating.");
            return;
        }
        let sql_row = {
            profile_id: $user?.id,
            coffee_id: coffee.id,
            rating,
            // ...rating,
        };
        const res = await supabase.from("rating").insert([sql_row]);
        if (res.error) {
            alert(
                `error on creating rating: ${res.error.message} (coffee_id=${coffee.id})`
            );
            console.log(res.error, res);
            return;
        }
    }

    $: can_submit_rating = !(rating == undefined);
</script>

<div class="w-96 flex flex-col gap-2 py-4 px-4 border shadow-lg rounded-md bg-white">
    <div class="my-3 text-center">
        <div class="mx-auto flex items-center justify-center">
            <p class="text-sm text-gray-500">
                Add rating for {coffee.name} by {coffee.producer}
            </p>
        </div>
    </div>

    <div>
        <label>
            <div class="">
            <span class="font-light text-gray-500">rating</span>
            <span class="font-normal text-red-500" class:hidden={rating != undefined}>(required!)</span>
            </div>
            <input bind:value={rating} type="range" min="0" max="10" />
        </label>
    </div>
    <div class="">
        <label class="flex flex-col">
            <p class="font-light text-gray-500">description (optional)</p>
            <textarea
                rows={2}
                class="rounded-md border border-c1 "
            />
        </label>
    </div>
    <!-- <input type="text"> -->
    <button
        on:click={addNewRatingToDatabase}
        class="place-self-end rounded-md hover:scale-110 transition px-4 py-2 bg-c1 left-4 disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-blue-700 text-white font-bold shadow"
        disabled={!can_submit_rating}>Add rating</button
    >
</div>
