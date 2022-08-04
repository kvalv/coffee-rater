<script lang="ts">
    import supabase from "$lib/db";
    import { Icon } from "@steeze-ui/svelte-icon";
    import { Camera } from "@steeze-ui/heroicons";
    import { page } from "$app/stores";
    import { notify } from "$lib/notify";
    import { goto } from "$app/navigation";
    import CameraCapture from "$lib/CameraCapture.svelte";

    export let name: string;
    export let producer: string;
    export let image: string;

    let upload_image: string | undefined;
    let cap: CameraCapture;

    let default_img =
        "https://picmamba.com/wp-content/uploads/2017/12/black-white-coffee.jpg";

    // new rating values
    let rating_value: number = 0;
    let description: string;

    async function submit() {
        let { error } = await supabase.from("rating").insert([
            {
                rating: rating_value,
                description,
                coffee_id: $page.params.id,
                profile_id: supabase.auth.user()?.id,
                image: upload_image,
            },
        ]);
        if (error) {
            notify(error.message, "danger");
            return;
        }
        goto(`/coffees/${$page.params.id}`);
        notify("added rating", "success");
    }
</script>

<div class="flex flex-col p-4 bg-white mx-4  gap-y-4">
    <div class="flex flex-row gap-2">
        <a href={image}>
            <img
                class="h-12 rounded-md border aspect-square self-center object-cover bg-cover "
                alt=""
                src={image || default_img}
            />
        </a>
        <div class="flex flex-col">
            <p class="font-bold text-xl">{name}</p>
            <p class="font-thin text-lg text-gray-600">{producer}</p>
        </div>
    </div>

    <div class="flex flex-row gap-2 text-gray-500 justify-between text-center">
        <textarea
            class="self-stretch grow"
            placeholder="How was it? Leave a note"
            bind:value={description}
        />
        <div
            class="p-2 flex grow-0 flex-col justify-self-end place-items-center rounded-lg border-2 border-gray-400"
            on:click={cap.open}
        >
            <Icon src={Camera} class="w-8 " />
            <p class="text-xs">add photo</p>
        </div>
    </div>

    <div class="w-[100%] border-gray-200 border" />
    <!-- horizontal ruler -->

    <div class="flex flex-col">
        <div class="flex flex-row justify-between">
            <p class="font-bold text-xl">Rating</p>
            <p class="text-gray-500 font-light">
                {rating_value > 0 ? rating_value.toFixed(2) : "Not rated"}
            </p>
        </div>
        <input
            class="accent-c2 w-1/2 scale-[2] py-4 translate-x-1/2"
            type="range"
            min="0"
            max="5"
            step="0.25"
            bind:value={rating_value}
        />
    </div>

    <button
        class="order-last rounded-sm mt-8 py-2 self-stretch text-center bg-c2 text-white font-bold"
        on:click={submit}
    >
        Check-In
    </button>
</div>

<CameraCapture
    bind:this={cap}
    uploadOnCapture={true}
    on:capture={(e) => {
        upload_image = e.detail.url;
    }}
/>
