import { describe, it, expect } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { NbButton, type NbButtonSize, type NbButtonVariant } from '../index';

describe('NbButton', () => {
    it('renders slot content in a native button by default', () => {
        const wrapper = mount(NbButton, { slots: { default: 'Click me' } });

        expect(wrapper.element.tagName).toBe('BUTTON');
        expect(wrapper.text()).toBe('Click me');
    });

    it('applies base, default variant and default size classes', () => {
        const wrapper = mount(NbButton);

        expect(wrapper.classes()).toContain('nb-button');
        expect(wrapper.classes()).toContain('nb-button--default');
        expect(wrapper.classes()).toContain('nb-button--md');
    });

    it.each<NbButtonVariant>(['default', 'outline', 'ghost', 'destructive'])(
        'applies the BEM class for variant "%s"',
        variant => {
            const wrapper = mount(NbButton, { props: { variant } });

            expect(wrapper.classes()).toContain(`nb-button--${variant}`);
        },
    );

    it.each<NbButtonSize>(['sm', 'md', 'lg'])('applies the BEM class for size "%s"', size => {
        const wrapper = mount(NbButton, { props: { size } });

        expect(wrapper.classes()).toContain(`nb-button--${size}`);
    });

    it('defaults to type="button" to avoid accidental form submits', () => {
        const wrapper = mount(NbButton);

        expect(wrapper.attributes('type')).toBe('button');
    });

    it('passes an explicit type through', () => {
        const wrapper = mount(NbButton, { props: { type: 'submit' } });

        expect(wrapper.attributes('type')).toBe('submit');
    });

    it('renders a custom tag via `as` without the type attribute', () => {
        const wrapper = mount(NbButton, {
            props: { as: 'a' },
            attrs: { href: '/docs' },
            slots: { default: 'Docs' },
        });

        expect(wrapper.element.tagName).toBe('A');
        expect(wrapper.attributes('type')).toBeUndefined();
        expect(wrapper.attributes('href')).toBe('/docs');
    });

    it('renders the slot child element when asChild is set', () => {
        const wrapper = mount(NbButton, {
            props: { asChild: true },
            slots: { default: '<a href="/docs">Docs</a>' },
        });

        expect(wrapper.element.tagName).toBe('A');
        expect(wrapper.classes()).toContain('nb-button');
    });

    it('emits click with the MouseEvent when enabled', async () => {
        const wrapper = mount(NbButton);

        await wrapper.trigger('click');

        const emitted = wrapper.emitted('click');
        expect(emitted).toHaveLength(1);
        expect(emitted?.[0]?.[0]).toBeInstanceOf(MouseEvent);
    });

    it('sets the disabled attribute and does not emit click when disabled', async () => {
        const wrapper = mount(NbButton, { props: { disabled: true } });

        expect(wrapper.attributes('disabled')).toBeDefined();

        wrapper.element.dispatchEvent(new MouseEvent('click'));
        await nextTick();

        expect(wrapper.emitted('click')).toBeUndefined();
    });

    it('falls extra attributes through to the root element', () => {
        const wrapper = mount(NbButton, { attrs: { 'aria-label': 'Save' } });

        expect(wrapper.attributes('aria-label')).toBe('Save');
    });
});
