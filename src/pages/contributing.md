---
title: Contributing to Algo
hide_table_of_contents: true
---

<div className="m-4 p-4">

Welcome to the **Algo** project! We’re thrilled that you’re considering contributing to this open-source **DSA** collection. Whether you’re new to open source or experienced, follow the steps below to make your first contribution.

## Getting Started

### 1. Fork the Repository

- Click the "Fork" button at the top right of this repository to create your own copy under your GitHub account.

### 2. Clone the Forked Repository

- Clone the forked repository to your local machine:
  ```bash
  git clone https://github.com/your-username/algo.git
  ```
- Replace `your-username` with your GitHub username.

### 3. Set Upstream Remote

- Navigate to the cloned directory:
  ```bash
  cd algo
  ```
- Add the original repository as the upstream remote:
  ```bash
  git remote add upstream https://github.com/ajay-dhangar/algo.git
  ```

## Making Changes

### 1. Create a New Branch

- Create a new branch for your feature or bug fix:
  ```bash
  git checkout -b feature/your-branch-name
  ```
- Use a descriptive branch name like `feature/add-binary-search` or `fix/sorting-bug`.

### 2. Make Your Changes

- Add new algorithms or improve existing ones.
- Follow the project’s coding style and guidelines.
- Document your code where necessary using comments.

### 3. Test Your Changes

- Make sure your changes work as expected.
- If the project has a test suite, run the tests to confirm everything is working.

### 4. Commit Your Changes

- Stage the changes:
  ```bash
  git add .
  ```
- Commit with a meaningful message:
  ```bash
  git commit -m "Add: [Short Description of Your Changes]"
  ```

### 5. Push Your Branch to GitHub

- Push the changes to your fork:
  ```bash
  git push origin feature/your-branch-name
  ```

## Creating a Pull Request

### 1. Open a Pull Request

- Go to your forked repository on GitHub.
- Click "Compare & pull request" next to your branch.
- Fill in a detailed description of the changes.

### 2. Wait for Review

- A project maintainer will review your pull request.
- You may be asked to make changes.

### 3. Update Your Pull Request if Necessary

- Make changes locally and push them to your branch:
  ```bash
  git push origin feature/your-branch-name
  ```

### 4. Pull Request Merged

- Once approved, your pull request will be merged.
- Congratulations on your contribution! 🎉

## Keeping Your Fork Updated

1. **Fetch the latest changes from upstream**:
   ```bash
   git fetch upstream
   ```
2. **Merge the changes into your local `main` branch**:
   ```bash
   git checkout main
   git merge upstream/main
   ```
3. **Push the updates to your fork**:
   ```bash
   git push origin main
   ```
4. **Create a new branch for your changes**:
   ```bash
    git checkout -b feature/your-branch-name
   ```
5. **Continue making changes, testing, and creating pull requests**.

## Resources for Guidance

Here are some resources that may be helpful as you contribute to Algo:

- **[Docusaurus Documentation](https://docusaurus.io/docs)**: Learn how to create and structure documentation using Docusaurus.
- **[React.js Documentation](https://reactjs.org/docs/getting-started.html)**: Familiarize yourself with React.js if you're working on any front-end code.
- **[Markdown Guide](https://www.markdownguide.org)**: Understand how to write and format Markdown for documentation.
- **[MDX Documentation](https://mdxjs.com/docs/getting-started/)**: Learn about using MDX for writing JSX in Markdown.
- **[Mermaid Documentation](https://mermaid.js.org/)**: Use Mermaid to create diagrams and flowcharts in Markdown files.

<br />

## Video Tutorial for Beginners

<div className="my-4 p-4 rounded-lg">

<Tabs>
<TabItem value="hi" label="Hindi" default>
<LiteYouTubeEmbed
    id="fFNXCve39nI"
    params="autoplay=1&autohide=1&showinfo=0&rel=0"
    title="How to Contribute to Open Source Projects on GitHub"
    poster="maxresdefault"
    webp />

</TabItem>

<TabItem value="en" label="English">
<LiteYouTubeEmbed
    id="CML6vfKjQss"
    params="autoplay=1&autohide=1&showinfo=0&rel=0"
    title="How to Contribute to Open Source Projects on GitHub"
    poster="maxresdefault"
    webp />

</TabItem>

</Tabs>

</div>

<br />
<br />

<h2 className="text-center">Need Help?</h2>

If you have any questions or need assistance with contributing to Algo, feel free to reach out to us. We're here to help you get started on your open source journey!

<GiscusComponent />

</div>
