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
          editUrl: "https://github.com/Ajay-Dhangar/algo/tree/main/",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/ajay-dhangar/algo/tree/main/",
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
            to: "https://ajay-dhangar.github.io/algo/roadmap",
            label: "Roadmap",
            position: "left",
            target: "_self",
          },
          {
            to: "dsa-roadmap",
            label: "DSA Roadmap",
            position: "left",
            target: "_self", 
          },
          {
            to: "https://ajay-dhangar.github.io/algo/challenges",
            label: "Challenges",
            position: "left",
            target: "_self",
          },
          {
            to: "https://ajay-dhangar.github.io/algo/practice",
            label: "Practice",
            position: "left",
            target: "_self",
          },
          {
            to: "https://ajay-dhangar.github.io/algo/leaderboard",
            label: "Leaderboard",
            position: "left",
            target: "_self",
          },
          {
            to: "https://ajay-dhangar.github.io/algo/community",
            label: "Community",
            position: "left",
            target: "_self",
          },
          {
            to: "https://ajay-dhangar.github.io/algo/resources",
            label: "Resources",
            position: "left",
            target: "_self",
          },
          {
            to: "https://ajay-dhangar.github.io/algo/faq",
            label: "FAQ",
            position: "left",
            target: "_self",
          },
          {
            to: "https://ajay-dhangar.github.io/algo/blogs",
            label: "Blogs",
            position: "left",
            target: "_self",
          },
          {
            href: "https://github.com/ajay-dhangar/algo",
            label: "GitHub",
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
      path.join(__dirname, "/plugins/my-plugin"),
      {
        settings: "Some20settings",
        api: "Some-API",
        keys: "Some-keys",
      },
    ],
  ],
};

export default config;
