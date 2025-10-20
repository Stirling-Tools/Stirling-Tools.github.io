// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';

const allLanguages = ['yaml', 'bash', 'docker', 'java', 'properties', 'json', 'typescript', 'css', 'markdown', 'sql', 'powershell'];


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
	scripts: [
    {
      src: 'https://app.termly.io/resource-blocker/aa66d813-045f-4a28-b465-6aab431924d6',
      type: 'text/javascript',
      attributes: {
        autoBlock: 'on'
      }
    },
  ],
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
                    lastVersion: '1.5',
                    versions: {
                        current: {
                            label: '2.0 (Beta)',
                            banner: 'unreleased',
                            badge: true,
                        },
                        '1.5': {
                            label: '1.5 (Current)',
                            banner: 'none',
                        },
                    },
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
	headTags: [
	  {
		tagName: 'img',
		attributes: {
		  referrerpolicy: 'no-referrer-when-downgrade',
		  src: 'https://static.scarf.sh/a.png?x-pxid=5d074971-2ecb-4c54-8397-30c0f91896b3',
		  height: '1',
		  width: '1',
		  style: 'display:none',
		  alt: 'x',
		},
	  },
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
                        type: 'docsVersionDropdown',
                        position: 'right',
                        dropdownActiveClassDisabled: true,
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
							{
								label: 'GitHub',
								href: 'https://github.com/Stirling-Tools/Stirling-PDF',	
							},
                        ],
                    },
					{
						title: 'Legal',
						items: [
							{
								label: 'Privacy Policy',
								href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=09506b8c-1f83-48e2-bf2e-6fce9df4b61b',
							},
							{
								label: 'Cookie Policy',
								href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=1bedd860-0cb2-49c1-a9dc-bc0886c1f6ca',
							},
							{
								label: 'Terms & Conditions',
								href: 'https://app.termly.io/policy-viewer/policy.html?policyUUID=de68b39f-5e58-4c09-b260-8bdee9b99500',
							},
						],
					},
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Stirling-PDF, Inc. Built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
				darkTheme: prismThemes.dracula,
				additionalLanguages: allLanguages
            },
        }),
};

module.exports = config;
