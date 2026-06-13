import NbRadioGroup from './NbRadioGroup.vue';
import NbRadioGroupItem from './NbRadioGroupItem.vue';

export type NbRadioGroupSize = 'sm' | 'md' | 'lg';
export type NbRadioGroupOrientation = 'horizontal' | 'vertical';

export interface NbRadioGroupProps {
    size?: NbRadioGroupSize;
    orientation?: NbRadioGroupOrientation;
    disabled?: boolean;
    /** Forwarded to the underlying Reka UI RadioGroupRoot for native form integration. */
    name?: string;
    required?: boolean;
}

export interface NbRadioGroupItemProps {
    value: string;
    /** Overrides the size inherited from the parent NbRadioGroup. */
    size?: NbRadioGroupSize;
    disabled?: boolean;
}

export { NbRadioGroup, NbRadioGroupItem };
export default NbRadioGroup;
