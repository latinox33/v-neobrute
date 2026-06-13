import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { NbAccordion, NbAccordionItem, NbAccordionTrigger, NbAccordionContent, type NbAccordionSize } from '../index';

const DEFAULT_ITEMS = `
    <NbAccordionItem value="one">
        <NbAccordionTrigger>First</NbAccordionTrigger>
        <NbAccordionContent>First panel</NbAccordionContent>
    </NbAccordionItem>
    <NbAccordionItem value="two">
        <NbAccordionTrigger>Second</NbAccordionTrigger>
        <NbAccordionContent>Second panel</NbAccordionContent>
    </NbAccordionItem>
`;

const COMPONENTS = { NbAccordionItem, NbAccordionTrigger, NbAccordionContent };

function mountAccordion(props: Record<string, unknown> = {}, itemsTemplate: string = DEFAULT_ITEMS) {
    return mount(NbAccordion, {
        props,
        slots: { default: itemsTemplate },
        global: { components: COMPONENTS },
    });
}

describe('NbAccordion', () => {
    it('renders the base class and slotted triggers', () => {
        const wrapper = mountAccordion();

        expect(wrapper.classes()).toContain('nb-accordion');
        expect(wrapper.findAll('[data-reka-collection-item]').length).toBeGreaterThan(0);
        expect(wrapper.findAll('button')).toHaveLength(2);
    });

    it('keeps all items closed by default', () => {
        const wrapper = mountAccordion();

        const triggers = wrapper.findAll('button');
        triggers.forEach(trigger => {
            expect(trigger.attributes('aria-expanded')).toBe('false');
            expect(trigger.attributes('data-state')).toBe('closed');
        });
    });

    it('opens an item on click and exposes the content', async () => {
        const wrapper = mountAccordion();

        const [first] = wrapper.findAll('button');
        await first?.trigger('click');

        expect(first?.attributes('aria-expanded')).toBe('true');
        expect(first?.attributes('data-state')).toBe('open');
        expect(wrapper.text()).toContain('First panel');
    });

    it('collapses an open item when collapsible is enabled', async () => {
        const wrapper = mountAccordion({ collapsible: true });

        const [first] = wrapper.findAll('button');
        await first?.trigger('click');
        expect(first?.attributes('data-state')).toBe('open');

        await first?.trigger('click');
        expect(first?.attributes('data-state')).toBe('closed');
    });

    it('keeps only one item open in single mode', async () => {
        const wrapper = mountAccordion({ type: 'single' });

        const [first, second] = wrapper.findAll('button');
        await first?.trigger('click');
        await second?.trigger('click');

        expect(first?.attributes('data-state')).toBe('closed');
        expect(second?.attributes('data-state')).toBe('open');
    });

    it('allows multiple open items in multiple mode', async () => {
        const wrapper = mountAccordion({ type: 'multiple' });

        const [first, second] = wrapper.findAll('button');
        await first?.trigger('click');
        await second?.trigger('click');

        expect(first?.attributes('data-state')).toBe('open');
        expect(second?.attributes('data-state')).toBe('open');
    });

    it('reflects the controlled modelValue', () => {
        const wrapper = mountAccordion({ modelValue: 'two' });

        const [first, second] = wrapper.findAll('button');
        expect(first?.attributes('data-state')).toBe('closed');
        expect(second?.attributes('data-state')).toBe('open');
    });

    it('emits update:modelValue when an item is toggled', async () => {
        const wrapper = mountAccordion();

        const [first] = wrapper.findAll('button');
        await first?.trigger('click');

        expect(wrapper.emitted('update:modelValue')).toEqual([['one']]);
    });

    it('does not open items when the whole accordion is disabled', async () => {
        const wrapper = mountAccordion({ disabled: true });

        const [first] = wrapper.findAll('button');
        await first?.trigger('click');

        expect(first?.attributes('data-state')).toBe('closed');
        expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('does not open a disabled item', async () => {
        const template = `
            <NbAccordionItem value="one" disabled>
                <NbAccordionTrigger>First</NbAccordionTrigger>
                <NbAccordionContent>First panel</NbAccordionContent>
            </NbAccordionItem>
        `;
        const wrapper = mountAccordion({}, template);

        const [first] = wrapper.findAll('button');
        await first?.trigger('click');

        expect(first?.attributes('data-state')).toBe('closed');
    });
});

describe('NbAccordionTrigger', () => {
    it('applies the default size class inherited from the accordion', () => {
        const wrapper = mountAccordion();

        expect(wrapper.find('button').classes()).toContain('nb-accordion__trigger--md');
    });

    it.each<NbAccordionSize>(['sm', 'md', 'lg'])('inherits size "%s" from the accordion', size => {
        const wrapper = mountAccordion({ size });

        expect(wrapper.find('button').classes()).toContain(`nb-accordion__trigger--${size}`);
    });

    it('overrides the inherited size with its own prop', () => {
        const template = `
            <NbAccordionItem value="one">
                <NbAccordionTrigger size="lg">First</NbAccordionTrigger>
                <NbAccordionContent>First panel</NbAccordionContent>
            </NbAccordionItem>
        `;
        const wrapper = mountAccordion({ size: 'sm' }, template);

        expect(wrapper.find('button').classes()).toContain('nb-accordion__trigger--lg');
    });

    it('throws when used outside NbAccordion', () => {
        const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        expect(() => mount(NbAccordionTrigger)).toThrow('NbAccordionTrigger must be used inside NbAccordion');

        spy.mockRestore();
    });
});
