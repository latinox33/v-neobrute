import NbAccordion from './NbAccordion.vue';
import NbAccordionItem from './NbAccordionItem.vue';
import NbAccordionTrigger from './NbAccordionTrigger.vue';
import NbAccordionContent from './NbAccordionContent.vue';

export type NbAccordionSize = 'sm' | 'md' | 'lg';
export type NbAccordionType = 'single' | 'multiple';

export interface NbAccordionProps {
    /** Whether one or multiple items can be open at once. */
    type?: NbAccordionType;
    /** Allow closing an open item in `single` mode (no effect in `multiple`). */
    collapsible?: boolean;
    disabled?: boolean;
    size?: NbAccordionSize;
}

export interface NbAccordionItemProps {
    value: string;
    disabled?: boolean;
}

export interface NbAccordionTriggerProps {
    /** Overrides the size inherited from the parent NbAccordion. */
    size?: NbAccordionSize;
}

export { NbAccordion, NbAccordionItem, NbAccordionTrigger, NbAccordionContent };
export default NbAccordion;
