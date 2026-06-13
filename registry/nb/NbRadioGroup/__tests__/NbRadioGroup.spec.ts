import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { NbRadioGroup, NbRadioGroupItem, type NbRadioGroupSize } from '../index';

function mountGroup(props: InstanceType<typeof NbRadioGroup>['$props'] = {}, itemsTemplate?: string) {
    return mount(NbRadioGroup, {
        props,
        slots: {
            default: itemsTemplate ?? '<NbRadioGroupItem value="one" /><NbRadioGroupItem value="two" />',
        },
        global: { components: { NbRadioGroupItem } },
    });
}

describe('NbRadioGroup', () => {
    it('renders an accessible radio group with items', () => {
        const wrapper = mountGroup();

        expect(wrapper.attributes('role')).toBe('radiogroup');
        expect(wrapper.findAll('[role="radio"]')).toHaveLength(2);
    });

    it('applies base and default orientation classes', () => {
        const wrapper = mountGroup();

        expect(wrapper.classes()).toContain('nb-radio-group');
        expect(wrapper.classes()).toContain('nb-radio-group--vertical');
    });

    it('applies the horizontal orientation class', () => {
        const wrapper = mountGroup({ orientation: 'horizontal' });

        expect(wrapper.classes()).toContain('nb-radio-group--horizontal');
    });

    it('reflects the selected item from modelValue', () => {
        const wrapper = mountGroup({ modelValue: 'two' });

        const items = wrapper.findAll('[role="radio"]');
        expect(items[0]?.attributes('aria-checked')).toBe('false');
        expect(items[1]?.attributes('aria-checked')).toBe('true');
        expect(items[1]?.attributes('data-state')).toBe('checked');
    });

    it('selects an item on click and emits update:modelValue', async () => {
        const wrapper = mountGroup();

        const items = wrapper.findAll('[role="radio"]');
        await items[0]?.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toEqual([['one']]);
        expect(items[0]?.attributes('data-state')).toBe('checked');
        expect(wrapper.find('.nb-radio__indicator').exists()).toBe(true);
    });

    it('does not select items when the group is disabled', async () => {
        const wrapper = mountGroup({ disabled: true });

        const item = wrapper.find('[role="radio"]');
        await item.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
        expect(item.attributes('data-state')).toBe('unchecked');
    });

    it('falls extra attributes through to the group root', () => {
        const wrapper = mountGroup();

        expect(wrapper.attributes('role')).toBe('radiogroup');
    });
});

describe('NbRadioGroupItem', () => {
    it('applies the default size class inherited from the group', () => {
        const wrapper = mountGroup();

        expect(wrapper.find('[role="radio"]').classes()).toContain('nb-radio--md');
    });

    it.each<NbRadioGroupSize>(['sm', 'md', 'lg'])('inherits size "%s" from the group', size => {
        const wrapper = mountGroup({ size });

        expect(wrapper.find('[role="radio"]').classes()).toContain(`nb-radio--${size}`);
    });

    it('overrides the inherited size with its own prop', () => {
        const wrapper = mountGroup({ size: 'sm' }, '<NbRadioGroupItem value="one" size="lg" />');

        expect(wrapper.find('[role="radio"]').classes()).toContain('nb-radio--lg');
    });

    it('can be disabled individually', async () => {
        const wrapper = mountGroup({}, '<NbRadioGroupItem value="one" disabled />');

        const item = wrapper.find('[role="radio"]');
        expect(item.attributes('disabled')).toBeDefined();

        await item.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('throws when used outside NbRadioGroup', () => {
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        expect(() => mount(NbRadioGroupItem, { props: { value: 'one' } })).toThrow(
            'NbRadioGroupItem must be used inside NbRadioGroup',
        );

        spy.mockRestore();
    });
});
