<script setup lang="ts">
import { computed } from 'vue';
import type { NbCardProps } from './index';

const props = withDefaults(defineProps<NbCardProps>(), {
    shadow: 'md',
});

const classes = computed(() => ['nb-card', `nb-card--shadow-${props.shadow}`]);
</script>

<template>
    <div :class="classes">
        <header v-if="$slots.header" class="nb-card__header">
            <slot name="header" />
        </header>
        <div class="nb-card__body">
            <slot />
        </div>
        <footer v-if="$slots.footer" class="nb-card__footer">
            <slot name="footer" />
        </footer>
    </div>
</template>

<style scoped>
.nb-card {
    display: flex;
    flex-direction: column;
    background: var(--nb-background);
    color: var(--nb-foreground);
    border: var(--nb-border);
    border-radius: var(--nb-radius);
}

.nb-card__header {
    padding: 12px 16px;
    border-bottom: var(--nb-border);
    font-weight: var(--nb-font-weight-strong);
}

.nb-card__body {
    padding: 16px;
}

.nb-card__footer {
    padding: 12px 16px;
    border-top: var(--nb-border);
}

/* Shadows */
.nb-card--shadow-sm {
    box-shadow: var(--nb-shadow-sm);
}

.nb-card--shadow-md {
    box-shadow: var(--nb-shadow-md);
}

.nb-card--shadow-lg {
    box-shadow: var(--nb-shadow-lg);
}

.nb-card--shadow-xl {
    box-shadow: var(--nb-shadow-xl);
}
</style>
