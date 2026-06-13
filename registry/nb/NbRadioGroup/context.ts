import { inject, provide, type ComputedRef, type InjectionKey } from 'vue';
import type { NbRadioGroupSize } from './index';

interface NbRadioGroupContext {
    size: ComputedRef<NbRadioGroupSize>;
}

const NB_RADIO_GROUP_KEY: InjectionKey<NbRadioGroupContext> = Symbol('NbRadioGroup');

export function provideNbRadioGroup(ctx: NbRadioGroupContext): void {
    provide(NB_RADIO_GROUP_KEY, ctx);
}

export function useNbRadioGroup(): NbRadioGroupContext {
    const ctx = inject(NB_RADIO_GROUP_KEY);
    if (!ctx) throw new Error('NbRadioGroupItem must be used inside NbRadioGroup');
    return ctx;
}
