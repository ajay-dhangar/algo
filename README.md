# [Algo](https://ajay-dhangar.github.io/algo/) - Open Source Algorithm Repository

<img width="1024" height="434" alt="image" src="https://github.com/user-attachments/assets/38eb4aed-766b-49f3-add3-e3eb37890a37" />

---

## 🌟 Support the Project

If you find this repository helpful for your learning or development, please consider giving it a **Star**! It helps increase the project's visibility and invites more amazing developers to collaborate.

[![Click here to leave a star!](https://img.shields.io/github/stars/ajay-dhangar/algo?style=flat&logo=github)](https://github.com/ajay-dhangar/algo) [![Donate via Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF)](https://rzp.io/rzp/algo-sponsors)

---


## Table of Contents

| [Intro](#introduction) | [Events](#algo-events) | [Overview](#project-overview) | [Features](#features) | [Website](#website) | [Install](#installation) | [Local Dev](#local-development) | [Build](#build) | [Deployment](#deployment) | [Contributing](#-contributing) |
|---|---|---|---|---|---|---|---|---|---|

---

## Introduction

Welcome to **Algo**, an open-source educational platform built with Docusaurus (React + MDX). We provide developers with comprehensive algorithmic solutions and resources. Whether you're a beginner or an expert, you can contribute, learn, and help us build the world's top educational documentation.

<div align="center">
<br>
<table align="center">
    <thead align="center">
        <tr>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Close PRs</b></td>
            <td><b>🛠 Languages</b></td>
            <td><b>🌐 Contributors</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/ajay-dhangar/algo?style=flat&logo=github"/></td>
            <td><img alt="Forks" src="https://img.shields.io/github/forks/ajay-dhangar/algo?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/ajay-dhangar/algo?style=flat&logo=github"/></td>
            <td><img alt="Open Pull Requests" src="https://img.shields.io/github/issues-pr/ajay-dhangar/algo?style=flat&logo=github"/></td>
           <td><img alt="Close Pull Requests" src="https://img.shields.io/github/issues-pr-closed/ajay-dhangar/algo?style=flat&color=critical&logo=github"/></td>
           <td><img alt="GitHub language count" src="https://img.shields.io/github/languages/count/ajay-dhangar/algo?style=flat&color=critical&logo=github"></td>
           <td><img alt="GitHub contributors" src="https://img.shields.io/github/contributors/ajay-dhangar/algo?color=2b9348"></td>
        </tr>
    </tbody>
</table>
</div>

---

## Algo Events

We are actively participating in the following open-source events:

| Event Logo | Event Name | Event Description | Status |
| :---: | :---: | :--- | :---: |
| <picture><source srcset="gssoc-algo-banner.webp" type="image/webp"/><img src="gssoc-algo-banner.png" width="200" height="auto" loading="lazy" alt="GSSoC 26"/></picture> | **GSSoC '26** | GirlScript Summer of Code (GSSoC) is an awesome 3-month open-source program that's all about getting people into software development. | **Active** |
| <img src="girlscript.jpg" width="200" height="auto" loading="lazy" alt="GSSoC 24"/> | **GSSoC'24 Extd** | GSSoC'24 Extd is a one-month open-source Program conducted by the GirlScript Foundation. It is an initiative to introduce more beginners to Open-Source Software Development. | **Active** |
| <img src="postman.png" width="200" height="auto" loading="lazy" alt="Postman Challenge"/> | **Postman Challenge** | The Postman Challenge in collaboration with GSSoC is an initiative to promote API development and open-source contributions. Participants complete challenges using Postman and are rewarded with certificates and goodies. | **Active** |
| <img src="festhack.jpg" width="200" height="auto" loading="lazy" alt="Hacktoberfest 2024"/> | **Hacktoberfest 2024** | Hacktoberfest is a month-long celebration of open source software run by DigitalOcean, GitHub, and Twilio. It encourages contributions to open source projects and promotes a global community of developers. | *Excluded* |

---

## Project Overview

Algo provides a collection of well-documented algorithmic solutions written in various programming languages, covering a range of topics like sorting, searching, dynamic programming, and more.

### Learning Resources
- [DSA Roadmap by Roadmap.sh](https://roadmap.sh/datastructures-and-algorithms)

### Our Mission
- Create an extensive library of algorithms across multiple programming languages.
- Help developers master core algorithmic problem-solving.
- Foster a strong global open-source community.

## Features

- **Multi-language Support**: Algorithms in multiple programming languages ([contribution workflow](./CONTRIBUTING.md#5-how-to-add-a-new-algorithm-in-multiple-languages))
- **Beginner-Friendly**: Well-structured, easy-to-understand explanations
- **Open Source Contributions**: Welcoming developers at all levels to contribute
- **Community Forum**: A new interactive platform where developers can ask questions, share ideas, and collaborate in real-time. This forum will help bridge the gap between beginners and experts, allowing for deeper engagement and problem-solving.

## Website

This documentation website is powered by [Docusaurus](https://docusaurus.io/), a modern static website generator built with React.

## Installation

```bash
 npm install
```

## Local Development

```bash
 npm start
```

This command starts your local development environment and automatically pops up a browser window. Most documentation or client-side changes are reflected live via Hot Reload without needing a server restart.

## Build

```bash
 npm run build
```

This compiles optimized static content directly inside the `/build` directory, perfectly ready to be deployed to static hosting providers.

### Using SSH:

```bash
 USE_SSH=true npm run deploy
```

### Not using SSH:

```bash
 GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub Pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## 🤝 Contributing

We love welcoming contributions from developers at all levels! To keep our codebase clean and responsive, our project maintenance team follows a strict quality standard.

### Claim the Issue Automatically

You don't need to wait for a maintainer to assign you! Once you find an issue you want to work on:
* Comment **`.take`** or **`!assign`** on the issue.
* Our automated bot will assign the issue to you instantly.
* *Note: Please only claim one issue at a time to keep it fair for everyone.*

### Strict Inactivity Rule (7-Day Limit)
> ⚠️ **Important Policy:** Once you are assigned an issue or open a Pull Request, you must provide active updates or submit changes within **max 7 days**. If an issue or PR is left with **no response or zero activity for over 7 days**, it will be automatically **closed** by the project repository owners or maintainers to open up opportunities for other waiting contributors.

### Maintainer Commitments

* **24-Hour Evaluation:** We review and assign new tracking issues promptly.
* **Continuous Integration:** Automated checks and formatting test suites must pass 100% cleanly before merging.
* **Prerequisites:** Please read our detailed [CONTRIBUTING.md](./CONTRIBUTING.md) guide thoroughly before requesting an assignment.

## Contributors ✨

Heartfelt thanks to these absolute legends who have contributed code and documentation to the **Algo** project ❤️:

[![Contributors](https://contrib.rocks/image?repo=ajay-dhangar/algo&max=300)](https://github.com/ajay-dhangar/algo/graphs/contributors)

<br>

## Manually invoke Gemini Code Assist

Gemini Code Assist listens to comments from any pull request contributor, and decides whether it should respond.

To manually invoke Gemini Code Assist, you can use the following commands in the main comments page on the pull request as an issue comment.

| Command | Description
|:---|:---|
|`/gemini summary` | Posts a summary of the changes in the pull request |
|`/gemini review` |Posts a code review of the changes in the pull request |
|`/gemini`| Manually invokes Gemini Code Assist in comments |
|`/gemini help` | Overview of the available commands |

<!--
## 📈 Repository Analytics

<table width="100%">
  <tr>
    <th width="50%">🌟 Stargazers Roster</th>
    <th width="50%">🍴 Forkers Roster</th>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/ajay-dhangar/algo/stargazers">
          <img src="https://reporoster.com/stars/dark/ajay-dhangar/algo" alt="Stargazers repo roster" width="100%"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/ajay-dhangar/algo/network/members">
        <img src="https://reporoster.com/forks/dark/ajay-dhangar/algo" alt="Forkers repo roster" width="100%"/>
      </a>
    </td>
  </tr>
</table>

-->

## Resources for Guidance

These links are summarized in [CONTRIBUTING.md — Recommended reading](./CONTRIBUTING.md#recommended-reading) with a one-line note on when to use each tool while contributing or editing docs.

- [Docusaurus Documentation](https://docusaurus.io/docs/docs-introduction) — site layout, sidebars, and local preview
- [Markdown Guide](https://www.markdownguide.org/) — writing `.md` algorithm and tutorial pages
- [MDX Documentation](https://mdxjs.com/docs/) — pages that embed React components
- [React.js Documentation](https://react.dev/learn) — custom components and interactive docs
- [Mermaid Documentation](https://mermaid.js.org/) — flowcharts and diagrams in documentation

<div align="center">
    <a href="#top">
        <img src="https://img.shields.io/badge/Back%20to%20Top-000000?style=for-the-badge&logo=github&logoColor=white" alt="Back to Top">
    </a>
</div>
