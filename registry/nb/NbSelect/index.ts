import NbSelect from './NbSelect.vue';
import NbSelectGroup from './NbSelectGroup.vue';
import NbSelectItem from './NbSelectItem.vue';
import NbSelectLabel from './NbSelectLabel.vue';
import NbSelectSeparator from './NbSelectSeparator.vue';

export type NbSelectSize = 'sm' | 'md' | 'lg';

export interface NbSelectProps {
    size?: NbSelectSize;
    placeholder?: string;
    disabled?: boolean;
    /** Forwarded to the underlying Reka UI SelectRoot for native form integration. */
    name?: string;
    required?: boolean;
}

export interface NbSelectItemProps {
    value: string;
    disabled?: boolean;
}

export { NbSelect, NbSelectGroup, NbSelectItem, NbSelectLabel, NbSelectSeparator };
export default NbSelect;
