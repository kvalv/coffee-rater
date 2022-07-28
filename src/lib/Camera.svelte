<!-- which contains a blob object. This is the image taken -->
<script lang="ts">
    import { Camera } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";
    import { createEventDispatcher } from "svelte";

    let ms: MediaStream | undefined;
    let blob: Blob | undefined;
    let track: MediaStreamTrack;

    let video: HTMLVideoElement;

    let dispatch = createEventDispatcher();

    $: h = ms == undefined;
    // video.setAttribute

    export let width: number = 240;
    export let height: number = 480;
    export let captureButtonRadius: number = 8;

    export async function open() {
        ms = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
        });
        video.srcObject = ms;
    }

    export async function capture() {
        if (ms == undefined) {
            console.error(
                "you need to call 'open()' before capturing an image"
            );
            return;
        }
        track = ms.getVideoTracks()[0];
        let imgCap = new ImageCapture(track);
        blob = await imgCap.takePhoto();
        track.stop();

        dispatch("photoCaptured", {
            blob: blob,
        });
    }

    export async function close() {
        ms = undefined; // unset mediastream
    }
</script>

<!-- call open() to open the image capture -->
<!-- call capture() to take image (requires open to be called first) -->
<!-- call close() to close the image capture -->
<!-- when capture is called, an event named 'photoCaptured' is emitted, -->


<button
    on:click={async () => {
        await open();
    }}
/>

<div
    class="relative border-lg overflow-hidden"
    class:hidden={h}
    {width}
    {height}
>
    <video {width} {height} bind:this={video} autoplay muted />

    <button
        class={`absolute bottom-2 left-[${
            width / 2 - captureButtonRadius / 2
        }px]`}
        on:click={async () => {
            await capture();
            await close();
        }}
        ><svg
            class={`fill-[#11111155] h-${captureButtonRadius}`}
            viewBox="0 0 100 100"
        >
            <circle cx="50" cy="50" r="50" /></svg
        ></button
    >
</div>

<!-- <img src={blob == undefined ? null : URL.createObjectURL(blob)} /> -->
