# Contributing to Algo

Thank you for your interest in contributing to **Algo**! We welcome contributions from everyone, whether you're a beginner or an experienced developer. Contributions can include adding new algorithms, improving documentation, fixing bugs, or enhancing the user experience. This guide will help you get started.

## Recommended reading

Algo’s docs site is built with **Docusaurus** (React + MDX). You do not need to master every tool before your first contribution—use this list when you hit a specific task. The same links appear in the README under [Resources for Guidance](./README.md#resources-for-guidance).

| Resource | When it is useful |
| -------- | ----------------- |
| [Docusaurus docs](https://docusaurus.io/docs/docs-introduction) | Site structure, docs folders, sidebars, front-matter, and local preview (`npm start`). Start here if you are new to this repo. |
| [Markdown Guide](https://www.markdownguide.org/) | Writing `.md` pages: headings, lists, links, and fenced code blocks for algorithm implementations. |
| [MDX documentation](https://mdxjs.com/docs/) | Pages that use `.mdx` and embed React components (imports/JSX inside a doc file). |
| [React docs](https://react.dev/learn) | Custom components under `src/components/` or interactive examples referenced from MDX. |
| [Mermaid](https://mermaid.js.org/) | Flowcharts and diagrams inside docs (see also [Writing Documentation](#4-writing-documentation-for-algo) below). |
| [KaTeX supported functions](https://katex.org/docs/supported.html) | Math notation in docs (`$...$` / `$$...$$`). |
| [Docusaurus math equations](https://docusaurus.io/docs/markdown-features/math-equations) | Enabling and troubleshooting math rendering in this project. |

**Contributing to the site?** Read [How to Contribute](#how-to-contribute) and [Writing Documentation for Algo](#4-writing-documentation-for-algo).

**Following the DSA roadmap?** See [learn.md](./learn.md) and [Roadmap to Learning DSA](docs/data-structures/roadmap-to-dsa.md) for study paths; use the table above when you want to read or improve doc pages alongside your practice.

## How to Contribute

### 1. Issue Assignment

* **Browse Issues:** Look for issues labeled gssoc26 or good first issue.
* **Request Assignment:** Comment on the issue to express interest. As your Project Admin, I will aim to respond within 24 hours.
* **Wait for Confirmation:** Do not start work until the issue is officially assigned to you.

### 2. Setting Up Locally
1. Fork the Repository to your GitHub account. (*Start by forking the repository to your GitHub account. This creates a copy of the repository under your account.*)
2. Clone Your Fork (*Clone the repository to your local machine using:*)

   ```bash
   git clone https://github.com/<your-username>/algo.git
   ```
3. Change the working directory:

   ```bash
   cd algo
   ```

4. Add Upstream Remote (*Add a reference to the original repository.*)

   ```bash
   git remote add upstream https://github.com/ajay-dhangar/algo.git
   ```

5. Check the remotes for this repository.

   ```bash
   git remote -v
   ```

6. Always take a pull from the upstream repository to your main branch to keep it up-to-date with the main project (updated repository).

   ```bash
   git pull upstream main
   ```

7. Create a new branch. 

   ```bash
   git checkout -b <your-branch-name>
   ```

8. Install Dependencies:

   ```bash
   npm install
   ```
   
9. Run Locally:

   ```bash
   npm start
   ```

### 3. Making Changes
Make your changes, which could include:
* Create a new branch: `git checkout -b feature/your-feature-name`.
* Ensure your changes follow the [Docusaurus structure](#b-content-structure) (Front-matter is required for all `.md` or `.mdx` files):
* Adding new algorithms
* Improving existing documentation
* Creating new documentation pages
* Fixing bugs

### 4. Writing Documentation for Algo
If your contribution involves documentation, here’s how to write effective content using Docusaurus:

#### a. Markdown & MDX
- Documentation should be written in Markdown (`.md`) or MDX (`.mdx`), which supports JSX syntax.
- MDX allows you to use React components inside Markdown files. This helps add interactive elements or custom components.

#### b. Content Structure

![image](https://github.com/user-attachments/assets/a3567a71-6ca5-4f78-b736-59f2109440f5)

Each documentation file should start with a front-matter section for Docusaurus to recognize the page:

```md
---
id: <unique-id>
title: <Page Title>
sidebar_label: <Sidebar Label>
sidebar_position: <Position in Sidebar>
description: <Short Description>
tags: [<tag1>, <tag2>]
---
```
- **id**: A unique identifier for the page.
- **title**: The page title.
- **sidebar_label**: The label is displayed in the sidebar.
- **sidebar_position**: Order of the page in the sidebar.
- **description**: A short description of the page content.
- **tags**: Tags for categorizing content.

#### c. Using Headings
- Use `#` for the main title, `##` for subsections, and `###` for sub-subsections.
- Ensure headings follow a logical order.

#### d. Adding Code Blocks
- Use fenced code blocks for code snippets:

  ````md
  ```text
  def binary_search(arr, target):
      low, high = 0, len(arr) - 1
      while low <= high:
          mid = (low + high) // 2
          if arr[mid] == target:
              return mid
          elif arr[mid] < target:
              low = mid + 1
          else:
              high = mid - 1
      return -1
  ```
  ````

  Use the real language tag in your docs (for example `python`, `cpp`, `java`) instead of `text`. The example above uses `text` so CI does not try to execute illustration snippets in this guide.

#### e. Adding Math Formulas
- Use KaTeX for rendering math expressions:

  ```md
    $$ E = mc^2 $$
    ```
- Refer to the [KaTeX documentation](https://katex.org/docs/supported.html) for supported features.

#### f. Diagrams and Visuals with Mermaid
- Create diagrams using Mermaid syntax:

  ````md
    ```mermaid
    graph TD;
        A-->B;
        A-->C;
        B-->D;
        C-->D;
    ```
  ````

#### g. Using React Components
- Import React components for interactivity:

   ```jsx
    import MyComponent from '@site/src/components/MyComponent';
    
    <MyComponent />
    ```

### 5. How to Add a New Algorithm in Multiple Languages

Algo documents algorithms as **Docusaurus pages under `docs/`**. Implementations for each language live in the **same** `.md` or `.mdx` file as fenced code blocks (for example ` ```python `, ` ```cpp `, ` ```java `). There is no separate per-language source tree for site content.

Use this checklist so new pages appear in the sidebar, pass validation, and stay consistent with existing content.

#### a. Choose where the page belongs

| Goal | Typical location | Notes |
|------|------------------|-------|
| Algorithm or DSA topic (sorting, graphs, DP, etc.) | `docs/extra/...` | Most contributions go here, under an existing topic folder (for example `docs/extra/algorithms/sorting-algorithms/`). |
| Core data structure | `docs/basic-data-structures/` or `docs/data-structures/` | Use the folder that already covers that structure. |
| Language syntax or tooling (not a specific algorithm) | `docs/languages/<language>/` | For Python/Java/C++ guides; usually **not** where you add a new algorithm write-up. |
| Programming basics | `docs/programming-fundamentals/` | Control flow, OOP basics, etc. |

**Folder layout (simplified):**

```text
docs/
├── extra/                          # Most algorithms & advanced DSA topics
│   ├── algorithms/
│   │   ├── sorting-algorithms/
│   │   │   ├── _category_.json     # Sidebar group label & order
│   │   │   └── your-algorithm.md
│   │   └── ...
│   ├── graphs/
│   ├── dynamic-programming/
│   └── ...
├── basic-data-structures/
├── data-structures/
├── languages/                      # Language guides (separate from algo pages)
│   ├── python/
│   ├── java/
│   ├── cpp/
│   └── javascript/
└── programming-fundamentals/
```

Pick the **closest existing category**. If you need a new subfolder, add a `_category_.json` next to your new `.md` / `.mdx` file (see [Registering in the sidebar](#f-registering-in-the-sidebar)).

#### b. Create the documentation file

1. Add `your-algorithm-name.md` (or `.mdx` if you need JSX/React components) in the chosen folder.
2. Start with [front-matter](#b-content-structure). For new pages, include all fields checked by CI:

   ```md
   ---
   id: unique-kebab-case-id
   title: Your Algorithm Title
   sidebar_label: Short Sidebar Name
   sidebar_position: 10
   description: One or two sentences (at least 20 characters) for SEO and previews.
   tags: [algorithms, sorting, python]
   ---
   ```

3. Write the article: problem statement, approach, complexity, then **one subsection per language**, for example `### Python Implementation`, each followed by a fenced code block with the correct language tag (`python`, `cpp`, `java`, `javascript`, `go`, etc.).

   A good reference for multi-language layout: `docs/extra/KMP searching pattern/readme.md`.

4. Use a **globally unique** `id` in front-matter. Duplicate IDs fail `npm run validate:docs`.

#### c. MDX vs Markdown

- Use **`.md`** for standard docs (most algorithms).
- Use **`.mdx`** only when you import React components or embed JSX. Example: `docs/extra/balancedBinTree/balanced-binary-tree-checker-js.mdx`.
- Front-matter rules are the same for both.

#### d. Multi-language code in the doc (website)

Put every language implementation in the **same page**, with a heading and fenced block per language (see `docs/extra/KMP searching pattern/readme.md` for a full example).

Use clear `###` headings so readers can jump between languages. Match naming and style to neighboring files in that folder.

#### e. Optional — Algo Playground (runnable templates)

The [Multi-Language Playground](https://ajay-dhangar.github.io/algo/playground) is separate from docs. It only runs **JavaScript** (in-browser), **Python**, **C++**, and **Java** via the backend.

- Playground templates: `src/pages/playground/index.tsx` (`TEMPLATES`, `LANGUAGE_CONFIGS`).
- Execution API: `server/server.js` (`POST /api/execute-code`).

Update playground code **only** if you are adding or changing runnable templates there. A normal algorithm doc contribution does **not** require playground changes.

For playground setup, troubleshooting, and architecture, see [MULTI_LANGUAGE_PLAYGROUND.md](./MULTI_LANGUAGE_PLAYGROUND.md) and [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md). Update those two files **only** when you change playground behavior (new language support, API changes, template system), not for every new algorithm article.

#### f. Registering in the sidebar

The main docs sidebar is **auto-generated** from the `docs/` tree:

```text
// sidebars.js
tutorialSidebar: [{ type: 'autogenerated', dirName: '.' }],
```

You usually **do not** edit `sidebars.js` when adding one algorithm page. Docusaurus picks up new files automatically.

**Control visibility and order:**

1. **`sidebar_position`** in the page front-matter — order among siblings in the same folder.
2. **`_category_.json`** in a folder — label, position, and optional generated index for that group:

   ```json
   {
     "label": "Sorting Algorithms",
     "position": 2,
     "link": {
       "type": "generated-index",
       "description": "Short description shown on the category index page."
     }
   }
   ```

3. Parent categories (for example `docs/extra/_category_.json`, `docs/languages/python/_category_.json`) — only adjust if you are introducing a **new** top-level section.

The separate **DSA Interview** section uses `dsa-interview-sidebars.js` and its own docs plugin in `docusaurus.config.js`. Only touch those if your issue explicitly targets that section.

#### g. Verify locally before opening a PR

```bash
npm install
npm run validate:docs   # front-matter & unique ids
npm start               # confirm page appears in sidebar and renders
```

Fix any validation errors. Warnings (for example missing `sidebar_position` on older-style pages) should be avoided on **new** files by including all recommended fields.

#### h. Quick checklist

- [ ] Page placed under the correct `docs/` category (not scattered across unrelated folders).
- [ ] Unique `id`, `title`, `sidebar_label`, `description`, `tags` in front-matter.
- [ ] `sidebar_position` set; `_category_.json` added or updated if you created a new folder.
- [ ] Implementations for each language in one file with labeled sections and correct fence languages.
- [ ] `npm run validate:docs` passes.
- [ ] Site builds and the page shows in the sidebar (`npm start`).
- [ ] Playground / `IMPLEMENTATION_SUMMARY.md` / `MULTI_LANGUAGE_PLAYGROUND.md` updated only if you changed playground execution or templates.

### 6. Commit Your Changes 
Commit your changes with a descriptive message:

```bash
$ git commit -m "Added algorithm for [algorithm-name]"
```

### 7. Push to Your Fork
Push your changes to the forked repository:

```bash
$ git push origin <branch-name>
```

### 8. Create a Pull Request
Go to the original repository and create a Pull Request (PR). Provide a clear description of what was added or changed and why. Reference any related issues in your PR description.

## Code Style and Quality
- Keep your code clean and readable.
- Follow standard coding conventions for the language used.
- Add comments for complex code to help others understand.

## Contribution Guidelines
- Make sure your contributions align with the project’s goals and guidelines.
- Keep PRs focused on a single issue; avoid making unrelated changes.
- Respect the repository structure and follow best practices.

---

Thank you for contributing! Let's build Algo and create an amazing learning platform for mastering Data Structures and Algorithms. ✨
