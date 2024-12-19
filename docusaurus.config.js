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
	plugins: [
    [
      "posthog-docusaurus",
      {
        apiKey: "phc_qy9V53BkvTATJESFrSBvg8Rw5m3KvYuTmmk9IojIjyZ",
        appUrl: "https://eu.i.posthog.com", // optional, defaults to "https://us.i.posthog.com"
        enableInDevelopment: true, // optional
      },
    ],
  ],
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
			algolia: {
			  // The application ID provided by Algolia
			  appId: 'NJB9CKQAIT',

			  // Public API key: it is safe to commit it
			  apiKey: 'c67f84bf0cdec4d1962ac4e0d65fb4e5',

			  indexName: 'stirlingpdf',

			  // Optional: see doc section below
			  contextualSearch: true,

			  // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
			  externalUrlRegex: 'external\\.com|domain\\.com',

			  // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
			  replaceSearchResultPathname: {
				from: '/docs/', // or as RegExp: /\/docs\//
				to: '/',
			  },

			  // Optional: Algolia search parameters
			  searchParameters: {},

			  // Optional: path for search page that enabled by default (`false` to disable it)
			  searchPagePath: 'search',

			  // Optional: whether the insights feature is enabled or not on Docsearch (`false` by default)
			  insights: false,

			  //... other Algolia params
			},
	
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
