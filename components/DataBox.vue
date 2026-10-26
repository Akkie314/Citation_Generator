<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useCopy } from '@/composables/use-copy';
const props = defineProps<{
    label: string;
    value?: string;
}>();

const displayValue = computed(() => props.value ?? '取得できませんでした');
const { copy, copied, error } = useCopy();

const showTip = ref<boolean>(false);
const inputElem = ref<HTMLInputElement>();
const tipElem = ref<HTMLDivElement>();
const placeBelow = ref<boolean>(false);
const tipStyle = ref<{ top: string; left: string }>({ top: '0px', left: '0px' });

const GAP = 6;
const MARGIN = 4;

function updatePosition(e: MouseEvent) {
    if (!inputElem.value || !tipElem.value) return;
    // カーソルがツールチップ上にある間は位置を固定する
    if (tipElem.value.contains(e.target as Node)) return;
    const input = inputElem.value.getBoundingClientRect();
    const tip = tipElem.value.getBoundingClientRect();

    // 画面外にはみ出さないようにクランプ
    const centered = e.clientX - tip.width / 2;
    const left = Math.max(MARGIN, Math.min(centered, window.innerWidth - tip.width - MARGIN));

    // 基本は上、入らなければ下
    const above = input.top - tip.height - GAP;
    placeBelow.value = above < MARGIN;
    const top = placeBelow.value ? input.bottom + GAP : above;

    tipStyle.value = { top: `${top}px`, left: `${left}px` };
}

function onEnter(e: MouseEvent) {
    updatePosition(e);
    showTip.value = true;
}
</script>

<template>
    <div class="data-box" @mouseenter="onEnter" @mousemove="updatePosition" @mouseleave="showTip=false">
        <div ref="tipElem" class="tooltip" :class="{show:showTip, below:placeBelow}" :style="tipStyle" role="tooltip">{{ displayValue }}</div>
        <label>
            <span class="key">{{ label }}</span>
            <input ref="inputElem" class="value" type="text" :value="displayValue" readonly/>
            <button type="button" class="copy-btn" :class="{error}" @click="copy(displayValue)">
                {{ error ? 'Failed': copied ? 'Copied' : 'Copy' }}
            </button>
        </label>
    </div>
</template>

<style scoped>
.data-box {
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

div.tooltip {
    position: fixed;
    width: max-content;
    max-width: calc(100vw - 2rem);
    box-sizing: border-box;
    overflow-wrap: break-word;

    opacity: 0;
    transition: opacity 0.15s ease;

    padding: 0.5rem 1rem;

    font-size: .75rem;
    color: rgb(255 255 255 / 0.9);

    background-color: rgb(0 0 0 / 0.5);
    border-radius: .5rem;
}

div.tooltip.show {
    opacity: 1;
}

/* input とツールチップの隙間を埋め、カーソルが移動しても hover が切れないようにする */
div.tooltip::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    height: 0.5rem;
}

div.tooltip.below::before {
    top: auto;
    bottom: 100%;
}

/* 非表示中はマウス操作を妨げない */
div.tooltip:not(.show) {
    pointer-events: none;
}
</style>