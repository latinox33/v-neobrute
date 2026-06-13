<script setup lang="ts">
import { computed } from 'vue';
import { Label } from 'reka-ui';
import type { NbLabelProps } from './index';

const props = withDefaults(defineProps<NbLabelProps>(), {
    size: 'md',
    required: false,
});

const classes = computed(() => ['nb-label', `nb-label--${props.size}`]);
</script>

<template>
    <Label :class="classes">
        <slot />
        <span v-if="required" class="nb-label__required" aria-hidden="true">*</span>
    </Label>
</template>

<style scoped>
.nb-label {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--nb-foreground);
    font-weight: var(--nb-font-weight-ui);
    line-height: 1;
    cursor: default;
}

.nb-label__required {
    color: var(--nb-destructive);
    font-weight: var(--nb-font-weight-strong);
}

/* Sizes */
.nb-label--sm {
    font-size: 0.75rem;
}

.nb-label--md {
    font-size: 0.875rem;
}

.nb-label--lg {
    font-size: 1rem;
}
</style>
