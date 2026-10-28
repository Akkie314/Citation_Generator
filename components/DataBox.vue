<script lang="ts" setup>
import { ref, watch, computed } from 'vue';
import { useCopy } from '@/composables/use-copy';

const props = withDefaults(defineProps<{
    label: string;
    value?: string;
    editable?: boolean;
    defaultValue?: string;
}>(), {
    editable: false,
});

const emit = defineEmits<{
    (e: 'update:value', value: string): void;
}>();


const { copy, copied, error } = useCopy();

const inputValue = ref<string>(props.value || "");
watch(() => props.value, (v) => {
    inputValue.value = v || "";
});

const isResettable = computed(() => props.defaultValue !== undefined);

const onCopy = () => copy(inputValue.value);
const onInput = () => {
    if (props.editable) emit('update:value', inputValue.value);
};
const onReset = () => {
    inputValue.value = props.defaultValue ?? "";
    emit('update:value', inputValue.value);
};
</script>

<template>
    <div class="data-box">
        <div class="tooltip" role="tooltip">{{ inputValue }}</div>
        <label>
            <span class="key">{{ label }}</span>
            <input v-model="inputValue" type="text" class="value" placeholder="取得できませんでした" :readonly="!editable"
                @input="onInput" />
            <!-- リセットボタン -->
            <button v-if="isResettable" type="button" class="copy-btn reset" :disabled="inputValue === defaultValue"
                @click="onReset">
                Reset
            </button>
            <!-- コピーボタン -->
            <button v-else type="button" class="copy-btn" :class="{ error }" @click="onCopy">
                {{ error ? 'Failed' : copied ? 'Copied' : 'Copy' }}
            </button>
        </label>
    </div>
</template>

<style scoped>
.data-box {
    position: relative;
    width: 100%;
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

.tooltip {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    max-width: 100%;
    box-sizing: border-box;
    overflow-wrap: anywhere;
    z-index: 10;

    padding: 0.5rem 1rem;
    font-size: 0.75rem;
    color: rgb(255 255 255 / 0.9);
    background-color: rgb(0 0 0 / 0.5);
    border-radius: 0.5rem;

    opacity: 0;
    pointer-events: none;
    transition: opacity 0.15s ease-out;
}

.data-box:hover .tooltip {
    opacity: 1;
}
</style>