<script lang="ts">
    import supabase from "$lib/db";
    import { Camera } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
    import CameraComp from "./Camera.svelte";
    import { v4 as uuidv4 } from "uuid";

    import { notify } from "$lib/notify";
    import { createEventDispatcher } from "svelte";
    import Modal from "./Modal.svelte";
    let dispatch = createEventDispatcher();

    let name: string;
    let producer: string;
    let image: string | null = null;
    let c: CameraComp;
    let modal: Modal;
</script>

<div class="flex flex-col bg-white p-4 rounded-lg gap-2">
    <p class="font-light text-lg tracking-wide py-2 ">register a new coffee</p>
    <label class="flex place-content-between space-x-2">
        <p>producer</p>
        <input
            placeholder="e.g. Kjeldsberg..."
            class="pl-2 placeholder:italic placeholder:text-slate-400 border-c3 border-2 rounded-lg"
            bind:value={producer}
            type="text"
        />
    </label>

    <label class="flex place-content-between space-x-2">
        <p>name</p>
        <input
            placeholder="e.g. dark roast..."
            class="pl-2 placeholder:italic placeholder:text-slate-400 border-c3 border-2 rounded-lg"
            bind:value={name}
            type="text"
        />
    </label>

    <div class="flex flex-row justify-between">
        <div
            on:click={async () => {
                modal.open();
                await c.open();
            }}
        >
            <Icon src={Camera} class="w-4 h-4" />
        </div>
        <button
            class="place-self-end py-1 px-2 bg-c3 shadow-md text-white font-strong rounded-md cursor-pointer"
            on:click={async () => {
                if (name == "" || producer == "") {
                    notify(
                        "name and producer must be specified",
                        "danger",
                        400
                    );
                    return;
                }

                const resp = await supabase
                    .from("coffee")
                    .insert([{ name, producer, image :image || null}]);
                if (resp.error == null) {
                    dispatch("coffeeAdded", {});
                    notify("added coffee. Please refresh :o", "success", 4000);
                } else {
                    notify(
                        `Unable to add coffee. Reason: '${resp.error.message}'`,
                        "danger",
                        4000
                    );
                }
            }}>Submit</button
        >
    </div>
</div>

<Modal bind:this={modal} closeOnClickOutside={true}>
    <CameraComp
        bind:this={c}
        on:photoCaptured={async ({ detail: { blob } }) => {
            modal.close();

            let fname = `public/${uuidv4()}.blob`;
            let r = await supabase.storage.from("images").upload(fname, blob);
            if (r.error != null) {
                console.error(r.error.message, r);
            }

            image = r?.data?.Key;
            if (image == undefined) {
                console.error("expected image to be set, but it is not");
            }

            // let blob = e.detail.blob
        }}
    />
</Modal>
