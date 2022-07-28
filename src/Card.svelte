<script lang="ts">
    export let id: string;
    export let title: string;
    export let subtitle: string | undefined;
    export let media: string = "https://picsum.photos/200/300";
    export let badge: Badge | null = null;

    let defaultImage =
        "https://picmamba.com/wp-content/uploads/2017/12/black-white-coffee.jpg";

    $: imgName = (() => {
        if (media == null) {
            return defaultImage;
        }
        if (media.endsWith(".blob")) {
            if (media.startsWith("images/")) {
                // for some reason, it adds images to the url which gives a 404...
                media = media.replace(/^images/, "");
            }
            let r = supabase.storage.from("images").getPublicUrl(media);
            if (r.error != null) {
                console.error(r.error);
                return defaultImage;
            }
            console.log(media, "blob!", r.data.publicURL);
            // return "https://nkcfpjmzqpbdlmseyilr.supabase.co/storage/v1/object/public/images/public/d92fb7d7-ba57-434a-8f1a-ad948062aab6.blob"
            return r.data.publicURL;
        }
        return media;
    })();

    import supabase from "$lib/db";

    interface Badge {
        text: string;
    }

    interface Action {
        text: string;
        onClick: () => void;
    }

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
    </div>

    <div class="w-[100%] border-gray-200 border" />
    <!-- horizontal ruler -->
</div>
