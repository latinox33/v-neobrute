import type { PrimitiveProps } from 'reka-ui';
import NbItem from './NbItem.vue';
import NbItemActions from './NbItemActions.vue';
import NbItemContent from './NbItemContent.vue';
import NbItemDescription from './NbItemDescription.vue';
import NbItemGroup from './NbItemGroup.vue';
import NbItemMedia from './NbItemMedia.vue';
import NbItemTitle from './NbItemTitle.vue';

export type NbItemVariant = 'default' | 'outline' | 'ghost';
export type NbItemSize = 'sm' | 'md' | 'lg';

export interface NbItemProps extends PrimitiveProps {
    variant?: NbItemVariant;
    size?: NbItemSize;
}

export { NbItem, NbItemActions, NbItemContent, NbItemDescription, NbItemGroup, NbItemMedia, NbItemTitle };
export default NbItem;
