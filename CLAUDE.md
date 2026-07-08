# CLAUDE.md — Project Structure Reference

> This file documents the full code structure of the **algo** project to help AI assistants understand the codebase without re-reading files each session.

## Overview

- **Framework:** Docusaurus v3 (React-based static site generator)
- **Language:** TypeScript + JavaScript + MDX
- **Styling:** Tailwind CSS + custom CSS (`src/css/custom.css`)
- **Node:** >=20.0
- **Build:** `npm run build` (builds for `en` and `hi` locales)
- **Dev Server:** `npm start` (NOT `npm run dev`)
- **Validate Docs:** `npm run validate:docs` (runs `scripts/validate-frontmatter.js`)
- **Deploy:** `gh-pages -d build`

## Git Remotes

- `origin` → `https://github.com/Pranav-0440/algo.git` (fork)
- `upstream` → `https://github.com/ajay-dhangar/algo.git` (source repo)

## Key Configuration Files

| File | Purpose |
|------|---------|
| `docusaurus.config.js` | Main Docusaurus config (navbar, footer, plugins, i18n) |
| `sidebars.js` | Sidebar configuration for docs |
| `tailwind.config.js` | Tailwind CSS configuration |
| `tsconfig.json` | TypeScript configuration |
| `package.json` | Dependencies and scripts |
| `babel.config.js` | Babel configuration |
| `renovate.json` | Dependency update bot config |

---

## Directory Structure

### Root

```
algo/
├── docs/                  # Documentation content (MDX/MD files)
├── src/                   # Source code (React components, pages, data)
├── static/                # Static assets (images, manifest, robots.txt)
├── blog/                  # Blog posts
├── i18n/                  # Internationalization (hi locale)
├── scripts/               # Validation and utility scripts
├── plugins/               # Custom Docusaurus plugins
├── admin/                 # Admin-related files
├── story/                 # Story/testimonial data
├── dsa-interview/         # DSA interview prep content
├── build/                 # Production build output (gitignored)
└── node_modules/          # Dependencies (gitignored)
```

### `src/` — Source Code

```
src/
├── components/            # React components
│   ├── Homepage/          # Landing page components
│   ├── CustomDocItems/    # Custom doc page components (DocsInfo.jsx)
│   ├── DSALearningRoadmap/ # Roadmap visualization component
│   ├── ProgressTracker/   # Learning progress tracker (index.tsx)
│   ├── Testing/           # Code testing/playground components (AlgoCodeStudio.tsx)
│   ├── Visualizing/       # Algorithm visualizers (RecursionVisualizer.tsx)
│   ├── Quiz/              # Quiz components
│   ├── AlgoQuiz/          # Algorithm quiz component
│   ├── Auth/              # Authentication components
│   ├── GiscusComponent/   # Comments integration
│   ├── Highlight/         # Code highlighting
│   ├── Scroller/          # Scroll-to-top component
│   ├── ComplexityTable/   # Complexity comparison tables
│   ├── DSA/               # DSA-specific components
│   ├── EdgeCases/         # Edge case documentation
│   ├── AdsComponent/      # Advertisement components
│   ├── PracticeProblems.tsx
│   ├── ChallengeCard.tsx
│   ├── ComplexityCard.tsx
│   ├── RelatedTopics.tsx
│   ├── DPChallengeLayout.tsx
│   ├── GraphChallengeLayout.tsx
│   ├── GreedyChallengeLayout.tsx
│   ├── SortingChallengeLayout.tsx
│   ├── TreeChallengeLayout.tsx
│   ├── chatbot.jsx
│   └── index.tsx          # Component barrel exports
│
├── data/                  # Data files (TypeScript)
│   ├── topics.ts          # DSA Learning Roadmap data (Topic[] array)
│   ├── algorithmsData.ts  # Algorithm metadata
│   ├── challengeData.ts   # Challenge problems
│   ├── complexityData.ts  # Algorithm complexity info
│   ├── practiceProblems.ts # Practice problem listings
│   ├── quizData.ts        # Quiz questions
│   ├── dpChallengesData.ts
│   ├── graphChallengesData.ts
│   ├── greedyChallengesData.ts
│   ├── sortingChallengesData.ts
│   ├── treeChallengesData.ts
│   ├── events.ts
│   ├── testimonialsData.ts
│   └── algorithm-complexities.json
│
├── pages/                 # Route pages
│   ├── index.js           # Homepage
│   ├── playground/        # Code playground (index.tsx)
│   ├── dsa-roadmap/       # DSA roadmap page
│   ├── algorithm-visualizer.tsx
│   ├── recursion-visualizer.tsx
│   ├── complexity-comparison.tsx
│   ├── complexity-visualizer.tsx
│   ├── graph-visualizer.tsx
│   ├── quizzes/           # Quiz pages (sorting.tsx, linear-search.tsx)
│   ├── challenges/        # Challenge pages
│   ├── practice/          # Practice problem pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── community/         # Community page
│   ├── contributors/      # Contributors page
│   ├── leaderboard/       # Leaderboard page
│   ├── login.tsx          # Login page
│   ├── register.tsx       # Registration page
│   ├── profile.tsx        # User profile
│   ├── sponsors.tsx       # Sponsors page
│   ├── stories.tsx        # Success stories
│   ├── achievements.tsx   # User achievements
│   ├── events.tsx         # Events page
│   ├── resources/         # Learning resources
│   ├── roadmap/           # General roadmap
│   └── documentation/     # Documentation landing
│
├── theme/                 # Docusaurus theme overrides (swizzled components)
│   ├── DocItem/           # Custom doc page rendering
│   │   └── Content/       # Content wrapper (index.tsx — integrates DocsInfo, MDXContent)
│   ├── DocCard/           # Custom doc card
│   ├── DocSidebarItem/    # Sidebar item customization
│   ├── Footer/            # Custom footer
│   ├── Admonition/        # Custom admonitions
│   ├── CodeBlock/         # Custom code blocks
│   ├── Mermaid/           # Mermaid diagram support
│   ├── ReactLiveScope/    # Live code editor scope
│   ├── MDXComponents.js   # Custom MDX component mappings
│   ├── Root.js            # Root wrapper (global providers)
│   └── NotFound.js        # 404 page
│
├── css/
│   └── custom.css         # Global custom styles (includes @media print rules, Tailwind imports)
│
├── contexts/              # React context providers
├── hooks/                 # Custom React hooks
├── utils/                 # Utility functions
└── sw.js                  # Service worker
```

### `docs/` — Documentation Content

```
docs/
├── index.mdx                    # Docs landing page
├── content.mdx                  # Content overview
├── custom-page.mdx              # Custom MDX page
├── languages/                   # Programming language tutorials
│   ├── javascript/              # JS docs (js-1.md to js-17.md)
│   ├── TypeScript/              # TS docs (typescript-1.md to typescript-15.md)
│   ├── python/                  # Python docs
│   ├── java/                    # Java docs
│   ├── cpp/                     # C++ docs
│   ├── C/                       # C docs
│   ├── csharp/                  # C# docs
│   ├── kotlin/                  # Kotlin docs
│   ├── go/                      # Go docs
│   ├── Rust/                    # Rust docs
│   ├── php/                     # PHP docs
│   └── SQL/                     # SQL docs
├── programming-fundamentals/    # Core programming concepts
│   ├── language-syntax/         # Variables, operators, loops, arrays, etc.
│   └── oop-basics/              # OOP concepts
├── data-structures/             # DS theory docs
├── basic-data-structures/       # Array, linked list, etc.
├── dsa-problems/                # DSA practice problems
│   ├── easy/
│   ├── medium/
│   └── hard/
├── database-problems/           # SQL problems
│   ├── Easy/
│   ├── Medium/
│   └── Hard/
├── extra/                       # Additional algorithm docs
│   ├── algorithms/              # Sorting, backtracking, etc.
│   ├── graphs/                  # Graph algorithms
│   ├── greedy-algorithms/       # Greedy algorithm docs
│   ├── Trees/                   # Tree algorithms
│   ├── Object Oriented Programming/
│   ├── binary-search/
│   ├── computational-geometry/
│   └── ...
├── graphs/                      # Graph-specific docs
└── cheatsheets/                 # Quick reference sheets
```

### `scripts/` — Utility Scripts

| Script | Purpose |
|--------|---------|
| `validate-frontmatter.js` | Validates doc front-matter (unique IDs, required fields). Run via `npm run validate:docs` |
| `validateMetadata.js` | Validates optional metadata schema fields (category, difficulty, complexity, etc.). Run via `npm run validate:metadata` |
| `generateStats.js` | Documentation coverage dashboard — shows metadata adoption stats. Run via `npm run stats:docs` |
| `verify-markdown-code.js` | Verifies code blocks in markdown files |
| `analyze-complexity.js` | Analyzes algorithm complexity |
| `add-components-to-all-docs.js` | Bulk-adds components to doc files |
| `check-languages.sh/.bat` | Checks language support |

---

## Key Data Structures

### `src/data/topics.ts` — DSA Roadmap

```typescript
interface FileItem { name: string; link: string; }
interface Folder { name: string; files: FileItem[]; }
interface Topic { title: string; folders: Folder[]; }
export const topics: Topic[] = [...]
```

Topics order: Pick a Language → Programming Fundamentals → Data Structures → Basic Data Structures → Algorithmic Complexity → Sorting Algorithms → Searching Algorithms → Prefix Sum & Array Techniques → Recursion → Tree Data Structures → Graph Data Structures → Dynamic Programming → String Algorithms → Advanced Data Structures → Complex Data Structures → Indexing → Problem Solving Techniques → Practice Milestones → Platforms for Practice → Capstone Projects

---

## Front-Matter Requirements (for docs/)

Every `.md`/`.mdx` file in `docs/` must have:
- `id` (required, must be unique across all docs)
- `title` (required)
- `sidebar_label` (required)

- `sidebar_position` (recommended)
- `description` (required)
- `tags` (required, array)

Run `npm run validate:docs` to check.

### Optional Metadata Fields (Issue #2410)

Algorithm documentation can include these standardized metadata fields:

| Field | Type | Description |
|-------|------|-------------|
| `category` | string | Main Topic (e.g., Graph Algorithms) |
| `subcategory` | string | Topic Group (e.g., Shortest Path) |
| `difficulty` | enum | `Beginner` / `Intermediate` / `Advanced` |
| `time_complexity` | string | Runtime complexity (e.g., `O(E log V)`) |
| `space_complexity` | string | Memory complexity (e.g., `O(V)`) |
| `languages` | array | Available implementations (e.g., `[C++, Python, Java]`) |
| `prerequisites` | array | Required knowledge (e.g., `[Graph Representation, BFS]`) |

Run `npm run validate:metadata` to validate schema, `npm run stats:docs` for coverage dashboard.

---

## Important Notes

- **DO NOT** use `npm run dev` — it doesn't exist. Use `npm start` for local dev.
- **Build** produces both `en` and `hi` locale builds.
- **Theme overrides** are in `src/theme/` — these are swizzled Docusaurus components.
- **Doc rendering flow:** `src/theme/DocItem/Content/index.tsx` renders `DocsInfo` + `MDXContent`.
- **Print styles** are in `src/css/custom.css` under `@media print` — elements with class `no-print` are hidden.
- **The owner (ajay-dhangar) prefers NOT modifying front-matter IDs** — considers ID prefixing a bad practice.
