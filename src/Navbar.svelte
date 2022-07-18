<script lang="ts">
    export let username: string | null;
    import SignOut from "./SignOut.svelte";

    $: txt = username && `signed in as ${username}` || "not logged in";
</script>

<nav class="bg-c1 text-c4 border-gray-200 px-2 pb-4 dark:bg-gray-800 overflow-hidden">
    <div
        class="container flex flex-row flex-none flex-nowrap justify-between items-center mx-auto"
    >
        <a href="/" class="flex items-center">
            <span
                class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
                >Bula Coffee Rater Club</span
            >
        </a>
        <div class="justify-self-end">
            <p class="block py-2 pr-4 pl-3 ">{txt}</p>
        </div>
        <div class="justify-self-end">
            <SignOut />
        </div>
    </div>
</nav>
