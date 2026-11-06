<script setup lang="ts">
import type { ChangeEntry } from '../changelog';
import ChangeLogItem from './ChangeLogItem.vue';

defineProps<{ entry: ChangeEntry }>();
</script>

<template>
    <section class="entry">
        <h2>
            ver{{ entry.version }}
            <small>{{ entry.date }}</small>
        </h2>
        <ul>
            <ChangeLogItem
                v-for="(change, index) in entry.changes"
                :key="index"
                :type="change.type"
                :title="change.title"
                :description="change.description"
            />
        </ul>
    </section>
</template>

<style scoped>
.entry {
    padding: 20px 0;
    border-top: 1px solid var(--border);
}

h2 {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin: 0 0 12px;
    font-size: 1.5rem;
}

h2 small {
    font-size: 0.8125rem;
    font-weight: normal;
    color: var(--title-muted);
}

ul {
    margin: 0;
    padding: 0;
    list-style: none;
}
</style>