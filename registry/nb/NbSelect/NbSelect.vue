<script setup lang="ts">
import { computed } from 'vue';
import {
    SelectContent,
    SelectIcon,
    SelectPortal,
    SelectRoot,
    SelectTrigger,
    SelectValue,
    SelectViewport,
} from 'reka-ui';
import type { NbSelectProps } from './index';

const props = withDefaults(defineProps<NbSelectProps>(), {
    size: 'md',
    disabled: false,
    required: false,
});

const modelValue = defineModel<string>();

const triggerClasses = computed(() => ['nb-select', `nb-select--${props.size}`]);
</script>

<template>
    <SelectRoot v-model="modelValue" :disabled="disabled" :name="name" :required="required">
        <SelectTrigger :class="triggerClasses">
            <SelectValue :placeholder="placeholder" />
            <SelectIcon class="nb-select__icon">
                <svg viewBox="0 0 12 8" aria-hidden="true">
                    <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" />
                </svg>
            </SelectIcon>
        </SelectTrigger>

        <SelectPortal>
            <SelectContent class="nb-select__content" position="popper" :side-offset="4">
                <SelectViewport class="nb-select__viewport">
                    <slot />
                </SelectViewport>
            </SelectContent>
        </SelectPortal>
    </SelectRoot>
</template>

<style scoped>
.nb-select {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: var(--nb-background);
    color: var(--nb-foreground);
    border: var(--nb-border);
    border-radius: var(--nb-radius);
    box-shadow: var(--nb-shadow-sm);
    font-weight: var(--nb-font-weight-ui);
    text-align: left;
    cursor: pointer;
    transition:
        box-shadow var(--nb-transition-fast),
        transform var(--nb-transition-fast);
}

.nb-select:focus-visible {
    outline: var(--nb-focus-outline);
    outline-offset: var(--nb-focus-offset);
}

.nb-select[data-state='open'] {
    box-shadow: var(--nb-shadow-md);
}

.nb-select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.nb-select[data-placeholder] {
    color: var(--nb-foreground);
    opacity: 0.6;
}

.nb-select__icon {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
}

.nb-select__icon svg {
    display: block;
    width: 12px;
    height: 8px;
}

.nb-select[data-state='open'] .nb-select__icon svg {
    transform: rotate(180deg);
}

/* Sizes */
.nb-select--sm {
    min-height: 32px;
    padding: 4px 8px;
    font-size: 0.8125rem;
}

.nb-select--md {
    min-height: 40px;
    padding: 8px 12px;
    font-size: 0.9375rem;
}

.nb-select--lg {
    min-height: 48px;
    padding: 12px 16px;
    font-size: 1.0625rem;
}

/*
 * SelectContent renders inside a portal, outside this component's root,
 * so scoped selectors cannot reach it — style it via :global.
 */
:global(.nb-select__content) {
    box-sizing: border-box;
    //min-width: var(--reka-select-trigger-width);
    //max-height: var(--reka-select-content-available-height);
    background: var(--nb-background);
    color: var(--nb-foreground);
    border: var(--nb-border);
    border-radius: var(--nb-radius);
    box-shadow: var(--nb-shadow-md);
    overflow: hidden;
    z-index: 50;
}

:global(.nb-select__viewport) {
    padding: 4px;
}
</style>
