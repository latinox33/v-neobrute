<template>
    <div class="nb-item__actions">
        <slot />
    </div>
</template>

<style scoped>
.nb-item__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}
</style>
