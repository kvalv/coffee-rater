<script lang="ts">
    export let id: string;
    export let title: string;
    export let subtitle: string | undefined;
    export let media: string = "https://picsum.photos/200/300";
    export let support_text: string;
    export let actions: Action[] = [];
    export let badge: Badge | null = null;
    export let ratings: Rating[] = [];
    export let deletable: boolean;
    import { notify } from "$lib/notify";

    export let user_rating: Rating | null;

    let defaultImage =
        "https://picmamba.com/wp-content/uploads/2017/12/black-white-coffee.jpg";

    $: imgName = (() => {
        if (media == null) {
            return defaultImage;
        }
        if (media.endsWith('.blob')) {
            if (media.startsWith('images/')) {
                // for some reason, it adds images to the url which gives a 404...
                media = media.replace(/^images/, '')
            }
            let r =  supabase.storage.from('images').getPublicUrl(media)
            if (r.error != null) {
                console.error(r.error)
                return defaultImage
            }
            console.log(media, 'blob!', r.data.publicURL)
            // return "https://nkcfpjmzqpbdlmseyilr.supabase.co/storage/v1/object/public/images/public/d92fb7d7-ba57-434a-8f1a-ad948062aab6.blob"
            return r.data.publicURL
        }
        return media;
    })()

    import { Icon } from "@steeze-ui/svelte-icon";
    import { ChevronDown, Plus } from "@steeze-ui/heroicons";
    import { createEventDispatcher } from "svelte";
    import { formatDistance } from "date-fns";
import supabase from "$lib/db";

    interface Rating {
        name: string;
        value: number;
        at: Date;
    }

    interface Badge {
        text: string;
    }

    interface Action {
        text: string;
        onClick: () => void;
    }

    const dispatch = createEventDispatcher();
</script>

<!-- card container -->
<div
    class="max-w-md transition flex flex-col rounded-xl shadow-lg bg-white relative overflow-hidden"
>
    <!-- badge -->
    <div
        class="absolute top-0 left-0 m-2 text-white font-medium bg-c3 py-1 px-2 rounded-full ring-1 ring-c1 shadow-md"
    >
        <span class="">{badge?.text}</span>
    </div>

    <!-- image -->

    <a href={`/coffees/${id}`}>
        <div class="md:shrink-0">
            <img
                class="h-48 w-full object-cover bg-cover "
                alt="aaa"
                src={imgName}
            />
        </div>
    </a>

    <!-- title / main content -->
    <div class="flex flex-row mx-2">
        <div class="p-4">
            <p class="tracking-wide text-c2 font-semibold uppercase">
                {title}
            </p>
            <p class="text-gray-500 italic">{subtitle}</p>
        </div>

        <div
            class="flex flex-col my-2 gap-2 items-center place-content-between"
        >
            <div class="p-4 text-center">
                <p>{support_text}</p>
            </div>
            <button class="border-c2 max-w-[8rem] rounded-lg px-2 border-2">
                {#if user_rating == null}
                    <!-- add rating -->
                    <button on:click={() => dispatch("rateclick", {})} class="">
                        <div
                            class="flex align justify-start items-center align-middle"
                        >
                            <Icon src={Plus} class="text-c2 grow-0 h-4" />
                            <p>rate</p>
                        </div>
                    </button>
                {:else}
                    you rated {user_rating.value.toFixed(2)}
                {/if}
            </button>
        </div>
    </div>

    <!-- ratings -->
    <div class="border-t-gray-200 border-t-2">
        <details class="">
            <summary
                class="bg-inherit cursor-pointer list-none mx-auto text-center"
            >
                <p
                    class={ratings.length == 0
                        ? "bg-gray-200 cursor-not-allowed"
                        : ""}
                >
                    <span class="inline-block align-middle ">
                        <Icon src={ChevronDown} class="grow-0 h-8" />
                    </span>
                    see ratings
                </p>
            </summary>

            <div class="flex flex-col text-center bg-white ">
                {#each ratings as rating}
                    <div class="flex flex-row odd:bg-stone-50 ">
                        <div class="basis-4/12">
                            <p class="">{rating.name}</p>
                        </div>
                        <div class="basis-3/12">
                            {rating.value}
                        </div>
                        <div class="basis-5/12 text-left">
                            {formatDistance(rating.at, new Date(), {
                                addSuffix: true,
                            })}
                        </div>
                    </div>
                {/each}
            </div>
        </details>
    </div>
</div>
