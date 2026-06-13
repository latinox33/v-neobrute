import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NbSwitch, type NbSwitchSize } from '../index';

describe('NbSwitch', () => {
    it('renders an accessible switch, unchecked by default', () => {
        const wrapper = mount(NbSwitch);

        expect(wrapper.attributes('role')).toBe('switch');
        expect(wrapper.attributes('aria-checked')).toBe('false');
        expect(wrapper.attributes('data-state')).toBe('unchecked');
    });

    it('applies base and default size classes', () => {
        const wrapper = mount(NbSwitch);

        expect(wrapper.classes()).toContain('nb-switch');
        expect(wrapper.classes()).toContain('nb-switch--md');
    });

    it.each<NbSwitchSize>(['sm', 'md', 'lg'])('applies the BEM class for size "%s"', size => {
        const wrapper = mount(NbSwitch, { props: { size } });

        expect(wrapper.classes()).toContain(`nb-switch--${size}`);
    });

    it('renders the thumb element', () => {
        const wrapper = mount(NbSwitch);

        expect(wrapper.find('.nb-switch__thumb').exists()).toBe(true);
    });

    it('reflects the checked state from modelValue', () => {
        const wrapper = mount(NbSwitch, { props: { modelValue: true } });

        expect(wrapper.attributes('aria-checked')).toBe('true');
        expect(wrapper.attributes('data-state')).toBe('checked');
    });

    it('toggles on click and emits update:modelValue', async () => {
        const wrapper = mount(NbSwitch);

        await wrapper.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toEqual([[true]]);
        expect(wrapper.attributes('data-state')).toBe('checked');

        await wrapper.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toEqual([[true], [false]]);
        expect(wrapper.attributes('data-state')).toBe('unchecked');
    });

    it('sets the disabled attribute and does not toggle when disabled', async () => {
        const wrapper = mount(NbSwitch, { props: { disabled: true } });

        expect(wrapper.attributes('disabled')).toBeDefined();

        await wrapper.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
        expect(wrapper.attributes('data-state')).toBe('unchecked');
    });

    it('renders a hidden form input when name is provided', () => {
        const wrapper = mount(NbSwitch, {
            props: { name: 'notifications', value: 'enabled', required: true },
        });

        const input = wrapper.find('input');
        expect(input.exists()).toBe(true);
        expect(input.attributes('name')).toBe('notifications');
        expect(input.attributes('value')).toBe('enabled');
        expect(input.attributes('required')).toBeDefined();
    });

    it('falls extra attributes through to the root element', () => {
        const wrapper = mount(NbSwitch, { attrs: { 'aria-label': 'Notifications' } });

        expect(wrapper.attributes('aria-label')).toBe('Notifications');
    });
});
