import NbCheckbox from './NbCheckbox.vue';

export type NbCheckboxSize = 'sm' | 'md' | 'lg';

export interface NbCheckboxProps {
    size?: NbCheckboxSize;
    disabled?: boolean;
    /** Forwarded to the underlying Reka UI CheckboxRoot for native form integration. */
    name?: string;
    value?: string;
    required?: boolean;
}

export { NbCheckbox };
export default NbCheckbox;
