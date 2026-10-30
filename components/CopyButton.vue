<script lang="ts" setup>
import { useCopy } from '@/composables/use-copy';

const props = withDefaults(defineProps<{
    text?: string;
}>(), {
    text: "",
});

const { copy, copied, error} = useCopy();
function onCopy() {
    copy(props.text);
}
</script>

<template>
    <button type="button" class="copy-btn" :class="{ error }" @click="onCopy">
        {{ error ? 'Failed' : copied ? 'Copied' : 'Copy' }}
    </button>
</template>

<style scoped>

.copy-btn {
    width: 6rem;
    background: #027bff;
    color: #eee;
    outline: 0;
    border: 0;
    border-radius: 0;
    border-left: 1px solid #ced4db;
    cursor: pointer;
}

.copy-btn.error {
    background: #dc3545;
}

.copy-btn:active {
    filter: brightness(0.75);
}
</style>