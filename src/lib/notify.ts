import { toast } from "@zerodevx/svelte-toast";

export function notify(
    text: string,
    type: "danger" | "success" | "warning",
    timeout?: number
) {
    let css = { danger: "#dc3545", success: "green", warning: "yellow" }[type];
    toast.push(text, {
        duration: timeout || 10000,
        theme: { "--toastBackground": css },
    });
}
