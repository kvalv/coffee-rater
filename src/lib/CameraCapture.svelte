<script lang="ts">
    import Modal from "./Modal.svelte";

    import CameraComp from "$lib/Camera.svelte";
    import { v4 as uuidv4 } from "uuid";
    import supabase, { getPublicUrlForBlob } from "./db";
import { createEventDispatcher } from "svelte";

    let modal: Modal;
    let c: CameraComp;

    export let uploadOnCapture: boolean;

    export async function open() {
        modal.open()
        await c.open()
    }
    export function close() {
        modal.close()
    }
    let dispatch = createEventDispatcher()
</script>

<Modal close_hook={() => {console.log('hook!'); c.close()}} bind:this={modal} closeOnClickOutside={true}>
    <CameraComp
        width="100vw"
        height="50vh"
        bind:this={c}
        on:photoCaptured={async ({ detail: { blob } }) => {
            modal.close();

            let fname = `public/${uuidv4()}.blob`;
            let r = await supabase.storage.from("images").upload(fname, blob);
            if (r.error != null) {
                console.error(r.error.message, r);
            }

            let url = getPublicUrlForBlob(r?.data?.Key);
            dispatch("capture", {url: url})
        }}
    />
</Modal>
