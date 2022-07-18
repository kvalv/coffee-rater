import { getNotificationsContext } from "svelte-notifications";
export function notify(text: string, type: 'danger' | 'success' | 'warning', timeout: number | null) {

    try {
    const { addNotification } = getNotificationsContext();
    addNotification({ type, text, position: 'top-center', removeAfter: timeout });
    } catch (err) {
        alert(text)
    }
}
