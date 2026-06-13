import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NbLabel, type NbLabelSize } from '../index';

describe('NbLabel', () => {
    it('renders slot content in a label element', () => {
        const wrapper = mount(NbLabel, { slots: { default: 'Email' } });

        expect(wrapper.element.tagName).toBe('LABEL');
        expect(wrapper.text()).toBe('Email');
    });

    it('applies base and default size classes', () => {
        const wrapper = mount(NbLabel);

        expect(wrapper.classes()).toContain('nb-label');
        expect(wrapper.classes()).toContain('nb-label--md');
    });

    it.each<NbLabelSize>(['sm', 'md', 'lg'])('applies the BEM class for size "%s"', size => {
        const wrapper = mount(NbLabel, { props: { size } });

        expect(wrapper.classes()).toContain(`nb-label--${size}`);
    });

    it('renders an aria-hidden required mark when required is true', () => {
        const wrapper = mount(NbLabel, { props: { required: true } });
        const mark = wrapper.find('.nb-label__required');

        expect(mark.exists()).toBe(true);
        expect(mark.text()).toBe('*');
        expect(mark.attributes('aria-hidden')).toBe('true');
    });

    it('omits the required mark by default', () => {
        const wrapper = mount(NbLabel);

        expect(wrapper.find('.nb-label__required').exists()).toBe(false);
    });

    it('falls the for attribute through to the label element', () => {
        const wrapper = mount(NbLabel, { attrs: { for: 'email' } });

        expect(wrapper.attributes('for')).toBe('email');
    });
});
