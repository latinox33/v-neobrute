import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NbCard, type NbCardShadow } from '../index';

describe('NbCard', () => {
    it('renders default slot content in the body', () => {
        const wrapper = mount(NbCard, { slots: { default: 'Card content' } });

        expect(wrapper.find('.nb-card__body').text()).toBe('Card content');
    });

    it('applies base and default shadow classes', () => {
        const wrapper = mount(NbCard);

        expect(wrapper.classes()).toContain('nb-card');
        expect(wrapper.classes()).toContain('nb-card--shadow-md');
    });

    it.each<NbCardShadow>(['sm', 'md', 'lg', 'xl'])('applies the BEM class for shadow "%s"', shadow => {
        const wrapper = mount(NbCard, { props: { shadow } });

        expect(wrapper.classes()).toContain(`nb-card--shadow-${shadow}`);
    });

    it('does not render header and footer sections without slots', () => {
        const wrapper = mount(NbCard, { slots: { default: 'Content' } });

        expect(wrapper.find('.nb-card__header').exists()).toBe(false);
        expect(wrapper.find('.nb-card__footer').exists()).toBe(false);
    });

    it('renders the header slot in a semantic header element', () => {
        const wrapper = mount(NbCard, { slots: { header: 'Title' } });

        const header = wrapper.find('.nb-card__header');
        expect(header.element.tagName).toBe('HEADER');
        expect(header.text()).toBe('Title');
    });

    it('renders the footer slot in a semantic footer element', () => {
        const wrapper = mount(NbCard, { slots: { footer: 'Actions' } });

        const footer = wrapper.find('.nb-card__footer');
        expect(footer.element.tagName).toBe('FOOTER');
        expect(footer.text()).toBe('Actions');
    });

    it('falls extra attributes through to the root element', () => {
        const wrapper = mount(NbCard, { attrs: { 'data-testid': 'card' } });

        expect(wrapper.attributes('data-testid')).toBe('card');
    });
});
