<script lang="ts">
    import { page } from "$app/stores";
    import supabase from "$lib/db";
    import { notify } from "$lib/notify";

    let access_token = $page.params.access_token;
    let password: string;

    async function submit() {
        let r = await supabase.auth.api.updateUser(access_token, { password });
        if (r.error) {
            notify(r.error.message, "danger");
            return;
        }
    }

    $: disabled = !password;
</script>



<form class="pt-4 bg-white" on:submit|preventDefault={submit}>
    <input
        hidden
        type="email"
        autocomplete="username"
        class="placeholder:text-gray-500 bg-white px-2 border border-black w-full rounded-sm"
        placeholder="example@email.com"
    />
    <input
        bind:value={password}
        type="password"
        autocomplete="new-password"
        class="placeholder:text-gray-500 border px-2 border-black bg-white w-full rounded-sm"
        placeholder="type your new password here"
    />

    <input
        {disabled}
        on:click|preventDefault={submit}
        type="submit"
        value="reset password"
        class="mt-4 w-full cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 text-white font-bold h-[2rem] bg-c2"
    />
</form>
