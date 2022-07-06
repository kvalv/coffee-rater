<script>
    import supabase from "$lib/db";

    let loading = false;

    const handleLogin = async () => {
        try {
            loading = true;
            const { error } = await supabase.auth.signIn({ email });
            if (error) throw error;
            alert("Check your email for the login link!");
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            loading = false;
        }
    };
</script>

<form class="container pl-24 mx-auto " on:submit|preventDefault={handleLogin}>
    <h1 class="header">Supabase + Svelte</h1>
    <p class="description">Sign in via magic link with your email below</p>
    <div class="inline-flex gap-x-2 ">
        <div>
            <input
                class="placeholder:italic outline-1 border-violet-300 border rounded-md shadow-md"
                type="email"
                placeholder="example@email.com"
                bind:value={email}
            />
        </div>
        <div>
            <input
                type="submit"
                class="button bg-violet-300 px-4 rounded-md shadow-md"
                value={loading ? "Loading" : "send"}
                disabled={loading}
            />
        </div>
    </div>
</form>
