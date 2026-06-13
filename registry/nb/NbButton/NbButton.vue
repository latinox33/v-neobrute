<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import type { NbButtonProps } from './index';

const props = withDefaults(defineProps<NbButtonProps>(), {
    variant: 'default',
    size: 'md',
    disabled: false,
    type: 'button',
    as: 'button',
});

const emit = defineEmits<{
    click: [event: MouseEvent];
}>();

const classes = computed(() => ['nb-button', `nb-button--${props.variant}`, `nb-button--${props.size}`]);

function handleClick(event: MouseEvent): void {
    if (props.disabled) return;
    emit('click', event);
}
</script>

<template>
    <Primitive
        :as="as"
        :as-child="asChild"
        :class="classes"
        :type="as === 'button' ? type : undefined"
        :disabled="disabled || undefined"
        @click="handleClick"
    >
        <slot />
    </Primitive>
</template>

<style scoped>
.nb-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--nb-background);
    color: var(--nb-foreground);
    border: var(--nb-border);
    border-radius: var(--nb-radius);
    box-shadow: var(--nb-shadow-md);
    font-weight: var(--nb-font-weight-ui);
    text-decoration: none;
    cursor: pointer;
    transition:
        transform var(--nb-transition-fast),
        box-shadow var(--nb-transition-fast);
}

.nb-button:hover:not(:disabled) {
    box-shadow: var(--nb-shadow-sm);
    transform: translate(1px, 1px);
}

.nb-button:active:not(:disabled) {
    box-shadow: none;
    transform: translate(2px, 2px);
}

.nb-button:focus-visible {
    outline: var(--nb-focus-outline);
    outline-offset: var(--nb-focus-offset);
}

.nb-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Variants */
.nb-button--outline {
    background: transparent;
}

.nb-button--ghost {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
}

.nb-button--ghost:hover:not(:disabled) {
    box-shadow: none;
    transform: none;
    border-color: var(--nb-border-color);
}

.nb-button--ghost:active:not(:disabled) {
    transform: translate(2px, 2px);
}

.nb-button--destructive {
    background: var(--nb-destructive);
    color: var(--nb-destructive-foreground);
}

/* Sizes */
.nb-button--sm {
    padding: 4px 8px;
    font-size: 0.875rem;
}

.nb-button--md {
    padding: 8px 16px;
    font-size: 1rem;
}

.nb-button--lg {
    padding: 12px 24px;
    font-size: 1.125rem;
}
</style>
