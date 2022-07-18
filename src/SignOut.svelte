<script lang="ts">
    import supabase from "$lib/db";
    import Modal from "./Modal.svelte";
    import { getNotificationsContext } from "svelte-notifications";
    import { user } from "$lib/stores";

    let email: string;

    async function handleClick() {
        if ($user == null) {
            modal.open();
            // await handleLogIn();
        } else {
            await handleLogOut();
        }
    }
    async function handleLogOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        addNotification({
            text: "you have signed out",
            position: "top-center",
        });
    }

    async function handleLogIn() {
        const { error } = await supabase.auth.signIn({ email }, {redirectTo: window.location.origin});
        if (error) throw error;
        // modal.open();
        addNotification({
            text: "check your email for confirmation link",
            position: "top-center",
        });
    }

    let modal: Modal;

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    $: email_valid = email != null && validateEmail(email);

    const { addNotification } = getNotificationsContext();
</script>

<button on:click={handleClick} class="button bg-c3 px-4 rounded-full hover:scale-110 transition shadow-md">
    {$user == null ? "sign in" : "sign out"}
</button>

<Modal bind:this={modal} closeOnClickOutside={true}>
    <div
        class="rounded-lg text-white w-64 h-64 md:w-96 md:h-96 bg-c1 grid place-items-center"
    >
        <p class="px-2">
            Enter your e-mail and receive a magic link to log in. No password or
            anything like that needed. You'll stay logged in for a while (not
            sure how long), so you don't have to do this process many times.
        </p>
        <label class="text-c2"
            >email
            <input
                class="mx-2 placeholder:italic shadow-md text-slate-600 border-2 border-blue-200 rounded-lg"
                type="email"
                placeholder="example@gmail.com"
                bind:value={email}
            />
        </label>
        <button
            disabled={!email_valid}
            on:click={handleLogIn}
            class="py-4 px-2 bg-c2 rounded-full  transition border-2 enabled:text-white disabled:bg-gray-400 disabled:cursor-not-allowed  disabled:border-black shadow-md"
            >Log in or create account</button
        >
    </div>
    <!-- <Auth /> -->
</Modal>
