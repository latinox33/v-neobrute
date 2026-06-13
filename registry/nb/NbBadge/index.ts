import NbBadge from './NbBadge.vue';

export type NbBadgeVariant = 'default' | 'outline' | 'ghost' | 'destructive';
export type NbBadgeSize = 'sm' | 'md' | 'lg';

export interface NbBadgeProps {
    variant?: NbBadgeVariant;
    size?: NbBadgeSize;
}

export { NbBadge };
export default NbBadge;
