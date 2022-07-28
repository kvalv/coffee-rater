<script>
import Camera from "$lib/Camera.svelte";

    let videoSource = null;
    let loading = false;
    const obtenerVideoCamara = async () => {
        try {
            loading = true;
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoSource.srcObject = stream;
            videoSource.play();
            loading = false;
        } catch (error) {
            console.log(error);
        }
    };
    let blob;

    // navigator.mediaDevices.getUserMedia({ video: true })
    // .then(mediaStream => {
    //   // Do something with the stream.
    // })
</script>

<Camera/>

<!-- <div> -->
<!--     {#if loading} -->
<!--         <h1>CARGANDO</h1> -->
<!--     {/if} -->
<!--     <!-1- svelte-ignore a11y-media-has-caption -1-> -->
<!--     <!-1- <video bind:this={videoSource} /> -1-> -->
<!--     <button on:click={fn}>CLICK</button> -->
<!--     <img src={blob == undefined ? null : URL.createObjectURL(blob)} /> -->
<!-- </div> -->
