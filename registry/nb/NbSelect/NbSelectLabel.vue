<script setup lang="ts">
import { SelectLabel } from 'reka-ui';
</script>

<template>
    <SelectLabel class="nb-select__label">
        <slot />
    </SelectLabel>
</template>

<style scoped>
:global(.nb-select__label) {
    display: block;
    padding: 8px 12px 4px;
    font-size: 0.75rem;
    font-weight: var(--nb-font-weight-strong);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--nb-foreground);
}
</style>
