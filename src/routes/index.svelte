<script lang="ts">
    import { user } from "$lib/stores";
    import Modal from "$lib/Modal.svelte";
    import type { definitions } from "src/types";
    import { chain } from "underscore";
    import Rating from "$lib/Rating.svelte";
    import Card from "../Card.svelte";
    import { PlusCircle } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
    import NewCoffee from "../NewCoffee.svelte";
    import supabase from "$lib/db";
    // type coffeeJoinRating = definitions["coffee"] &
    //     { rating: definitions["rating"] & { profile: { name: string } } }[];

    type coffeeData = {id: string, name: string, s: number, producer: string, image: string}
    export let coffees: coffeeData[]
    // export let coffees: coffeeJoinRating[];
    let ratings = chain(coffees)
        .map((c) => c.rating)
        .flatten()
        .value();

    console.log("user is", $user);
    supabase.rpc("fetch_cardinfo").then(console.log);

    let addRatingModal: Modal;
    let addCoffeeModal: Modal;

    function ratingsForCoffee(c: definitions["coffee"]) {
        return chain(ratings).where({ coffee_id: c.id }).value();
    }

    function cardfields_for_coffee(c: coffeeData) {
        // let badge_text;
        // if (c.rating.length > 0) {
        //     let avg_rating =
        //         chain(c.rating)
        //             .reduce((acc, r) => acc + r.rating, 0)
        //             .value() / c.rating.length;
        //     badge_text = avg_rating.toFixed(2);
        // } else {
        //     badge_text = "unrated";
        // }

        return {
            id: c.id,
            title: c.name,
            subtitle: c.producer,
            badge: { text: c.s ?  c.s.toFixed(2) : "?"},
            media: c.image,
        };
    }

    let selected_coffee: definitions["coffee"] = coffees[0];
    $: selected_existing_ratings = ratingsForCoffee(selected_coffee);
</script>

<svelte:head>
    <title>Bula Coffee Rater Club</title>
</svelte:head>

<div class="mt-8 flex flex-wrap gap-8 justify-center items-start lex-none">
    {#each coffees as c}
        <Card
            {...cardfields_for_coffee(c)}
            on:rateclick={() => {
                selected_coffee = c;
                addRatingModal.open();
            }}
        />
    {/each}
</div>

<div class="fixed bottom-2 right-0 pb-8 pr-8 hover:scale-110">
    <button
        class="flex flex-row text-white items-center bg-c3 align-middle gap-x-2 rounded-full py-1 px-3"
        on:click={addCoffeeModal.open}
    >
        <Icon src={PlusCircle} class="grow-0 w-4 h-4" />
        <p class="tracking-wide font-bold">New</p>
    </button>
</div>

<Modal bind:this={addCoffeeModal} closeOnClickOutside={true}>
    <NewCoffee on:coffeeAdded={addCoffeeModal.close} />
</Modal>

<Modal bind:this={addRatingModal} closeOnClickOutside={true}>
    <Rating
        coffee={selected_coffee}
        existing_ratings={selected_existing_ratings}
    />
</Modal>
