<script lang="ts">
    import { Icon } from "@steeze-ui/svelte-icon";
    import Modal from "$lib/Modal.svelte";
    import { createEventDispatcher } from "svelte";

    export let text: string;
    export let icon: string | null = null;
    export let klass: string;
    export let confirm: boolean = false;

    let x;
    let modal: Modal | null;
    let didConfirm: boolean = false;

    $: if (didConfirm) {
        dispatch("click");
        modal?.close();
    }

    import("@steeze-ui/heroicons").then((mod) => {
        if (icon != null) {
            x = mod[icon];
        }
    });

    const dispatch = createEventDispatcher();
    function handleClick() {
        if (confirm) {
            modal?.open();
            // reactive statement if user confirms
        } else {
            dispatch("click");
        }
    }

    // let confirm_fn = (...args) =>
</script>

<!-- <Confirm -->
<button
    on:click={handleClick}
    class={`flex flex-row text-white shadow-md items-center align-middle bg-c3 px-2 py-1 rounded-md ${klass}`}
>
    <p>{text}</p>
    {#if x != undefined}
        <Icon src={x} class="pl-2 grow-0 h-4" />
    {/if}
</button>

{#if confirm}
    <Modal closeOnClickOutside={true} bind:this={modal}>
        <div class="bg-white flex flex-col rounded-md">
            <div class="flex flex-col space-y-4">
                <p class="font-bold tracking-wide">Delete this item?</p>
                <p class="tracking-wide">This can't be undone</p>
            </div>
            <div class="flex flex-row">
                <button
                    class="bg-gray-200 p-2 justify-self-end self-center"
                    on:click={() => {
                        didConfirm = true;
                    }}>cancel</button
                >
                <button
                    class="bg-c2 p-2 justify-self-end self-center"
                    on:click={() => {
                        didConfirm = true;
                    }}>>OK</button
                >
            </div>
        </div>
    </Modal>
{/if}
