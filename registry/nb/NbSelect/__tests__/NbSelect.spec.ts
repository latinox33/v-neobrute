import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NbSelect, NbSelectGroup, NbSelectItem, NbSelectLabel, NbSelectSeparator, type NbSelectSize } from '../index';

const DEFAULT_ITEMS = '<NbSelectItem value="one">One</NbSelectItem><NbSelectItem value="two">Two</NbSelectItem>';

const COMPONENTS = { NbSelectItem, NbSelectGroup, NbSelectLabel, NbSelectSeparator };

function mountSelect(
    props: Record<string, unknown> = {},
    itemsTemplate: string = DEFAULT_ITEMS,
    attrs: Record<string, unknown> = {},
) {
    return mount(NbSelect, {
        props,
        attrs,
        slots: { default: itemsTemplate },
        global: { components: COMPONENTS },
        attachTo: document.body,
    });
}

/**
 * Reka Select only renders its portalled content while open. jsdom cannot drive
 * the pointer-capture open flow, so we open it declaratively via `defaultOpen`,
 * which falls through to the underlying SelectRoot.
 */
function mountOpen(itemsTemplate: string = DEFAULT_ITEMS, props: Record<string, unknown> = {}) {
    return mountSelect(props, itemsTemplate, { defaultOpen: true });
}

describe('NbSelect', () => {
    it('renders an accessible trigger, closed by default', () => {
        const trigger = mountSelect().get('.nb-select');

        expect(trigger.attributes('role')).toBe('combobox');
        expect(trigger.attributes('data-state')).toBe('closed');
        expect(trigger.attributes('aria-expanded')).toBe('false');
    });

    it('applies base and default size classes', () => {
        const trigger = mountSelect().get('.nb-select');

        expect(trigger.classes()).toContain('nb-select');
        expect(trigger.classes()).toContain('nb-select--md');
    });

    it.each<NbSelectSize>(['sm', 'md', 'lg'])('applies the BEM class for size "%s"', size => {
        const trigger = mountSelect({ size }).get('.nb-select');

        expect(trigger.classes()).toContain(`nb-select--${size}`);
    });

    it('shows the placeholder when no value is selected', () => {
        const wrapper = mountSelect({ placeholder: 'Pick one' });

        expect(wrapper.get('.nb-select').text()).toContain('Pick one');
    });

    it('reflects the selected value in the trigger', async () => {
        const wrapper = mountSelect({ modelValue: 'two' });
        await wrapper.vm.$nextTick();

        expect(wrapper.get('.nb-select').text()).toContain('Two');
    });

    it('sets the disabled attribute and stays closed when disabled', async () => {
        const trigger = mountSelect({ disabled: true }).get('.nb-select');

        expect(trigger.attributes('disabled')).toBeDefined();

        await trigger.trigger('click');

        expect(trigger.attributes('data-state')).toBe('closed');
    });

    it('renders a hidden native select when name is provided', () => {
        const wrapper = mountSelect({ name: 'fruit', required: true, modelValue: 'one' });

        const select = wrapper.find('select');
        expect(select.exists()).toBe(true);
        expect(select.attributes('name')).toBe('fruit');
    });

    it('updates the displayed value when modelValue changes', async () => {
        const wrapper = mountSelect({ modelValue: 'one' });
        await wrapper.vm.$nextTick();
        expect(wrapper.get('.nb-select').text()).toContain('One');

        await wrapper.setProps({ modelValue: 'two' });
        await wrapper.vm.$nextTick();
        expect(wrapper.get('.nb-select').text()).toContain('Two');
    });
});

describe('NbSelect — open content', () => {
    it('renders the slotted items inside the portalled content', async () => {
        const wrapper = mountOpen();
        await wrapper.vm.$nextTick();

        expect(wrapper.get('.nb-select').attributes('data-state')).toBe('open');
        expect(document.querySelectorAll('[role="option"]')).toHaveLength(2);

        wrapper.unmount();
    });

    it('styles items with the nb item class and shows the indicator on the selected item', async () => {
        const wrapper = mountOpen(DEFAULT_ITEMS, { modelValue: 'one' });
        await wrapper.vm.$nextTick();

        const [selected, unselected] = document.querySelectorAll('[role="option"]');
        expect(selected?.classList.contains('nb-select__item')).toBe(true);
        expect(selected?.querySelector('.nb-select__indicator svg')).not.toBeNull();
        expect(unselected?.querySelector('.nb-select__indicator')).toBeNull();

        wrapper.unmount();
    });

    it('marks a disabled item with data-disabled and aria-disabled', async () => {
        const template =
            '<NbSelectItem value="one">One</NbSelectItem><NbSelectItem value="two" disabled>Two</NbSelectItem>';
        const wrapper = mountOpen(template);
        await wrapper.vm.$nextTick();

        const disabled = document.querySelectorAll('[role="option"]')[1];
        expect(disabled?.getAttribute('data-disabled')).not.toBeNull();
        expect(disabled?.getAttribute('aria-disabled')).toBe('true');

        wrapper.unmount();
    });

    it('renders group label and separator sub-components', async () => {
        const template =
            '<NbSelectGroup><NbSelectLabel>Fruit</NbSelectLabel><NbSelectItem value="one">One</NbSelectItem></NbSelectGroup><NbSelectSeparator />';
        const wrapper = mountOpen(template);
        await wrapper.vm.$nextTick();

        expect(document.querySelector('.nb-select__label')?.textContent).toContain('Fruit');
        expect(document.querySelector('.nb-select__separator')).not.toBeNull();

        wrapper.unmount();
    });
});
