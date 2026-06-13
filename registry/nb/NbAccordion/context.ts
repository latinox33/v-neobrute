import { inject, provide, type ComputedRef, type InjectionKey } from 'vue';
import type { NbAccordionSize } from './index';

interface NbAccordionContext {
    size: ComputedRef<NbAccordionSize>;
}

const NB_ACCORDION_KEY: InjectionKey<NbAccordionContext> = Symbol('NbAccordion');

export function provideNbAccordion(ctx: NbAccordionContext): void {
    provide(NB_ACCORDION_KEY, ctx);
}

export function useNbAccordion(): NbAccordionContext {
    const ctx = inject(NB_ACCORDION_KEY);
    if (!ctx) throw new Error('NbAccordionTrigger must be used inside NbAccordion');
    return ctx;
}
