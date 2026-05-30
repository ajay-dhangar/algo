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
  ```python
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

### 5. Commit Your Changes 
Commit your changes with a descriptive message:

```bash
$ git commit -m "Added algorithm for [algorithm-name]"
```

### 6. Push to Your Fork
Push your changes to the forked repository:

```bash
$ git push origin <branch-name>
```

### 7. Create a Pull Request
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
