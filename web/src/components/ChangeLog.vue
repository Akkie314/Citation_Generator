<script setup lang='ts'>
import { computed } from 'vue';
import { changeLog, type ChangeType } from '../changelog';
import { filterChangeLog } from '../utils/version';

const params = new URLSearchParams(window.location.search);
const from = params.get('from');
const to = params.get('to');

const entries = computed(() => filterChangeLog(changeLog, from, to))

const rangeLabel = computed(() => {
    if (from && to) return `ver${from} - ver${to}`;
    if (from) return `ver${from} 以降`;
    if (to) return `ver${to} まで`;
    return 'すべて'
})

const typeLabel: Record<ChangeType, string> = {
    added: '追加',
    changed: '変更',
    fixed: '修正',
    removed: '削除'
}
</script>


<template>
    <main class="change-log">
        <h1>更新情報</h1>
        <p class="range">表示範囲: {{ rangeLabel }}</p>

        <p v-if="entries.length === 0">該当する更新情報はありません</p>

        <section v-for="entry in entries" :key="entry.version" class="entry">
            <h2>
                ver{{ entry.version }}
                <small>{{ entry.date }}</small>
            </h2>
            <ul>
                <li v-for="(content, index) in entry.changes" :key="index">
                    <span class="badge" :class="content.type">{{ typeLabel[content.type] }}</span>
                    {{ content.text }}
                </li>
            </ul>
        </section>
    </main>
</template>

<style scoped>
.change-log {
    max-width: 800px;
    margin: 0 auto;
    padding: 32px 20px 64px;

    font-size: 18px;
}

h1 {
    font-size: 2.5rem;
    margin: 0 0 4px;
}

.range {
    margin: 0 0 32px;
    font-size: 0.875rem;
    color: var(--text-muted);
}

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
    color: var(--text-muted);
}

ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

li {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 2px 0;
}

.badge {
    flex-shrink: 0;
    min-width: 3em;
    padding: 0 6px;
    font-size: 0.75rem;
    text-align: center;
    border: 1px solid currentColor;
    border-radius: 4px;
}

.badge.added { color: var(--badge-added); }
.badge.changed { color: var(--badge-changed); }
.badge.fixed { color: var(--badge-fixed); }
.badge.removed { color: var(--badge-removed); }
</style>