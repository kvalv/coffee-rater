<!-- which contains a blob object. This is the image taken -->
<script lang="ts">
    import { createEventDispatcher } from "svelte";

    let ms: MediaStream | undefined;
    let blob: Blob | undefined;
    let track: MediaStreamTrack;

    let video: HTMLVideoElement;
    let videoHeight, videoWidth;
    $: console.log(videoHeight, videoWidth);

    let dispatch = createEventDispatcher();

    $: h = ms == undefined;
    // video.setAttribute

    export let width: number | string;
    export let height: number | string;
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
        // ms.stop()
        if (!ms) {
            return
        }
        ms.getTracks().forEach(track => track.stop())
        // track?.stop()
        ms = undefined; // unset mediastream
    }
    let x;

    $: klass = `absolute bottom-2 `;
    $: y = x / 2;
    $: console.log("x", x, klass);
</script>

<svelte:window bind:innerWidth={x} />

<button
    on:click={async () => {
        await open();
    }}
/>

<div class={`relative border-lg w-[50vw] h-[50vh]`} class:hidden={h}>
    <div class="inline-block">
        <div
            class="relative"
            bind:clientWidth={videoWidth}
            bind:clientHeight={videoHeight}
        >
            <video
                width="100%"
                height="100%"
                bind:this={video}
                autoplay
                muted
            />

            <button
                class={klass}
                style={`left:calc(${
                    y / 2
                }px - (${captureButtonRadius}rem / 8))`}
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
    </div>
</div>
