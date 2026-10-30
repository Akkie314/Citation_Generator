<script lang="ts" setup>
const props = withDefaults(defineProps<{
    label: string;
    editable?: boolean;
}>(), {
    editable: false,
});

const model = defineModel<string>({default : ""});
</script>

<template>
    <div class="data-box">
        <div class="tooltip" role="tooltip">{{ model }}</div>
        <label>
            <span class="key">{{ label }}</span>
            <input v-model="model" type="text" class="value" placeholder="取得できませんでした" :readonly="!editable"/>
            <slot></slot>
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