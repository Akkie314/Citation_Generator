<script setup lang="ts">
import { computed } from 'vue';
import { changeLog } from '../changelog';
import { filterChangeLog } from '../utils/version';
import ChangeLogEntry from './ChangeLogEntry.vue';

const params = new URLSearchParams(window.location.search);
const from = params.get('from');
const to = params.get('to');

const entries = computed(() => filterChangeLog(changeLog, from, to));

const rangeLabel = computed(() => {
    if (from && to) return `ver${from} - ver${to}`;
    if (from) return `ver${from} 以降`;
    if (to) return `ver${to} まで`;
    return 'すべて';
});
</script>

<template>
    <main class="change-log">
        <h1>更新情報</h1>
        <p class="range">表示範囲: {{ rangeLabel }}</p>

        <p v-if="entries.length === 0">該当する更新情報はありません</p>

        <ChangeLogEntry
            v-for="entry in entries"
            :key="entry.version"
            :entry="entry"
        />
    </main>
</template>

<style scoped>
.change-log {
    max-width: 800px;
    margin: 0 auto;
    padding: 32px 20px 64px;
}

h1 {
    font-size: 2.5rem;
    margin: 0 0 4px;
}

.range {
    margin: 0 0 32px;
    font-size: 0.875rem;
    color: var(--title-muted);
}
</style>