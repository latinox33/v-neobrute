import NbSwitch from './NbSwitch.vue';

export type NbSwitchSize = 'sm' | 'md' | 'lg';

export interface NbSwitchProps {
    size?: NbSwitchSize;
    disabled?: boolean;
    /** Forwarded to the underlying Reka UI SwitchRoot for native form integration. */
    name?: string;
    value?: string;
    required?: boolean;
}

export { NbSwitch };
export default NbSwitch;
