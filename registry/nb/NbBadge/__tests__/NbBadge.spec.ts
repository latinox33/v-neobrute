import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { NbBadge, type NbBadgeSize, type NbBadgeVariant } from '../index';

describe('NbBadge', () => {
    it('renders slot content in a span', () => {
        const wrapper = mount(NbBadge, { slots: { default: 'New' } });

        expect(wrapper.element.tagName).toBe('SPAN');
        expect(wrapper.text()).toBe('New');
    });

    it('applies base, default variant and default size classes', () => {
        const wrapper = mount(NbBadge);

        expect(wrapper.classes()).toContain('nb-badge');
        expect(wrapper.classes()).toContain('nb-badge--default');
        expect(wrapper.classes()).toContain('nb-badge--md');
    });

    it.each<NbBadgeVariant>(['default', 'outline', 'ghost', 'destructive'])(
        'applies the BEM class for variant "%s"',
        variant => {
            const wrapper = mount(NbBadge, { props: { variant } });

            expect(wrapper.classes()).toContain(`nb-badge--${variant}`);
        },
    );

    it.each<NbBadgeSize>(['sm', 'md', 'lg'])('applies the BEM class for size "%s"', size => {
        const wrapper = mount(NbBadge, { props: { size } });

        expect(wrapper.classes()).toContain(`nb-badge--${size}`);
    });

    it('falls extra attributes through to the root element', () => {
        const wrapper = mount(NbBadge, { attrs: { 'aria-label': 'Status' } });

        expect(wrapper.attributes('aria-label')).toBe('Status');
    });
});
