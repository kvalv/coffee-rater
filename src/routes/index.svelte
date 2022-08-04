<script lang="ts">
    import { user } from "$lib/stores";
    import Card from "$lib/Card.svelte";
    import { PlusCircle } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { getHashParameters } from "$lib/utils";

    type coffeeData = {
        id: string;
        name: string;
        s: number;
        producer: string;
        image: string;
    };
    export let coffees: coffeeData[];

    console.log("user is", $user);

    $: if ($page.url.hash.includes("access_token")) {
        let result = getHashParameters($page.url.hash.substring(1));
        localStorage.setItem("a", JSON.stringify(result));
        goto(`/reset-${result.access_token}`);
    }

</script>

<svelte:head>
    <title>Bula Coffee Rater Club</title>
</svelte:head>

<div class="mt-8 flex flex-wrap gap-8 justify-center items-start lex-none">
    {#each coffees as c}
        <Card
            id={c.id}
            title={c.name}
            subtitle={c.producer}
            badge={{ text: c.s ? c.s.toFixed(2) : "?" }}
            media={c.image}
        />
    {/each}
</div>

<div class="fixed bottom-2 right-0 pb-8 pr-8 hover:scale-110">
    <a href="/coffees/create">
        <button
            class="flex flex-row text-white items-center bg-c3 align-middle gap-x-2 rounded-full py-1 px-3"
        >
            <Icon src={PlusCircle} class="grow-0 w-4 h-4" />
            <p class="tracking-wide font-bold">New</p>
        </button>
    </a>
</div>
