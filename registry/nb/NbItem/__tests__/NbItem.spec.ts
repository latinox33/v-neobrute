import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import {
    NbItem,
    NbItemActions,
    NbItemContent,
    NbItemDescription,
    NbItemGroup,
    NbItemMedia,
    NbItemTitle,
    type NbItemSize,
    type NbItemVariant,
} from '../index';

describe('NbItem', () => {
    it('renders slot content in a div by default', () => {
        const wrapper = mount(NbItem, { slots: { default: 'Row' } });

        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.text()).toBe('Row');
    });

    it('applies base, default variant and default size classes', () => {
        const wrapper = mount(NbItem);

        expect(wrapper.classes()).toContain('nb-item');
        expect(wrapper.classes()).toContain('nb-item--default');
        expect(wrapper.classes()).toContain('nb-item--md');
    });

    it.each<NbItemVariant>(['default', 'outline', 'ghost'])('applies the BEM class for variant "%s"', variant => {
        const wrapper = mount(NbItem, { props: { variant } });

        expect(wrapper.classes()).toContain(`nb-item--${variant}`);
    });

    it.each<NbItemSize>(['sm', 'md', 'lg'])('applies the BEM class for size "%s"', size => {
        const wrapper = mount(NbItem, { props: { size } });

        expect(wrapper.classes()).toContain(`nb-item--${size}`);
    });

    it('renders a custom tag via `as`', () => {
        const wrapper = mount(NbItem, { props: { as: 'li' } });

        expect(wrapper.element.tagName).toBe('LI');
    });

    it('renders the slot child element when asChild is set', () => {
        const wrapper = mount(NbItem, {
            props: { asChild: true },
            slots: { default: '<a href="/profile">Profile</a>' },
        });

        expect(wrapper.element.tagName).toBe('A');
        expect(wrapper.classes()).toContain('nb-item');
    });

    it('falls extra attributes through to the root element', () => {
        const wrapper = mount(NbItem, { attrs: { 'data-testid': 'item' } });

        expect(wrapper.attributes('data-testid')).toBe('item');
    });

    it('renders the full anatomy with media, content and actions', () => {
        const wrapper = mount(NbItem, {
            slots: {
                default: `
                    <NbItemMedia>icon</NbItemMedia>
                    <NbItemContent>
                        <NbItemTitle>Title</NbItemTitle>
                        <NbItemDescription>Description</NbItemDescription>
                    </NbItemContent>
                    <NbItemActions>action</NbItemActions>
                `,
            },
            global: {
                components: { NbItemMedia, NbItemContent, NbItemTitle, NbItemDescription, NbItemActions },
            },
        });

        expect(wrapper.find('.nb-item__media').text()).toBe('icon');
        expect(wrapper.find('.nb-item__content .nb-item__title').text()).toBe('Title');
        expect(wrapper.find('.nb-item__content .nb-item__description').text()).toBe('Description');
        expect(wrapper.find('.nb-item__actions').text()).toBe('action');
    });
});

describe('NbItem subcomponents', () => {
    it('NbItemDescription renders a semantic paragraph', () => {
        const wrapper = mount(NbItemDescription, { slots: { default: 'Text' } });

        expect(wrapper.element.tagName).toBe('P');
        expect(wrapper.classes()).toContain('nb-item__description');
    });

    it('NbItemTitle renders with the title class', () => {
        const wrapper = mount(NbItemTitle, { slots: { default: 'Text' } });

        expect(wrapper.classes()).toContain('nb-item__title');
    });

    it('NbItemGroup stacks items', () => {
        const wrapper = mount(NbItemGroup, {
            slots: { default: '<NbItem>one</NbItem><NbItem>two</NbItem>' },
            global: { components: { NbItem } },
        });

        expect(wrapper.classes()).toContain('nb-item-group');
        expect(wrapper.findAll('.nb-item')).toHaveLength(2);
    });
});
