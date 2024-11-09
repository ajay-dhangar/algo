import { themes as prismThemes } from "prism-react-renderer";
// import remarkPlugin from 'remark-plugin';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Algo",
  tagline: "Algo Mastery for Every Learner",
  favicon: "logo/algo-3.png",

  url: "https://ajay-dhangar.github.io",
  baseUrl: "/algo/",
  organizationName: "codeharborhub",
  projectName: "algo",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: true,
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl:
            "https://github.com/ajay-dhangar/algo/tree/main/packages/create-docusaurus/templates/shared/",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl:
            "https://github.com/ajay-dhangar/algo/tree/main/packages/create-docusaurus/templates/shared/",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "/",
      announcementBar: {
        id: "announcementBar",
        content:
          '📢 Join our <a target="_blank" href="https://www.whatsapp.com/channel/0029Vah6hro8F2pGUhuAcR0B">WhatsApp Channel</a> for the latest updates and collaboration on exciting projects!',
        isCloseable: true,
        backgroundColor: "var(--docusaurus-highlighted-code-line-bg)",
      },

      algolia: {
        apiKey: "865d7bd9906f532b1d8cb5cc0f02b383",
        indexName: "ajay-dhangario",
        appId: "T0I3F584D5",
        contextualSearch: false,
      },

      navbar: {
        title: "Algo",
        logo: {
          alt: "Algo Logo",
          src: "logo/algo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Tutorial",
          },
          {
            to: "blog",
            label: "Blog",
            position: "left",
          },
          {
            to: "faq",
            label: "FAQ",
            position: "left",
          },
          {
            to: "dsa-roadmap",
            label: "Pick Topic For Contribution",
            position: "left",
          },
          {
            to: "contributors",
            label: "Contributors",
            position: "left",
          },
          {
            type: "dropdown",
            label: "More",
            position: "right",
            items: [              
              {
                to: "dsa-interview", 
                label: "Top DSA Questions",
              },
              {
                to: "roadmap",
                label: "Roadmap",
              },
              {
                to: "challenges",
                label: "Challenges",
              },
              {
                to: "practice",
                label: "Practice",
              },
              {
                to: "quizes",
                label: "Quizes",
              },
              {
                to: "quiz-solutions",
                label: "Quizzes Solutions",
              },
              {
                to: "leaderboard",
                label: "Leaderboard",
              },
              {
                to: "community",
                label: "Community",
              },
              {
                to: "resources",
                label: "Resources",
              },
              {
                to: "blogs",
                label: "Blogs",
              },
            ],
          },
          {
            href: "https://github.com/ajay-dhangar/algo",
            label: "GitHub",
            position: "right",
          },
          {
            type: "search",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/",
              },
            ],
          },
        ],
        logo: {
          alt: "Ajay Dhangar",
          src: "/logo/ft-copy.png",
          href: "https://github.com/ajay-dhangar",
        },
        copyright: `Copyright © ${new Date().getFullYear()} Algo, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          'java',
          'latex',
          'haskell',
          'matlab',
          'PHp',
          'powershell',
          'bash',
          'diff',
          'json',
          'scss',
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
    }),

  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true,
  },

  plugins: [
    [
      path.join(__dirname, "/plugins/my-plugin",),
      {
        settings: "Some20settings",
        api: "Some-API",
        keys: "Some-keys",
      },
    ],
  ],
};

export default config;
