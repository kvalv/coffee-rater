<script>

import supabase from "$lib/db";
import { notify } from "$lib/notify";

</script>
<form
    class="flex flex-col bg-white px-2 pt-2"
    on:submit|preventDefault={async (e) => {
        let f = new FormData(e.target);
        let email = f.get('email')
        if (!email) {
            notify("Unable to get e-mail address.", "danger")
            return
        }
        let r = await supabase.auth.api.resetPasswordForEmail(email)
        if (r.error) {
            console.error(r)
            notify(`Unable to reset password. ${r.error.message}`, "danger")
            return
        }

        notify("Check your e-mail for a password reset link.", "success")
    }}
>
    <p>Enter your email address and we will send you a password reset link</p>

    <input
        type="email"
        name="email"
        class="placeholder:text-gray-500 bg-white px-2 border border-black mx-4 rounded-sm"
        placeholder="Enter your email address"
    />

    <input
        type="submit"
        class="bg-c2 text-white py-1 px-1 rounded-sm"
        value="log in"
    />
</form>
