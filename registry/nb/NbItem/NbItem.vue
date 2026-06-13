<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import type { NbItemProps } from './index';

const props = withDefaults(defineProps<NbItemProps>(), {
    variant: 'default',
    size: 'md',
    as: 'div',
});

const classes = computed(() => ['nb-item', `nb-item--${props.variant}`, `nb-item--${props.size}`]);
</script>

<template>
    <Primitive :as="as" :as-child="asChild" :class="classes">
        <slot />
    </Primitive>
</template>

<style scoped>
.nb-item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
    background: var(--nb-background);
    color: var(--nb-foreground);
    border: var(--nb-border);
    border-radius: var(--nb-radius);
    text-decoration: none;
    text-align: left;
}

.nb-item:focus-visible {
    outline: var(--nb-focus-outline);
    outline-offset: var(--nb-focus-offset);
}

/* Variants */
.nb-item--outline {
    background: transparent;
}

.nb-item--ghost {
    background: transparent;
    border-color: transparent;
}

/* Sizes */
.nb-item--sm {
    gap: 8px;
    padding: 8px 12px;
}

.nb-item--md {
    gap: 12px;
    padding: 12px 16px;
}

.nb-item--lg {
    gap: 16px;
    padding: 16px 20px;
}
</style>
