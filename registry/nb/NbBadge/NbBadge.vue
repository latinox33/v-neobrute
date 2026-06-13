<script setup lang="ts">
import { computed } from 'vue';
import type { NbBadgeProps } from './index';

const props = withDefaults(defineProps<NbBadgeProps>(), {
    variant: 'default',
    size: 'md',
});

const classes = computed(() => ['nb-badge', `nb-badge--${props.variant}`, `nb-badge--${props.size}`]);
</script>

<template>
    <span :class="classes">
        <slot />
    </span>
</template>

<style scoped>
.nb-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--nb-background);
    color: var(--nb-foreground);
    border: var(--nb-border);
    border-radius: var(--nb-radius);
    box-shadow: var(--nb-shadow-sm);
    font-weight: var(--nb-font-weight-strong);
    line-height: 1;
    white-space: nowrap;
}

/* Variants */
.nb-badge--outline {
    background: transparent;
}

.nb-badge--ghost {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
}

.nb-badge--destructive {
    background: var(--nb-destructive);
    color: var(--nb-destructive-foreground);
}

/* Sizes */
.nb-badge--sm {
    padding: 2px 6px;
    font-size: 0.75rem;
}

.nb-badge--md {
    padding: 4px 10px;
    font-size: 0.875rem;
}

.nb-badge--lg {
    padding: 6px 14px;
    font-size: 1rem;
}
</style>
