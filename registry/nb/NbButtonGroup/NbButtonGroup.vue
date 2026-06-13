<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import type { NbButtonGroupProps } from './index';

const props = withDefaults(defineProps<NbButtonGroupProps>(), {
    orientation: 'horizontal',
    as: 'div',
});

const classes = computed(() => ['nb-button-group', `nb-button-group--${props.orientation}`]);
</script>

<template>
    <Primitive :as="as" :as-child="asChild" :class="classes" role="group">
        <slot />
    </Primitive>
</template>

<style scoped>
.nb-button-group {
    display: inline-flex;
    width: fit-content;
    box-shadow: var(--nb-shadow-md);
}

.nb-button-group--horizontal {
    flex-direction: row;
}

.nb-button-group--vertical {
    flex-direction: column;
}

/* Children merge into one block: drop individual shadow and radius. */
.nb-button-group > :deep(*) {
    box-shadow: none;
    border-radius: 0;
}

/* Collapse the doubled border on the seam between siblings. */
.nb-button-group--horizontal > :deep(* + *) {
    margin-left: calc(-1 * var(--nb-border-width));
}

.nb-button-group--vertical > :deep(* + *) {
    margin-top: calc(-1 * var(--nb-border-width));
}

/* Lift the active child so its border and focus ring sit above the neighbour. */
.nb-button-group > :deep(*:hover),
.nb-button-group > :deep(*:focus-visible),
.nb-button-group > :deep(*:focus-within) {
    position: relative;
    z-index: 1;
}

/* The hard shadow lives on the group, so children must not shift on press. */
.nb-button-group > :deep(.nb-button:hover:not(:disabled)),
.nb-button-group > :deep(.nb-button:active:not(:disabled)) {
    transform: none;
    box-shadow: none;
}

/*
 * Nested groups stay self-contained: a child group keeps its own merged border
 * and hard shadow instead of collapsing into the parent. The parent spaces the
 * nested groups apart rather than seaming them together.
 */
.nb-button-group > :deep(.nb-button-group) {
    box-shadow: var(--nb-shadow-md);
}

.nb-button-group--horizontal > :deep(.nb-button-group + .nb-button-group) {
    margin-left: 8px;
}

.nb-button-group--vertical > :deep(.nb-button-group + .nb-button-group) {
    margin-top: 8px;
}
</style>
