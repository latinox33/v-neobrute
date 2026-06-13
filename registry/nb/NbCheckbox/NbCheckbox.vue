<script setup lang="ts">
import { computed } from 'vue';
import { CheckboxIndicator, CheckboxRoot } from 'reka-ui';
import type { NbCheckboxProps } from './index';

const props = withDefaults(defineProps<NbCheckboxProps>(), {
    size: 'md',
    disabled: false,
    required: false,
});

const modelValue = defineModel<boolean>({ default: false });

const classes = computed(() => ['nb-checkbox', `nb-checkbox--${props.size}`]);
</script>

<template>
    <CheckboxRoot
        v-model="modelValue"
        :class="classes"
        :disabled="disabled"
        :name="name"
        :value="value"
        :required="required"
    >
        <CheckboxIndicator class="nb-checkbox__indicator">
            <svg class="nb-checkbox__check" viewBox="0 0 12 10" aria-hidden="true">
                <path d="M1 5l3.5 3.5L11 1" fill="none" stroke="currentColor" stroke-width="3" />
            </svg>
        </CheckboxIndicator>
    </CheckboxRoot>
</template>

<style scoped>
.nb-checkbox {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;
    background: var(--nb-background);
    color: var(--nb-foreground);
    border: var(--nb-border);
    border-radius: var(--nb-radius);
    box-shadow: var(--nb-shadow-sm);
    cursor: pointer;
    transition: background var(--nb-transition-fast);
}

.nb-checkbox[data-state='checked'] {
    background: var(--nb-foreground);
    color: var(--nb-background);
}

.nb-checkbox:focus-visible {
    outline: var(--nb-focus-outline);
    outline-offset: var(--nb-focus-offset);
}

.nb-checkbox:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.nb-checkbox__indicator {
    display: flex;
    align-items: center;
    justify-content: center;
}

.nb-checkbox__check {
    display: block;
    width: 70%;
    height: auto;
}

/* Sizes */
.nb-checkbox--sm {
    width: 16px;
    height: 16px;
}

.nb-checkbox--md {
    width: 20px;
    height: 20px;
}

.nb-checkbox--lg {
    width: 24px;
    height: 24px;
}
</style>
