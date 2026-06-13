<script setup lang="ts">
import { computed } from 'vue';
import { SwitchRoot, SwitchThumb } from 'reka-ui';
import type { NbSwitchProps } from './index';

const props = withDefaults(defineProps<NbSwitchProps>(), {
    size: 'md',
    disabled: false,
    required: false,
});

const modelValue = defineModel<boolean>({ default: false });

const classes = computed(() => ['nb-switch', `nb-switch--${props.size}`]);
</script>

<template>
    <SwitchRoot
        v-model="modelValue"
        :class="classes"
        :disabled="disabled"
        :name="name"
        :value="value"
        :required="required"
    >
        <SwitchThumb class="nb-switch__thumb" />
    </SwitchRoot>
</template>

<style scoped>
.nb-switch {
    box-sizing: border-box;
    position: relative;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    padding: 2px;
    background: var(--nb-background);
    border: var(--nb-border);
    border-radius: var(--nb-radius);
    box-shadow: var(--nb-shadow-sm);
    cursor: pointer;
    transition: background var(--nb-transition-normal);
}

.nb-switch[data-state='checked'] {
    background: var(--nb-foreground);
}

.nb-switch:focus-visible {
    outline: var(--nb-focus-outline);
    outline-offset: var(--nb-focus-offset);
}

.nb-switch:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.nb-switch__thumb {
    box-sizing: border-box;
    display: block;
    background: var(--nb-foreground);
    border-radius: var(--nb-radius);
    transform: translateX(0);
    transition: transform var(--nb-transition-normal);
}

.nb-switch__thumb[data-state='checked'] {
    background: var(--nb-background);
}

/* Sizes */
.nb-switch--sm {
    width: 36px;
    height: 20px;
}

.nb-switch--sm .nb-switch__thumb {
    width: 12px;
    height: 12px;
}

.nb-switch--sm .nb-switch__thumb[data-state='checked'] {
    transform: translateX(16px);
}

.nb-switch--md {
    width: 44px;
    height: 24px;
}

.nb-switch--md .nb-switch__thumb {
    width: 16px;
    height: 16px;
}

.nb-switch--md .nb-switch__thumb[data-state='checked'] {
    transform: translateX(20px);
}

.nb-switch--lg {
    width: 52px;
    height: 28px;
}

.nb-switch--lg .nb-switch__thumb {
    width: 20px;
    height: 20px;
}

.nb-switch--lg .nb-switch__thumb[data-state='checked'] {
    transform: translateX(24px);
}
</style>
