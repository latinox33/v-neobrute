<script setup lang="ts">
import { computed } from 'vue';
import { AccordionHeader, AccordionTrigger } from 'reka-ui';
import { useNbAccordion } from './context';
import type { NbAccordionTriggerProps } from './index';

const props = defineProps<NbAccordionTriggerProps>();

const group = useNbAccordion();

const size = computed(() => props.size ?? group.size.value);
const classes = computed(() => ['nb-accordion__trigger', `nb-accordion__trigger--${size.value}`]);
</script>

<template>
    <AccordionHeader class="nb-accordion__header">
        <AccordionTrigger :class="classes">
            <span class="nb-accordion__label"><slot /></span>
            <svg class="nb-accordion__chevron" viewBox="0 0 12 8" aria-hidden="true">
                <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" />
            </svg>
        </AccordionTrigger>
    </AccordionHeader>
</template>

<style scoped>
.nb-accordion__header {
    display: flex;
    margin: 0;
}

.nb-accordion__trigger {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: var(--nb-background);
    color: var(--nb-foreground);
    border: none;
    font-weight: var(--nb-font-weight-strong);
    text-align: left;
    cursor: pointer;
    transition:
        background var(--nb-transition-fast),
        transform var(--nb-transition-fast);
}

.nb-accordion__trigger:focus-visible {
    outline: var(--nb-focus-outline);
    outline-offset: calc(-1 * var(--nb-focus-offset));
}

.nb-accordion__trigger:hover {
    background: var(--nb-foreground);
    color: var(--nb-background);
}

.nb-accordion__trigger:disabled {
    cursor: not-allowed;
}

.nb-accordion__label {
    flex: 1;
}

.nb-accordion__chevron {
    flex-shrink: 0;
    width: 12px;
    height: 8px;
    transition: transform var(--nb-transition-fast);
}

.nb-accordion__trigger[data-state='open'] .nb-accordion__chevron {
    transform: rotate(180deg);
}

/* Sizes */
.nb-accordion__trigger--sm {
    padding: 8px 12px;
    font-size: 0.8125rem;
}

.nb-accordion__trigger--md {
    padding: 12px 16px;
    font-size: 0.9375rem;
}

.nb-accordion__trigger--lg {
    padding: 16px 20px;
    font-size: 1.0625rem;
}
</style>
