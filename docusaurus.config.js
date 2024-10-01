import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Algo',
  tagline: 'Algo Mastery for Every Learner',
  favicon: 'logo/algo-3.png',

  url: 'https://ajay-dhangar.github.io',
  baseUrl: '/algo/',
  organizationName: 'cmhq', 
  projectName: 'algo', 

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },


  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/
        
          editUrl:
            'https://github.com/Ajay-Dhangar/algo/tree/main/', 
          },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/ajay-dhangar/algo/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      
      image: '/',
      navbar: {
        title: 'Algo',
        logo: {
          alt: 'Algo Logo',
          src: 'logo/algo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Tutorial',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/ajay-dhangar/algo',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        logo: {
          alt: 'Ajay Dhangar',
          src: '/logo/ft-copy.png',
          href: 'https://github.com/ajay-dhangar',
        },
        copyright: `Copyright © ${new Date().getFullYear()} Algo, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },      
    }),

  themes: ['@docusaurus/theme-mermaid'],
  markdown: {
    mermaid: true,
  },
};

export default config;
