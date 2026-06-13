import NbLabel from './NbLabel.vue';

export type NbLabelSize = 'sm' | 'md' | 'lg';

export interface NbLabelProps {
    size?: NbLabelSize;
    /** Renders a `*` mark after the label content. */
    required?: boolean;
}

export { NbLabel };
export default NbLabel;
