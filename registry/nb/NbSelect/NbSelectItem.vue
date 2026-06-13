<script setup lang="ts">
import { SelectItem, SelectItemIndicator, SelectItemText } from 'reka-ui';
import type { NbSelectItemProps } from './index';

withDefaults(defineProps<NbSelectItemProps>(), {
    disabled: false,
});
</script>

<template>
    <SelectItem :value="value" :disabled="disabled" class="nb-select__item">
        <SelectItemText>
            <slot />
        </SelectItemText>
        <SelectItemIndicator class="nb-select__indicator">
            <svg viewBox="0 0 12 10" aria-hidden="true">
                <path d="M1 5l3.5 3.5L11 1" fill="none" stroke="currentColor" stroke-width="3" />
            </svg>
        </SelectItemIndicator>
    </SelectItem>
</template>

<style scoped>
/*
 * Items render inside the portalled SelectContent, outside this component's
 * root — scoped selectors cannot reach them, so style via :global.
 */
:global(.nb-select__item) {
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 8px 12px;
    color: var(--nb-foreground);
    font-weight: var(--nb-font-weight-ui);
    border-radius: var(--nb-radius);
    cursor: pointer;
    user-select: none;
    outline: none;
}

:global(.nb-select__item[data-highlighted]) {
    background: var(--nb-foreground);
    color: var(--nb-background);
}

:global(.nb-select__item[data-disabled]) {
    opacity: 0.5;
    pointer-events: none;
}

:global(.nb-select__indicator) {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
}

:global(.nb-select__indicator svg) {
    display: block;
    width: 12px;
    height: auto;
}
</style>
