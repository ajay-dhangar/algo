import { themes as prismThemes } from "prism-react-renderer";
// import remarkPlugin from 'remark-plugin';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
const path = require("path");

const fs = require("fs");
const { execSync } = require("child_process");

const gitHistoryOverride = process.env.DOCUSAURUS_ENABLE_GIT_HISTORY;
const showGitHistory =
  gitHistoryOverride === "true"
    ? true
    : gitHistoryOverride === "false"
    ? false
    : (() => {
        try {
          if (!fs.existsSync(path.join(__dirname, ".git"))) {
            return false;
          }
          // Dry run a git log check to verify git operations succeed on actual files (fails on OneDrive)
          execSync("git log -1 docusaurus.config.js", { stdio: "ignore" });
          return true;
        } catch {
          return false;
        }
      })();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Algo",
  tagline: "Algo Mastery for Every Learner",
  favicon: "logo/logo.png",

  url: "https://ajay-dhangar.github.io",
  baseUrl: "/algo/",
  organizationName: "ajay-dhangar",
  projectName: "algo",

  onBrokenLinks: "throw",

  i18n: {
    defaultLocale: "en",
    locales: ["en", "hi"], // Add 'hi' here
    localeConfigs: {
      en: { label: "English" },
      hi: { label: "हिन्दी" }, // Label for the dropdown
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: true,
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/ajay-dhangar/algo/tree/main/",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateAuthor: showGitHistory,
          showLastUpdateTime: showGitHistory,
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/ajay-dhangar/algo/tree/main/",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        pages: {
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
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      image: "/",

      liveCodeBlock: {
        playgroundPosition: "bottom",
      },

      announcementBar: {
        id: "star_us_announcement",
        content:
          '🌟 Loving the project? Support our open-source journey with a <b><a target="_blank" rel="noopener noreferrer" href="https://github.com/ajay-dhangar/algo">Star on GitHub</a></b>!',
        textColor: "var(--announcement-text)",
        isCloseable: true,
      },
      algolia: {
        appId: process.env.ALGOLIA_APP_ID || "T0I3F584D5",
        apiKey:
          process.env.ALGOLIA_API_KEY || "865d7bd9906f532b1d8cb5cc0f02b383",
        indexName: process.env.ALGOLIA_INDEX_NAME || "ajay-dhangario",
        contextualSearch: true,
      },

      navbar: {
        title: "Algo",
        logo: {
          alt: "Algo Logo",
          src: "logo/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Tutorials",
          },
          {
            type: "dropdown",
            label: "Interview Engine",
            position: "left",
            className: "navbar-interview-dropdown",
            items: [
              {
                type: "html",
                value:
                  '<div style="padding: 0.45rem 0.75rem 0.25rem; font-family: var(--ifm-font-family-monospace); font-size: 10px; font-weight: 800; tracking-spacing: 0.05em; text-transform: uppercase; color: var(--ifm-color-primary);">System Preparation</div>',
              },
              {
                to: "roadmap",
                label: "Verification Roadmap",
              },
              {
                to: "dsa-interview",
                label: "Core Matrix Questions",
              },
              {
                to: "applications",
                label: "Real-World Implementation",
              },
              {
                to: "dsa-roadmap",
                label: "Contribution Tracker",
              },
              {
                type: "html",
                value:
                  '<hr style="margin: 0.4rem 0; border: none; border-top: 1px solid var(--ifm-contents-border-color, #e2e8f0); opacity: 0.6;"/>',
              },
              {
                type: "html",
                value:
                  '<div style="padding: 0.25rem 0.75rem; font-family: var(--ifm-font-family-monospace); font-size: 10px; font-weight: 800; tracking-spacing: 0.05em; text-transform: uppercase; color: var(--ifm-color-primary);">Evaluation Pools</div>',
              },
              {
                to: "challenges",
                label: "Code Challenges",
              },
              {
                to: "practice",
                label: "Practice Arena",
              },
              {
                to: "quizzes",
                label: "Concept Quizzes",
              },
              {
                to: "quiz-solutions",
                label: "Compiled Solutions",
              },
            ],
          },
          {
            type: "dropdown",
            label: "Community Hub",
            position: "left",
            className: "navbar-community-dropdown",
            items: [
              {
                type: "html",
                value:
                  '<div style="padding: 0.45rem 0.75rem 0.25rem; font-family: var(--ifm-font-family-monospace); font-size: 10px; font-weight: 800; tracking-spacing: 0.05em; text-transform: uppercase; color: var(--ifm-color-primary);">Telemetry & Systems</div>',
              },
              {
                to: "contributors",
                label: "Contributors Wall",
              },
              {
                to: "leaderboard",
                label: "Global Leaderboard",
              },
              {
                to: "achievements",
                label: "Milestones & Badges",
              },
              {
                to: "sponsors",
                label: "Infrastructure Patrons",
              },
              {
                type: "html",
                value:
                  '<hr style="margin: 0.4rem 0; border: none; border-top: 1px solid var(--ifm-contents-border-color, #e2e8f0); opacity: 0.6;"/>',
              },
              {
                type: "html",
                value:
                  '<div style="padding: 0.25rem 0.75rem; font-family: var(--ifm-font-family-monospace); font-size: 10px; font-weight: 800; tracking-spacing: 0.05em; text-transform: uppercase; color: var(--ifm-color-primary);">Ecosystem Labs</div>',
              },
              {
                to: "playground",
                label: "Code Playground",
              },
              {
                to: "algorithm-visualizer",
                label: "Algorithm Visualizer",
              },
              {
                to: "tree-sandbox",
                label: "Tree Sandbox",
                to: "recursion-visualizer",
                label: "Recursion Visualizer",
              },
              {
                to: "stories",
                label: "Success Stories",
              },
              {
                to: "community",
                label: "Public Discussions",
              },
              {
                to: "resources",
                label: "Extended Assets",
              },
            ],
          },
          {
            to: "faq",
            label: "FAQ",
            position: "left",
          },
          {
            to: "blog",
            label: "Blogs",
            position: "right",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            type: "search",
            position: "right",
          },
          {
            label: "Sign Up",
            href: "/register",
            position: "right",
            className: "algo-signup algo-link",
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
          "java",
          "latex",
          "haskell",
          "matlab",
          "php",
          "powershell",
          "bash",
          "diff",
          "json",
          "scss",
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
    }),

  markdown: {
    mermaid: true,
    format: "mdx",
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  themes: ["@docusaurus/theme-mermaid", "@docusaurus/theme-live-codeblock"],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: "dsa-interview",
        path: "dsa-interview",
        routeBasePath: "dsa-interview",
        sidebarPath: require.resolve("./sidebars.js"),
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        showLastUpdateAuthor: showGitHistory,
        showLastUpdateTime: showGitHistory,
      },
    ],
    [
      "@docusaurus/plugin-content-blog",
      /** @type {import('@docusaurus/plugin-content-blog').Options} */
      {
        id: "story",
        path: "story",
        editUrl: ({ locale, blogDirPath, blogPath, permalink }) =>
          `https://github.com/ajay-dhangar/algo/edit/main/${blogDirPath}/${blogPath}`,
        editLocalizedFiles: false,
        blogTitle: "Algo Success Stories",
        blogDescription:
          "Inspiring journeys of triumph and growth in the world of algorithms. Discover how learners overcame challenges, achieved milestones, and transformed their skills through dedication and perseverance.",
        blogSidebarCount: 5,
        blogSidebarTitle: "Recent Success Stories",
        routeBasePath: "story",
        include: ["**/*.{md,mdx}"],
        exclude: [
          "**/_*.{js,jsx,ts,tsx,md,mdx}",
          "**/_*/**",
          "**/*.test.{js,jsx,ts,tsx}",
          "**/__tests__/**",
        ],
        postsPerPage: 10,
        blogListComponent: "@theme/BlogListPage",
        blogPostComponent: "@theme/BlogPostPage",
        blogTagsListComponent: "@theme/BlogTagsListPage",
        blogTagsPostsComponent: "@theme/BlogTagsPostsPage",
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        truncateMarker: /<!--\s*(truncate)\s*-->/,
        showReadingTime: true,
        feedOptions: {
          type: "all",
          title: "Algo Success Stories",
          description:
            "Inspiring journeys of triumph and growth in the world of algorithms. Discover how learners overcame challenges, achieved milestones, and transformed their skills through dedication and perseverance.",
          copyright: "Copyright (c) 2024 Algo, Inc.",
          language: undefined,
          createFeedItems: async (params) => {
            const { blogPosts, defaultCreateFeedItems, ...rest } = params;
            return defaultCreateFeedItems({
              blogPosts: blogPosts.filter((item, index) => index < 10),
              ...rest,
            });
          },
        },
      },
    ],

    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: process.env.GTAG_TRACKING_ID || "G-N1R880BPS0",
        anonymizeIP: true,
      },
    ],

    [
      "@docusaurus/plugin-google-tag-manager",
      {
        containerId: "GTM-NWMCVM3L",
      },
    ],

    [
      "@docusaurus/plugin-pwa",
      {
        debug: false,
        offlineModeActivationStrategies: [
          "always",
          "appInstalled",
          "standalone",
          "queryString",
        ],
        // swRegister: false,
        swCustom: require.resolve("./src/sw.js"),
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "/algo/favicon_io/favicon.ico",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "/algo/manifest.json",
          },
          {
            tagName: "meta",
            name: "theme-color",
            content: "rgb(37, 194, 160)",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-capable",
            content: "yes",
          },
          {
            tagName: "meta",
            name: "apple-mobile-web-app-status-bar-style",
            content: "#000",
          },
          {
            tagName: "link",
            rel: "apple-touch-icon",
            href: "/algo/favicon_io/apple-icon-180x180.png",
          },
          {
            tagName: "link",
            rel: "mask-icon",
            href: "/algo/favicon_io/favicon-32x32.png",
            color: "rgb(62, 204, 94)",
          },
          {
            tagName: "meta",
            name: "msapplication-TileImage",
            content: "/algo/favicon_io/ms-icon-144x144.png",
          },
          {
            tagName: "meta",
            name: "msapplication-TileColor",
            content: "#000",
          },
        ],
      },
    ],

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
