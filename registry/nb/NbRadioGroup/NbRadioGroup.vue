<script setup lang="ts">
import { computed } from 'vue';
import { RadioGroupRoot } from 'reka-ui';
import { provideNbRadioGroup } from './context';
import type { NbRadioGroupProps } from './index';

const props = withDefaults(defineProps<NbRadioGroupProps>(), {
    size: 'md',
    orientation: 'vertical',
    disabled: false,
    required: false,
});

const modelValue = defineModel<string>();

provideNbRadioGroup({ size: computed(() => props.size) });

const classes = computed(() => ['nb-radio-group', `nb-radio-group--${props.orientation}`]);
</script>

<template>
    <RadioGroupRoot
        v-model="modelValue"
        :class="classes"
        :orientation="orientation"
        :disabled="disabled"
        :name="name"
        :required="required"
    >
        <slot />
    </RadioGroupRoot>
</template>

<style scoped>
.nb-radio-group {
    display: flex;
    gap: 12px;
}

.nb-radio-group--vertical {
    flex-direction: column;
}

.nb-radio-group--horizontal {
    flex-direction: row;
    align-items: center;
}
</style>
