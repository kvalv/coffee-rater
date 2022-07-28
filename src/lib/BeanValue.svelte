<script lang="ts">
    export let value: number;

    let beans = new Array(5);

    let fill_fn = (i) => {
        if ((value % 1 > 0) && (Math.ceil(value) == i+1)) {
            return `fill-[url(#grad)]`
            // return "fill-[url(#grad)]";
        }
        if (i + 1 < value) {
            return "fill-c1"
        } else if ( i+1 == value) {
            return "fill-c2";
        } else {
            return "fill-gray-300"
        }
    }

    console.log(value, value%1)
</script>

<div class="flex flex-row items-center gap-x-1 ">
    {#each beans as b, i}
        <svg class="h-5 text-gray-300" viewBox="0 0 10 10 ">
            <defs>
                <linearGradient id={`grad`}>
                    <stop offset={value%1} stop-color="c1" />
                    <stop offset={value%1} stop-color="currentColor" />
                </linearGradient>
            </defs>
            <circle
                class={fill_fn(i)}
                bind:this={b}
                cx="5"
                cy="5"
                r="5"
            />
        </svg>
    {/each}
    <p class="text-center font-bold text-gray-500">{value.toFixed(2)}</p>
</div>
