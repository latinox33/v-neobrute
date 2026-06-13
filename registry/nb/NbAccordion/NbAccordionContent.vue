<script setup lang="ts">
import { AccordionContent } from 'reka-ui';
</script>

<template>
    <AccordionContent class="nb-accordion__content">
        <div class="nb-accordion__content-inner">
            <slot />
        </div>
    </AccordionContent>
</template>

<style scoped>
.nb-accordion__content {
    overflow: hidden;
    border-top: var(--nb-border);
}

.nb-accordion__content[data-state='open'] {
    animation: nb-accordion-down var(--nb-transition-normal);
}

.nb-accordion__content[data-state='closed'] {
    animation: nb-accordion-up var(--nb-transition-normal);
}

@keyframes nb-accordion-down {
    from {
        height: 0;
    }
    to {
        height: var(--reka-accordion-content-height);
    }
}

@keyframes nb-accordion-up {
    from {
        height: var(--reka-accordion-content-height);
    }
    to {
        height: 0;
    }
}

.nb-accordion__content-inner {
    padding: 12px 16px;
}
</style>
