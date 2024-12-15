// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Stirling-PDF',
    tagline: 'Your locally hosted one-stop-shop for all your PDF needs.',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://stirlingtools.com',
    // Set the /<baseUrl>/ pathname under which your site is served
    baseUrl: '/',

    organizationName: 'Stirling-Tools', // Usually your GitHub org/user name.
    projectName: 'Stirling-PDF', // Usually your repo name.

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },
    themes: ['@docusaurus/theme-search-algolia'],
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve('./sidebars.js'),
                    routeBasePath: '/',
                    editUrl: 'https://github.com/Stirling-Tools/Stirling-Tools.github.io/tree/main/',
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            image: 'img/stirling-social-card.png',
            navbar: {
                title: 'Stirling-PDF',
                logo: {
                    alt: 'Stirling-PDF Logo',
                    src: 'img/logo.svg',
                },
                items: [{
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'Docs',
                    },
                    {
                        href: 'https://github.com/Stirling-Tools/Stirling-PDF',
                        label: 'GitHub',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [{
                        title: 'Stirling-PDF',
                        items: [{
                            label: 'Homepage',
                            to: 'https://www.stirlingpdf.com/',
                        }, {
                            label: 'Demo',
                            to: 'https://stirlingpdf.io/',
                        }],
                    },
                    {
                        title: 'Community',
                        items: [{
                                label: 'Discord',
                                href: 'https://discord.gg/Cn8pWhQRxZ',
                            },
                            {
                                label: 'Docker',
                                href: 'https://hub.docker.com/r/frooodle/s-pdf',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [{
                            label: 'GitHub',
                            href: 'https://github.com/Stirling-Tools/Stirling-PDF',
                        }, ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Stirling-PDF, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),
};

module.exports = config;
