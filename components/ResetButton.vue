<script lang="ts" setup>
defineProps<{
    defaultValue: string;
}>();

const model = defineModel<string>({ required: true });
</script>

<template>
    <button type="button" class="reset-btn" :disabled="model === defaultValue" @click="model = defaultValue">
        Reset
    </button>
</template>

<style scoped>
.reset-btn {
    width: 6rem;
    background: #6c757d;
    color: #eee;
    outline: 0;
    border: 0;
    border-radius: 0;
    border-left: 1px solid #ced4db;
    cursor: pointer;
}

.reset-btn:disabled {
    background: #eaecef;
    color: #9aa0a6;
    cursor: default;
}

.reset-btn:not(:disabled):active {
    filter: brightness(0.75);
}
</style>
