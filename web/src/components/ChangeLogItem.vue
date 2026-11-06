<script setup lang="ts">
import { changeTypeLabel, type ChangeType } from '../changelog';

defineProps<{
    type: ChangeType;
    title: string;
    description?: string;
}>();
</script>

<template>
    <li>
        <span class="badge" :class="type">{{ changeTypeLabel[type] }}</span>
        <div class="content">
            <span class="title">{{ title }}</span>
            <p v-if="description" class="description">
                {{ description }}
            </p>
        </div>
    </li>
</template>

<style scoped>
li {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 2px 0;
    margin-bottom: 1rem;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.title {
    font-size: 1.25rem;
}

.description {
    margin: 0;
    font-size: 1rem;
    color: var(--title-muted);
    white-space: pre-line;
}

.badge {
    flex-shrink: 0;
    min-width: 3em;
    padding: 0 6px;
    font-size: 1rem;
    text-align: center;
    border: 1px solid currentColor;
    border-radius: 4px;
}

.badge.added {
    color: var(--badge-added);
}

.badge.changed {
    color: var(--badge-changed);
}

.badge.fixed {
    color: var(--badge-fixed);
}

.badge.removed {
    color: var(--badge-removed);
}
</style>