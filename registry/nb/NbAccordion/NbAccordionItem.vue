<script setup lang="ts">
import { AccordionItem } from 'reka-ui';
import type { NbAccordionItemProps } from './index';

withDefaults(defineProps<NbAccordionItemProps>(), {
    disabled: false,
});
</script>

<template>
    <AccordionItem :value="value" :disabled="disabled" class="nb-accordion__item">
        <slot />
    </AccordionItem>
</template>

<style scoped>
.nb-accordion__item {
    border-bottom: var(--nb-border);
}

.nb-accordion__item:last-child {
    border-bottom: none;
}

.nb-accordion__item[data-disabled] {
    opacity: 0.5;
}
</style>
