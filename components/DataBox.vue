<script lang="ts" setup>
import { useCopy } from '@/composables/use-copy';
defineProps<{
    label: string;
    value: string;
}>();

const { copy, copied, error } = useCopy();
</script>

<template>
    <div class="data-box">
        <label>
            <span class="key">{{ label }}</span>
            <input class="value" type="text" :value="value" readonly/>
            <button type="button" class="copy-btn" :class="{error}" @click="copy(value)">
                {{ error ? 'Failed': copied ? 'Copied' : 'Copy' }}
            </button>
        </label>
    </div>
</template>

<style scoped>
.data-box {
    margin-bottom: 1rem;
}

label {
    display: flex;
    border: 1px solid #ced4db;
    border-radius: 0.5rem;
    overflow: hidden;
}

.key {
    width: 20%;
    height: 2rem;
    background: #eaecef;
    border-right: 1px solid #ced4db;
    text-align: center;
    line-height: 2rem;
}

.value {
    flex: 1;
    min-width: 0;
    padding: 0 1rem;
    outline: 0;
    border: 0;
}

.value:focus {
    outline: 1px solid #027bff;
    outline-offset: -1px;
}

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