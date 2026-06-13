import NbCard from './NbCard.vue';

export type NbCardShadow = 'sm' | 'md' | 'lg' | 'xl';

export interface NbCardProps {
    shadow?: NbCardShadow;
}

export { NbCard };
export default NbCard;
