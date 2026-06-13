<script setup lang="ts">
import { computed } from 'vue';
import { AccordionRoot } from 'reka-ui';
import { provideNbAccordion } from './context';
import type { NbAccordionProps } from './index';

const props = withDefaults(defineProps<NbAccordionProps>(), {
    type: 'single',
    collapsible: false,
    disabled: false,
    size: 'md',
});

const modelValue = defineModel<string | string[]>();

provideNbAccordion({ size: computed(() => props.size) });
</script>

<template>
    <AccordionRoot
        v-model="modelValue"
        class="nb-accordion"
        :type="props.type"
        :collapsible="collapsible"
        :disabled="disabled"
    >
        <slot />
    </AccordionRoot>
</template>

<style scoped>
.nb-accordion {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background: var(--nb-background);
    color: var(--nb-foreground);
    border: var(--nb-border);
    border-radius: var(--nb-radius);
    box-shadow: var(--nb-shadow-md);
}
</style>
