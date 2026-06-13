<script setup lang="ts">
import { SelectSeparator } from 'reka-ui';
</script>

<template>
    <SelectSeparator class="nb-select__separator" />
</template>

<style scoped>
:global(.nb-select__separator) {
    height: var(--nb-border-width);
    margin: 4px 0;
    background: var(--nb-border-color);
}
</style>
