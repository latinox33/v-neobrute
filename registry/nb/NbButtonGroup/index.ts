import type { PrimitiveProps } from 'reka-ui';
import NbButtonGroup from './NbButtonGroup.vue';
import NbButtonGroupSeparator from './NbButtonGroupSeparator.vue';
import NbButtonGroupText from './NbButtonGroupText.vue';

export type NbButtonGroupOrientation = 'horizontal' | 'vertical';

export interface NbButtonGroupProps extends PrimitiveProps {
    orientation?: NbButtonGroupOrientation;
}

export interface NbButtonGroupSeparatorProps {
    /** Overrides the orientation; defaults to the axis perpendicular to a horizontal group. */
    orientation?: NbButtonGroupOrientation;
}

export type NbButtonGroupTextProps = PrimitiveProps;

export { NbButtonGroup, NbButtonGroupSeparator, NbButtonGroupText };
export default NbButtonGroup;
