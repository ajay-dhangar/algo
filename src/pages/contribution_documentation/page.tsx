import React from "react";
import { FaGithub, FaBook, FaCode, FaLightbulb, FaUsers } from "react-icons/fa";

const ContributionDocumentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center gap-4 mb-6">
            <FaBook className="text-5xl opacity-90" />
            <div>
              <div className="uppercase tracking-[3px] text-sm font-semibold opacity-75">
                CONTRIBUTING GUIDE
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight">
                Contributing to Algo
              </h1>
            </div>
          </div>
          <p className="text-xl max-w-2xl text-white/90">
            Thank you for your interest in contributing! We welcome developers
            of all levels to help improve Algo.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-5xl py-12">
        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-slate-800 mb-12">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
              We welcome contributions from everyone — whether you're a beginner
              or an experienced developer. Contributions can include adding new
              algorithms, improving documentation, fixing bugs, or enhancing the
              user experience.
            </p>
          </div>

          {/* Recommended Reading */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <FaLightbulb className="text-amber-500" /> Recommended Reading
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-gray-800">
                    <th className="text-left p-6 font-semibold">Resource</th>
                    <th className="text-left p-6 font-semibold">
                      When it is useful
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  <tr>
                    <td className="p-6">
                      <a
                        href="https://docusaurus.io/docs/docs-introduction"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--ifm-color-primary)] hover:underline"
                      >
                        Docusaurus docs
                      </a>
                    </td>
                    <td className="p-6 text-slate-600 dark:text-slate-400">
                      Site structure, docs folders, sidebars, front-matter, and
                      local preview
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6">
                      <a
                        href="https://www.markdownguide.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--ifm-color-primary)] hover:underline"
                      >
                        Markdown Guide
                      </a>
                    </td>
                    <td className="p-6 text-slate-600 dark:text-slate-400">
                      Writing .md pages
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6">
                      <a
                        href="https://mdxjs.com/docs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--ifm-color-primary)] hover:underline"
                      >
                        MDX documentation
                      </a>
                    </td>
                    <td className="p-6 text-slate-600 dark:text-slate-400">
                      Pages that use .mdx and embed React components
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6">
                      <a
                        href="https://react.dev/learn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--ifm-color-primary)] hover:underline"
                      >
                        React docs
                      </a>
                    </td>
                    <td className="p-6 text-slate-600 dark:text-slate-400">
                      Custom components and interactive examples
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6">
                      <a
                        href="https://mermaid.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--ifm-color-primary)] hover:underline"
                      >
                        Mermaid
                      </a>
                    </td>
                    <td className="p-6 text-slate-600 dark:text-slate-400">
                      Flowcharts and diagrams inside docs
                    </td>
                  </tr>
                  <tr>
                    <td className="p-6">
                      <a
                        href="https://katex.org/docs/supported.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--ifm-color-primary)] hover:underline"
                      >
                        KaTeX supported functions
                      </a>
                    </td>
                    <td className="p-6 text-slate-600 dark:text-slate-400">
                      Math notation in documentation
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How to Contribute */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <FaGithub className="text-gray-700 dark:text-gray-300" /> How to
              Contribute
            </h2>

            <div className="space-y-12">
              {/* Issue Assignment */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  1. Issue Assignment
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
                  <li>
                    Browse issues labeled <strong>gssoc26</strong> or{" "}
                    <strong>good first issue</strong>
                  </li>
                  <li>Comment on the issue to express interest</li>
                  <li>Wait for official assignment before starting work</li>
                </ul>
              </div>

              {/* Setting Up Locally */}
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  2. Setting Up Locally
                </h3>
                <div className="bg-slate-900 text-slate-200 rounded-2xl p-8 font-mono text-sm overflow-auto">
                  <pre>{`git clone https://github.com/<your-username>/algo.git
cd algo
git remote add upstream https://github.com/ajay-dhangar/algo.git
git pull upstream main
git checkout -b your-branch-name
npm install
npm start`}</pre>
                </div>
              </div>

              {/* Making Changes & Documentation */}
              <div>
                <h3 className="text-2xl font-semibold mb-6">
                  3. Making Changes &amp; Writing Documentation
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-3">
                        Front-matter (Required)
                      </h4>
                      <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-xl text-sm font-mono">
                        <pre>{`---
id: unique-id
title: Page Title
sidebar_label: Sidebar Name
sidebar_position: 10
description: Short description...
tags: [algorithms, sorting]
---`}</pre>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Code Blocks</h4>
                    <div className="bg-slate-900 text-slate-200 p-6 rounded-xl">
                      <code>
                        ```python
                        <br />
                        def binary_search(...)
                        <br />
                        ```
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Adding New Algorithm */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                  <FaCode className="text-emerald-500" /> 4. How to Add a New
                  Algorithm
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Place your algorithm under <code>docs/extra/algorithms/</code>{" "}
                  or the appropriate category. Support multiple languages in the
                  same file using fenced code blocks.
                </p>
              </div>
            </div>
          </section>

          {/* Contribution Guidelines */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <FaUsers className="text-blue-600" /> Contribution Guidelines
            </h2>
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-10">
              <ul className="grid md:grid-cols-2 gap-6 text-slate-700 dark:text-slate-300">
                <li className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  Keep PRs focused on a single issue
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  Write clear commit messages
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  Follow Docusaurus front-matter rules
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  Test locally with <code>npm run validate:docs</code>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  Respect existing code style and structure
                </li>
                <li className="flex gap-3">
                  <span className="text-green-500 mt-1">✓</span>
                  Be kind and constructive in discussions
                </li>
              </ul>
            </div>
          </section>

          {/* Final CTA */}
          <div className="text-center py-12 border-t border-slate-200 dark:border-slate-800">
            <p className="text-2xl font-semibold mb-6">Ready to contribute?</p>
            <a
              href="https://github.com/ajay-dhangar/algo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-slate-900 hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-white/90 text-white font-bold px-10 py-4 rounded-2xl transition-all text-lg"
            >
              <FaGithub className="text-2xl" />
              Go to Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionDocumentation;
