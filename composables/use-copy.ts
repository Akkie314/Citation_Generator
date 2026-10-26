
import { ref } from "vue";
export function useCopy(resetMs = 2000) {
    const copied = ref<boolean>(false);
    const error = ref<boolean>(false);

    async function copy(text:string) {
        try {
            await navigator.clipboard.writeText(text);
            copied.value = true;
            error.value = false;
        } catch {
            copied.value = false;
            error.value = true;
        }
        setTimeout(() => {
            copied.value = false;
            error.value = false;
        }, resetMs);
    }

    return { copy, copied, error };
}