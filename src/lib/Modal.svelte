<script lang="ts">
    import { onMount } from "svelte";

    let modal: HTMLDivElement;
    let content: HTMLElement;

    let opened: boolean = false
    export let closeOnClickOutside: boolean = false;
    export let close_hook: () => void = () => {};

    export function close() {
        modal.style.display = "none";
        content.setAttribute("hidden", "true");
        opened = false
        close_hook()
    }

    export function open() {
        modal.style.display = "block";
        opened = true
        content.removeAttribute("hidden");
    }

    function clickOutside(node: HTMLElement) {
        const handleClick = (event) => {
            if (!node.contains(event.target)) {
                node.dispatchEvent(new CustomEvent("outclick"));
            }
        };

        document.addEventListener("click", handleClick, true);

        return {
            destroy() {
                document.removeEventListener("click", handleClick, true);
            },
        };
    }
</script>

<!-- overlay effect -->
<div
    class="fixed hidden inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
    bind:this={modal}
/>

<!--modal content-->
<div

    class="fixed flex place-content-center items-center inset-0 z-[9999999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
    use:clickOutside
    on:outclick={() => {
        if (closeOnClickOutside) {
            close();
        }
    }}
    bind:this={content}
    class:hidden={!opened}
>

    <slot>
    </slot>

</div>
