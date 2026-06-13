import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NbCheckbox, type NbCheckboxSize } from '../index';

describe('NbCheckbox', () => {
    it('renders an accessible checkbox, unchecked by default', () => {
        const wrapper = mount(NbCheckbox);

        expect(wrapper.attributes('role')).toBe('checkbox');
        expect(wrapper.attributes('aria-checked')).toBe('false');
        expect(wrapper.attributes('data-state')).toBe('unchecked');
    });

    it('applies base and default size classes', () => {
        const wrapper = mount(NbCheckbox);

        expect(wrapper.classes()).toContain('nb-checkbox');
        expect(wrapper.classes()).toContain('nb-checkbox--md');
    });

    it.each<NbCheckboxSize>(['sm', 'md', 'lg'])('applies the BEM class for size "%s"', size => {
        const wrapper = mount(NbCheckbox, { props: { size } });

        expect(wrapper.classes()).toContain(`nb-checkbox--${size}`);
    });

    it('shows the check indicator only when checked', async () => {
        const wrapper = mount(NbCheckbox);

        expect(wrapper.find('.nb-checkbox__indicator').exists()).toBe(false);

        await wrapper.trigger('click');

        expect(wrapper.find('.nb-checkbox__indicator').exists()).toBe(true);
        expect(wrapper.find('.nb-checkbox__check').exists()).toBe(true);
    });

    it('reflects the checked state from modelValue', () => {
        const wrapper = mount(NbCheckbox, { props: { modelValue: true } });

        expect(wrapper.attributes('aria-checked')).toBe('true');
        expect(wrapper.attributes('data-state')).toBe('checked');
    });

    it('toggles on click and emits update:modelValue', async () => {
        const wrapper = mount(NbCheckbox);

        await wrapper.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
        expect(wrapper.attributes('data-state')).toBe('checked');

        await wrapper.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toEqual([[true], [false]]);
        expect(wrapper.attributes('data-state')).toBe('unchecked');
    });

    it('sets the disabled attribute and does not toggle when disabled', async () => {
        const wrapper = mount(NbCheckbox, { props: { disabled: true } });

        expect(wrapper.attributes('disabled')).toBeDefined();

        await wrapper.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
        expect(wrapper.attributes('data-state')).toBe('unchecked');
    });

    it('renders a hidden form input when name is provided', () => {
        const wrapper = mount(NbCheckbox, {
            props: { name: 'terms', value: 'accepted', required: true },
        });

        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes('name')).toBe('terms');
        expect(input.attributes('value')).toBe('accepted');
        expect(input.attributes('required')).toBeDefined();
    });

    it('falls extra attributes through to the root element', () => {
        const wrapper = mount(NbCheckbox, { attrs: { 'aria-label': 'Accept terms' } });

        expect(wrapper.attributes('aria-label')).toBe('Accept terms');
    });
});
