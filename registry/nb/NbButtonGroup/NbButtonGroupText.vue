<script setup lang="ts">
import { Primitive } from 'reka-ui';
import type { NbButtonGroupTextProps } from './index';

withDefaults(defineProps<NbButtonGroupTextProps>(), {
    as: 'div',
});
</script>

<template>
    <Primitive :as="as" :as-child="asChild" class="nb-button-group__text">
        <slot />
    </Primitive>
</template>

<style scoped>
.nb-button-group__text {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: var(--nb-background);
    color: var(--nb-foreground);
    border: var(--nb-border);
    font-weight: var(--nb-font-weight-ui);
    white-space: nowrap;
}
</style>
