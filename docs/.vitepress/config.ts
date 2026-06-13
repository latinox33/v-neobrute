import { defineConfig } from 'vitepress';

export default defineConfig({
    title: 'nb-component-lib',
    description: 'Vue 3 neo-brutalist component library distributed as a shadcn-vue registry.',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Components', link: '/components/' },
        ],
        sidebar: {
            '/components/': [
                {
                    text: 'Components',
                    items: [{ text: 'Overview', link: '/components/' }],
                },
            ],
        },
    },
});
