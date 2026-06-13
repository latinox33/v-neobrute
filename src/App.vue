<script setup lang="ts">
import { ref } from 'vue';
import { NbButton } from '../registry/nb/NbButton';
import { NbSwitch } from '../registry/nb/NbSwitch';
import { NbBadge } from '../registry/nb/NbBadge';
import { NbCard } from '../registry/nb/NbCard';
import { NbCheckbox } from '../registry/nb/NbCheckbox';
import { NbRadioGroup, NbRadioGroupItem } from '../registry/nb/NbRadioGroup';
import {
    NbItem,
    NbItemActions,
    NbItemContent,
    NbItemDescription,
    NbItemGroup,
    NbItemMedia,
    NbItemTitle,
} from '../registry/nb/NbItem';
import { NbSelect, NbSelectGroup, NbSelectItem, NbSelectLabel, NbSelectSeparator } from '../registry/nb/NbSelect';

const plan = ref('free');
const fruit = ref<string>();
</script>

<template>
    <div class="container">
        <div class="row">
            <NbButton variant="default" size="sm"> Click Me </NbButton>
        </div>
        <div class="row">
            <NbSwitch />
        </div>
        <div class="row">
            <NbBadge>Some badge</NbBadge>
        </div>
        <div class="row">
            <NbCard>Card</NbCard>
        </div>
        <div class="row">
            <NbCheckbox />
        </div>
        <div class="row">
            <NbRadioGroup v-model="plan" size="lg" orientation="horizontal">
                <NbRadioGroupItem value="free" />
                <NbRadioGroupItem value="pro" />
            </NbRadioGroup>
        </div>
        <div class="row">
            <NbItemGroup>
                <NbItem>
                    <NbItemMedia>🔔</NbItemMedia>
                    <NbItemContent>
                        <NbItemTitle>Powiadomienia</NbItemTitle>
                        <NbItemDescription>Zarządzaj alertami</NbItemDescription>
                    </NbItemContent>
                    <NbItemActions><NbSwitch /></NbItemActions>
                </NbItem>
            </NbItemGroup>
        </div>
        <div class="row">
            <NbSelect v-model="fruit" placeholder="Wybierz owoc" style="max-width: 240px">
                <NbSelectGroup>
                    <NbSelectLabel>Owoce</NbSelectLabel>
                    <NbSelectItem value="apple">Jabłko</NbSelectItem>
                    <NbSelectItem value="banana">Banan</NbSelectItem>
                    <NbSelectItem value="cherry" disabled>Wiśnia (niedostępna)</NbSelectItem>
                </NbSelectGroup>
                <NbSelectSeparator />
                <NbSelectGroup>
                    <NbSelectLabel>Warzywa</NbSelectLabel>
                    <NbSelectItem value="carrot">Marchewka</NbSelectItem>
                    <NbSelectItem value="pepper">Papryka</NbSelectItem>
                </NbSelectGroup>
            </NbSelect>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 100vh;
}
.row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    align-items: center;
    margin-bottom: 0.75rem;
}
</style>
