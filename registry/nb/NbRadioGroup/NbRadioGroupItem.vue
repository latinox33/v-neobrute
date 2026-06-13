<script setup lang="ts">
import { computed } from 'vue';
import { RadioGroupIndicator, RadioGroupItem } from 'reka-ui';
import { useNbRadioGroup } from './context';
import type { NbRadioGroupItemProps } from './index';

const props = withDefaults(defineProps<NbRadioGroupItemProps>(), {
    disabled: false,
});

const group = useNbRadioGroup();

const size = computed(() => props.size ?? group.size.value);
const classes = computed(() => ['nb-radio', `nb-radio--${size.value}`]);
</script>

<template>
    <RadioGroupItem :value="value" :class="classes" :disabled="disabled">
        <RadioGroupIndicator class="nb-radio__indicator" />
    </RadioGroupItem>
</template>

<style scoped>
.nb-radio {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0;
    background: var(--nb-background);
    color: var(--nb-foreground);
    border: var(--nb-border);
    border-radius: var(--nb-radius-full);
    box-shadow: var(--nb-shadow-sm);
    cursor: pointer;
}

.nb-radio:focus-visible {
    outline: var(--nb-focus-outline);
    outline-offset: var(--nb-focus-offset);
}

.nb-radio:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.nb-radio__indicator {
    display: block;
    width: 50%;
    height: 50%;
    background: currentColor;
    border-radius: var(--nb-radius-full);
}

/* Sizes */
.nb-radio--sm {
    width: 16px;
    height: 16px;
}

.nb-radio--md {
    width: 20px;
    height: 20px;
}

.nb-radio--lg {
    width: 24px;
    height: 24px;
}
</style>
