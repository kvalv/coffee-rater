<script lang="ts">
    import { user } from "$lib/stores";
    import Modal from "../Modal.svelte";
    import type { definitions } from "src/types";
    import { formatDistance } from "date-fns";
    import { chain } from "underscore";
    import Rating from "$lib/Rating.svelte";
    type coffeeJoinRating = definitions["coffee"] & {
        rating: definitions["rating"][];
    };

    export let coffees: coffeeJoinRating[];
    let ratings = chain(coffees)
        .map((c) => c.rating)
        .flatten()
        .value();

    let addRatingModal: Modal;

    let average_ratings = chain(ratings)
        .groupBy((r) => r.coffee_id)
        .mapObject((v) => {
            if (v.length == 0) {
                return null;
            }
            return v.reduce((acc, r) => acc + r.rating, 0) / v.length;
        })
        .value();

    function ratingsForCoffee(c: definitions["coffee"]) {
        return chain(ratings).where({ coffee_id: c.id }).value();
    }

    function userDidRate(user: { id: string }, coffee: definitions["coffee"]) {
        return ratings.some(
            (r) => r.coffee_id == coffee.id && r.user_id == user?.id
        );
    }

    function readableTimestamp(c: definitions["coffee"]) {
        if (c.date == null) {
            return null;
        }
        return formatDistance(new Date(c.date), new Date(), {
            addSuffix: true,
        });
    }

    let selected_coffee: definitions["coffee"] = coffees[0];
    $: selected_existing_ratings = ratingsForCoffee(selected_coffee);
</script>

<Modal bind:this={addRatingModal} closeOnClickOutside={true}>
    <Rating
        coffee={selected_coffee}
        existing_ratings={selected_existing_ratings}
    />
</Modal>

<ul class="grid grid-cols-4 gap-4 p-24">
    {#each coffees as c}
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src={c.image} alt="Sunset in the mountains" />
            <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">{c.name}</div>
                <div class="italic mb-2">{c.producer}</div>
                <p class="text-gray-700 text-base">
                    Added {readableTimestamp(c)}, rated by {chain(
                        ratingsForCoffee(c)
                    )
                        .pluck("user_id")
                        .join(", ")}
                </p>
            </div>
            <div class="px-6 pt-4 pb-2">
                <span
                    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                    >{average_ratings[c.id] ||
                        "no one has rated this yet"}</span
                >
                {#if $user != null && userDidRate($user, c)}
                    <span
                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >You rated this 4.0</span
                    >
                {:else}
                    <span
                        on:click={() => {
                            selected_coffee = c;
                            addRatingModal.open();
                        }}
                        class="inline-block bg-gray-200 hover:bg-blue-500 hover:text-white transition hover:scale-110 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                        >+ Click to add rating</span
                    >
                {/if}
            </div>
        </div>
    {/each}
</ul>
