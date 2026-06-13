import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NbButtonGroup, NbButtonGroupSeparator, NbButtonGroupText, type NbButtonGroupOrientation } from '../index';

describe('NbButtonGroup', () => {
    it('renders slot content in a div with role="group"', () => {
        const wrapper = mount(NbButtonGroup, { slots: { default: 'Actions' } });

        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.attributes('role')).toBe('group');
        expect(wrapper.text()).toBe('Actions');
    });

    it('applies base and default horizontal orientation classes', () => {
        const wrapper = mount(NbButtonGroup);

        expect(wrapper.classes()).toContain('nb-button-group');
        expect(wrapper.classes()).toContain('nb-button-group--horizontal');
    });

    it.each<NbButtonGroupOrientation>(['horizontal', 'vertical'])(
        'applies the BEM class for orientation "%s"',
        orientation => {
            const wrapper = mount(NbButtonGroup, { props: { orientation } });

            expect(wrapper.classes()).toContain(`nb-button-group--${orientation}`);
        },
    );

    it('renders a custom tag via `as`', () => {
        const wrapper = mount(NbButtonGroup, { props: { as: 'nav' } });

        expect(wrapper.element.tagName).toBe('NAV');
    });

    it('renders the slot child element when asChild is set', () => {
        const wrapper = mount(NbButtonGroup, {
            props: { asChild: true },
            slots: { default: '<section>content</section>' },
        });

        expect(wrapper.element.tagName).toBe('SECTION');
        expect(wrapper.classes()).toContain('nb-button-group');
    });

    it('falls the aria-label through to the root element', () => {
        const wrapper = mount(NbButtonGroup, { attrs: { 'aria-label': 'Text formatting' } });

        expect(wrapper.attributes('aria-label')).toBe('Text formatting');
    });

    it('renders the full anatomy with text, buttons and a separator', () => {
        const wrapper = mount(NbButtonGroup, {
            slots: {
                default: `
                    <NbButtonGroupText>Prefix</NbButtonGroupText>
                    <button>One</button>
                    <NbButtonGroupSeparator />
                    <button>Two</button>
                `,
            },
            global: {
                components: { NbButtonGroupText, NbButtonGroupSeparator },
            },
        });

        expect(wrapper.find('.nb-button-group__text').text()).toBe('Prefix');
        expect(wrapper.find('.nb-button-group__separator').exists()).toBe(true);
        expect(wrapper.findAll('button')).toHaveLength(2);
    });

    it('renders nested groups as direct group children', () => {
        const wrapper = mount(NbButtonGroup, {
            slots: {
                default: `
                    <NbButtonGroup><button>One</button><button>Two</button></NbButtonGroup>
                    <NbButtonGroup><button>Three</button><button>Four</button></NbButtonGroup>
                `,
            },
            global: {
                components: { NbButtonGroup },
            },
        });

        const nested = wrapper.element.querySelectorAll(':scope > .nb-button-group');
        expect(nested).toHaveLength(2);
        expect(wrapper.findAll('button')).toHaveLength(4);
    });
});

describe('NbButtonGroupSeparator', () => {
    it('renders a separator with vertical orientation by default', () => {
        const wrapper = mount(NbButtonGroupSeparator);

        expect(wrapper.attributes('role')).toBe('separator');
        expect(wrapper.attributes('aria-orientation')).toBe('vertical');
        expect(wrapper.classes()).toContain('nb-button-group__separator--vertical');
    });

    it.each<NbButtonGroupOrientation>(['horizontal', 'vertical'])(
        'reflects the "%s" orientation in aria and class',
        orientation => {
            const wrapper = mount(NbButtonGroupSeparator, { props: { orientation } });

            expect(wrapper.attributes('aria-orientation')).toBe(orientation);
            expect(wrapper.classes()).toContain(`nb-button-group__separator--${orientation}`);
        },
    );
});

describe('NbButtonGroupText', () => {
    it('renders slot content in a div by default', () => {
        const wrapper = mount(NbButtonGroupText, { slots: { default: 'Label' } });

        expect(wrapper.element.tagName).toBe('DIV');
        expect(wrapper.classes()).toContain('nb-button-group__text');
        expect(wrapper.text()).toBe('Label');
    });

    it('renders the slot child element when asChild is set', () => {
        const wrapper = mount(NbButtonGroupText, {
            props: { asChild: true },
            slots: { default: '<label for="name">Name</label>' },
        });

        expect(wrapper.element.tagName).toBe('LABEL');
        expect(wrapper.attributes('for')).toBe('name');
        expect(wrapper.classes()).toContain('nb-button-group__text');
    });
});
