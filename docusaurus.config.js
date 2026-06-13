import { themes as prismThemes } from "prism-react-renderer";
// import remarkPlugin from 'remark-plugin';
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

// Only show git history when git metadata is actually available.
// Can be explicitly overridden with DOCUSAURUS_ENABLE_GIT_HISTORY=true|false.
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

// const configuredApiBaseUrl = (
//   process.env.ALGO_API_URL || process.env.DOCUSAURUS_API_BASE_URL || ""
// ).trim();

// if (configuredApiBaseUrl && !/^https?:\/\//i.test(configuredApiBaseUrl)) {
//   throw new Error(
//     `Invalid API base URL: "${configuredApiBaseUrl}". The URL must start with http:// or https://`
//   );
// }

// Production API integrations must be configured explicitly. Falling back to an
// empty string would turn API calls into relative site requests and fail at runtime.

// if (process.env.NODE_ENV === "production" && !configuredApiBaseUrl) {
//   throw new Error(
//     "Missing required environment variable: ALGO_API_URL or DOCUSAURUS_API_BASE_URL"
//   );
// }

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Algo",
  tagline: "Algo Mastery for Every Learner",
  favicon: "logo/logo.png",

  url: "https://ajay-dhangar.github.io",
  baseUrl: "/algo/",
  organizationName: "codeharborhub",
  projectName: "algo",
  // customFields: {
  //   apiBaseUrl:
  //     configuredApiBaseUrl ||
  //     (process.env.NODE_ENV === "development" ? "http://localhost:5000" : undefined),
  // },

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        debug: true,
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/ajay-dhangar/algo/tree/main/templates/",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
          showLastUpdateAuthor: showGitHistory,
          showLastUpdateTime: showGitHistory,
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/ajay-dhangar/algo/tree/main/templates/",
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
        id: "announcementBar_algo_community",
        content:
          '✨ Help us grow: Leave a <b><a target="_blank" href="https://github.com/ajay-dhangar/algo">Star on GitHub</a></b> and <b><a target="_blank" href="https://chat.whatsapp.com/LKaBzmknsyIIqUY1DSMoZa?mode=gi_t">connect with the Algo Core Circle on WhatsApp</a></b> today.',
        isCloseable: true,
        backgroundColor: "var(--docusaurus-highlighted-code-line-bg)",
      },

      algolia: {
        apiKey: "865d7bd9906f532b1d8cb5cc0f02b383",
        indexName: "ajay-dhangario",
        appId: "T0I3F584D5",
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
            label: "📖 Tutorials",
          },
          {
            to: "blog",
            label: "✍️ Blogs",
            position: "left",
          },
          {
            to: "dsa-roadmap",
            label: "🎯 Contribution Tracker",
            position: "left",
          },
          {
            type: "dropdown",
            label: "🧠 Interview Engine",
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
                label: "🗺️ Verification Roadmap",
              },
              {
                to: "dsa-interview",
                label: "🔥 Core Matrix Questions",
              },
              {
                to: "applications",
                label: "🚀 Real-World Implementation",
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
                label: "⚔️ Code Challenges",
              },
              {
                to: "practice",
                label: "💻 Practice Arena",
              },
              {
                to: "quizzes",
                label: "⚡ Concept Quizzes",
              },
              {
                to: "quiz-solutions",
                label: "✅ Compiled Solutions",
              },
            ],
          },
          {
            to: "faq",
            label: "❓ FAQ",
            position: "left",
          },
          {
            type: "dropdown",
            label: "👥 Community Hub",
            position: "right",
            className: "navbar-community-dropdown",
            items: [
              {
                type: "html",
                value:
                  '<div style="padding: 0.45rem 0.75rem 0.25rem; font-family: var(--ifm-font-family-monospace); font-size: 10px; font-weight: 800; tracking-spacing: 0.05em; text-transform: uppercase; color: var(--ifm-color-primary);">Telemetry & Systems</div>',
              },
              {
                to: "contributors",
                label: "🎖️ Contributors Wall",
              },
              {
                to: "leaderboard",
                label: "📊 Global Leaderboard",
              },
              {
                to: "achievements",
                label: "🏆 Milestones & Badges",
              },
              {
                to: "sponsors",
                label: "💰 Infrastructure Patrons",
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
                label: "🛝 Code Playground",
              },
              {
                to: "stories",
                label: "✨ Success Stories",
              },
              {
                to: "community",
                label: "💬 Public Discussions",
              },
              {
                to: "resources",
                label: "📚 Extended Assets",
              },
            ],
          },
          {
            href: "https://github.com/ajay-dhangar/algo",
            position: "right",
            className: "header-github-link",
            "aria-label": "GitHub Repository Run",
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

  themes: ["@docusaurus/theme-mermaid"],
  markdown: {
    mermaid: true,
  },

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: "dsa-interview",
        path: "dsa-interview",
        routeBasePath: "dsa-interview",
        sidebarPath: require.resolve("./dsa-interview-sidebars.js"),
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
