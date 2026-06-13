import type { PrimitiveProps } from 'reka-ui';
import NbButton from './NbButton.vue';

export type NbButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive';
export type NbButtonSize = 'sm' | 'md' | 'lg';

export interface NbButtonProps extends PrimitiveProps {
    variant?: NbButtonVariant;
    size?: NbButtonSize;
    disabled?: boolean;
    /** Applied only when rendering a native `<button>` (the default `as`). */
    type?: 'button' | 'submit' | 'reset';
}

export { NbButton };
export default NbButton;
