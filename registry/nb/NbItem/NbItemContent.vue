<template>
    <div class="nb-item__content">
        <slot />
    </div>
</template>

<style scoped>
.nb-item__content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
}
</style>
