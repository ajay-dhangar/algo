# Contributing to Algo

Thank you for your interest in contributing to **Algo**! We welcome contributions from everyone, whether you're a beginner or an experienced developer. Contributions can include adding new algorithms, improving documentation, fixing bugs, or enhancing the user experience. This guide will help you get started.

## Resources for Guidance
Here are some resources that may be helpful as you contribute to Algo:
- [Docusaurus Documentation](https://docusaurus.io/docs/docs-introduction)
- [React.js Documentation](https://react.dev/learn)
- [Markdown Guide](https://www.markdownguide.org/)
- [MDX Documentation](https://mdxjs.com/docs/)
- [Mermaid Documentation](https://mermaid.js.org/)
- [KaTeX Math Rendering Documentation](https://katex.org/docs/supported.html)
- [Math Equations](https://docusaurus.io/docs/markdown-features/math-equations)

## How to Contribute

### 1. Fork the Repository ([Video 1](https://www.loom.com/share/4c5f309a28c444caa4e70557669979f6?sid=88202acf-3ab8-4321-bcf2-3ced94215994))
Start by forking the repository to your GitHub account. This creates a copy of the repository under your account.

### 2. Clone Your Fork
Clone the repository to your local machine using:

```bash
$ git clone https://github.com/<your-username>/algo.git
```

### 3. Create a New Branch ([Video 2](https://www.loom.com/share/74493008c617419ea1a1f69755124dd8?sid=28379156-ff84-4e57-90a9-234b4ba15160))
Create a branch for your contribution:

```bash
$ git checkout -b <branch-name>
```

### 4. Make Your Changes ([Video 3](https://www.loom.com/share/ea1a931b8f9a492a8994ca3d006a4526?sid=0b889369-23a4-42c7-a61e-7e7de1474494), [Video 4](https://www.loom.com/share/55b170e45b7d4cbdb4fa443b84d03a3c?sid=7a4c1db8-ae74-4a05-815c-ca6f30f8c5c4))
Make your changes, which could include:
- Adding new algorithms
- Improving existing documentation
- Creating new documentation pages
- Fixing bugs

### 5. Writing Documentation for Algo
If your contribution involves documentation, here’s how to write effective content using Docusaurus:

#### a. Markdown & MDX
- Documentation should be written in Markdown (`.md`) or MDX (`.mdx`), which supports JSX syntax.
- MDX allows you to use React components inside Markdown files. This is helpful for adding interactive elements or custom components.

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
- **sidebar_label**: The label displayed in the sidebar.
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

### 6. Commit Your Changes ([Video 5](https://www.loom.com/share/47d2ba8e35fd4382979899fe21c29974?sid=8b5a3af6-5a80-4025-b045-76e64ff9a839))
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

Thank you for contributing! Let's build Algo together and create an amazing learning platform for mastering Data Structures and Algorithms. ✨
