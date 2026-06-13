<script setup lang="ts">
import { computed } from 'vue';
import type { NbButtonGroupSeparatorProps } from './index';

const props = withDefaults(defineProps<NbButtonGroupSeparatorProps>(), {
    orientation: 'vertical',
});

const classes = computed(() => ['nb-button-group__separator', `nb-button-group__separator--${props.orientation}`]);
</script>

<template>
    <div :class="classes" role="separator" :aria-orientation="orientation" />
</template>

<style scoped>
.nb-button-group__separator {
    flex-shrink: 0;
    align-self: stretch;
    background: var(--nb-border-color);
}

.nb-button-group__separator--vertical {
    width: var(--nb-border-width);
}

.nb-button-group__separator--horizontal {
    height: var(--nb-border-width);
}
</style>
