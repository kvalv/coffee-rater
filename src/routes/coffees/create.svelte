<script lang="ts">
    import { goto } from "$app/navigation";

    import CameraCapture from "$lib/CameraCapture.svelte";
    import supabase from "$lib/db";
    import { notify } from "$lib/notify";
    import { Camera } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";

    let producer: string;
    let name: string;
    let description: string;

    let cap: CameraCapture;
    let url: string | null = null;

    async function submit() {
        let r = await supabase
            .from("coffee")
            .insert([{ name, producer, image: url, description }]);
        if (r.error) {
            notify(`unable to create coffee: ${r.error.message}`, "danger");
            goto("/");
            return;
        }
        notify("coffee created", "success");
        console.log("coffee...", r);
        let id = r.data[0].id;
        goto(`/coffees/${id}`);
    }
</script>

<div>
    <CameraCapture
        bind:this={cap}
        uploadOnCapture={true}
        on:capture={(e) => {
            url = e.detail.url;
        }}
    />
</div>

<form
    on:submit|preventDefault={submit}
    class="flex flex-col bg-white "
    id="form"
>
    <form class="px-2 py-2">
        <p class="font-light text-gray-500">name</p>
        <input
            class="border border-c1 rounded-md"
            type="textnode"
            bind:value={name}
        />
    </form>
    <form class="px-2 py-2">
        <p class="font-light text-gray-500">producer</p>
        <input
            class="border border-c1 ounded-md"
            type="text"
            bind:value={producer}
        />
    </form>

    <div class="px-2 py-2">
        <p class="font-light text-gray-500">description (optional)</p>
        <textarea
            form="form"
            name="description"
            bind:value={description}
            rows={2}
            class="rounded-md border border-c1 "
        />
    </div>

    <div
        on:click={cap.open}
        class="cursor-pointer mx-2 my-2 px-2 gap-x-2 py-2 bg-gray-100 border border-gray-500 rounded-md text-gray-600 inline-flex items-center"
    >
        <p class="font-bold">Add photo</p>
        <div>
            <Icon src={Camera} class="h-8" />
        </div>
    </div>

    <input
        type="submit"
        value="create coffee"
        class="mt-4 cursor-pointer bg-c2 text-white w-full py-2 font-bold rounded-sm "
    />
</form>
