<script lang="ts">
    import { goto } from "$app/navigation";

    import supabase from "$lib/db";
    import { notify } from "$lib/notify";
    import { InformationCircle } from "@steeze-ui/heroicons";
    import { Icon } from "@steeze-ui/svelte-icon";

    let email: string;
    let name: string;
    let password: string;

    let register: boolean = false;
    $: disabled = register
        ? email == null || name == null || name == "" || email == ""
        : email == null || email == "";

    async function submit() {
        // let res = await supabase.from('public.auth.users').select('1').match({email})
        // console.log(res)

        let error;
        if (register) {
            error = (
                await supabase.auth.signUp(
                    { email, password },
                    { data: { name } }
                )
            ).error;
        } else {
            error = (
                await supabase.auth.signIn(
                    { email, password },
                    { redirectTo: window.location.origin }
                )
            ).error;
        }

        if (error) {
            notify(error.message, "danger");
        } else {
            if (!password) {
                notify(
                    "a magic link has been sent to your email for logging in",
                    "success"
                );
            } else {
                notify("Succesfully logged in", "success");
                goto("/");
            }
        }
    }
</script>

<div class="flex flex-col p-4 bg-white mx-4  gap-y-8">
    <div class="flex flex-row shrink-0 text-center justify-evenly ">
        <div
            on:click={() => {
                {
                    register = false;
                }
            }}
            class="cursor-pointer bg-gray-200 border border-gray-500 w-[100%]"
        >
            Log in
        </div>
        <div
            on:click={() => {
                {
                    register = true;
                }
            }}
            class="cursor-pointer bg-gray-200 border border-gray-500 w-[100%]"
        >
            Register
        </div>
    </div>

    <form class="flex flex-col gap-4 ">
        <label
            name="email"
            class="flex flex-row flex-wrap justify-start gap-x-4 px-8"
        >
            <p>Email address</p>
            <input
                bind:value={email}
                type="email"
                autocomplete="username"
                class="placeholder:text-gray-500 bg-white px-2 border border-black w-full rounded-sm"
                placeholder="example@email.com"
            />
        </label>

        {#if register}
            <label
                name="name"
                class="flex flex-row flex-wrap justify-start gap-x-4 px-8"
            >
                <p>Display name</p>
                <input
                    bind:value={name}
                    type="text"
                    class="placeholder:text-gray-500 border px-2 border-black bg-white w-full rounded-sm"
                    placeholder="Ola Nordmann"
                />
            </label>
        {/if}

        <label
            name="password"
            class="flex flex-row flex-wrap justify-start gap-x-4 px-8 w-full"
        >
            <div class="flex w-full justify-between">
                <p>Password</p>
                {#if !register}
                    <a
                        class="text-blue-400 visited:text-purple-600"
                        href="/reset">forgot password?</a
                    >
                {/if}
            </div>
            <input
                bind:value={password}
                type="password"
                autocomplete={register ? "new-password" : "current-password"}
                class="placeholder:text-gray-500 border px-2 border-black bg-white w-full rounded-sm"
                placeholder="password..."
            />
        </label>

        <input
            {disabled}
            on:click|preventDefault={submit}
            type="submit"
            value={register ? "register" : "log in"}
            class="cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 text-white font-bold h-[2rem] bg-c2"
        />
    </form>
    <div class="inline-flex gap-x-4 items-center self-start justify-center">
        <Icon src={InformationCircle} class="w-4 text-blue-500" />
        <p>
            User management and passwords are handled by <a
                class="text-blue-400 visited:text-purple-600"
                href="https://supabase.com/">supabase</a
            >.
        </p>
    </div>
</div>
