import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";

const DocumentationPage: React.FC = () => {
  return (
    <Layout
      title="Contributing to Algo"
      description="Complete Contribution Guide for Algo - Data Structures and Algorithms"
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <div className="text--center margin-bottom--xl">
              <h1>Contributing to Algo</h1>
              <p className="hero__subtitle">
                Thank you for your interest in contributing to{" "}
                <strong>Algo</strong>! We welcome contributions from everyone —
                beginners and experienced developers alike.
              </p>
            </div>

            {/* Recommended Reading */}
            <section className="margin-bottom--xl">
              <h2>Recommended Reading</h2>
              <table className="table">
                <thead>
                  <tr>
                    <th>Resource</th>
                    <th>When it is useful</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <Link to="https://docusaurus.io/docs/docs-introduction">
                        <strong>Docusaurus docs</strong>
                      </Link>
                    </td>
                    <td>
                      Site structure, docs folders, sidebars, front-matter,
                      local preview.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="https://www.markdownguide.org/">
                        <strong>Markdown Guide</strong>
                      </Link>
                    </td>
                    <td>Writing .md pages.</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="https://mdxjs.com/docs/">
                        <strong>MDX documentation</strong>
                      </Link>
                    </td>
                    <td>Embedding React components.</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="https://react.dev/learn">
                        <strong>React docs</strong>
                      </Link>
                    </td>
                    <td>Custom components.</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="https://mermaid.js.org/">
                        <strong>Mermaid</strong>
                      </Link>
                    </td>
                    <td>Flowcharts and diagrams.</td>
                  </tr>
                  <tr>
                    <td>
                      <Link to="https://katex.org/docs/supported.html">
                        <strong>KaTeX</strong>
                      </Link>
                    </td>
                    <td>Math notation in docs.</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* How to Contribute */}
            <section className="margin-bottom--xl">
              <h2>How to Contribute</h2>

              <h3>1. Issue Assignment</h3>
              <ul>
                <li>
                  Browse issues labeled <code>gssoc26</code> or{" "}
                  <code>good first issue</code>.
                </li>
                <li>Comment on the issue to express interest.</li>
                <li>Wait for official assignment before starting work.</li>
              </ul>

              <h3>2. Setting Up Locally</h3>
              <ol>
                <li>Fork the repository.</li>
                <li>
                  Clone your fork:{" "}
                  <CodeBlock language="bash">git clone https://github.com/&lt;your-username&gt;/algo.git</CodeBlock>
                </li>
                <li>
                  <CodeBlock language="bash">cd algo</CodeBlock>``
                </li>
                <li>
                  Add upstream:{" "}
                  <CodeBlock language="bash">
                    git remote add upstream
                    https://github.com/ajay-dhangar/algo.git
                  </CodeBlock>
                </li>
                <li>
                  Keep updated:{" "}
                  <CodeBlock language="bash">git pull upstream main</CodeBlock>
                </li>
                <li>
                  Create branch:{" "}
                  <CodeBlock language="bash">
                    git checkout -b your-branch-name
                  </CodeBlock>
                </li>
                <li>
                  <CodeBlock language="bash">npm install</CodeBlock>
                </li>
                <li>
                  <CodeBlock language="bash">npm start</CodeBlock>
                </li>
              </ol>

              <h3>3. Making Changes</h3>
              <p>
                Create a new branch and follow Docusaurus structure.
                Front-matter is required for all documentation files.
              </p>

              <h3>4. Writing Documentation for Algo</h3>
              <h4>Front-matter</h4>
              <CodeBlock language="markdown">
                {`---
id: unique-kebab-case-id
title: Page Title
sidebar_label: Sidebar Label
sidebar_position: 10
description: Short description for SEO and previews.
tags: [algorithms, sorting, python]
---`}
              </CodeBlock>

              <h4>Code Blocks</h4>
              <CodeBlock language="markdown">
                {`\`\`\`python
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    # ... implementation
\`\`\``}
              </CodeBlock>

              <h4>Math & Diagrams</h4>
              <p>
                Use <code>$$ E = mc^2 $$</code> for KaTeX and{" "}
                <code>```mermaid</code> blocks for diagrams.
              </p>

              <h4>React Components in MDX</h4>
              <p>
                You can import and use React components inside <code>.mdx</code>{" "}
                files.
              </p>
            </section>

            {/* Adding New Algorithm - More Complete */}
            <section className="margin-bottom--xl">
              <h2>How to Add a New Algorithm in Multiple Languages</h2>
              <p>
                Algorithms are documented under <code>docs/extra/</code>{" "}
                (recommended) with implementations for all languages in a single
                file.
              </p>

              <h4>Folder Structure</h4>
              <CodeBlock language="text">
                docs/extra/algorithms/sorting-algorithms/your-algorithm.md
              </CodeBlock>

              <h4>Key Requirements</h4>
              <ul>
                <li>
                  Proper front-matter with unique <code>id</code>
                </li>
                <li>
                  Separate sections for each language (Python, C++, Java, etc.)
                </li>
                <li>Use correct code fence languages</li>
                <li>
                  Run <code>npm run validate:docs</code> before committing
                </li>
              </ul>
            </section>

            <section className="margin-bottom--xl">
              <h2>Commit, Push & Pull Request</h2>
              <ol>
                <li>
                  Commit with clear message:{" "}
                  <code>git commit -m "Added XYZ algorithm"</code>
                </li>
                <li>Push to your fork</li>
                <li>
                  Open a Pull Request with detailed description and reference to
                  the issue
                </li>
              </ol>
            </section>

            <section className="margin-bottom--xl">
              <h2>Code Style and Quality</h2>
              <ul>
                <li>Keep code clean and readable</li>
                <li>Follow standard coding conventions for each language</li>
                <li>Add comments for complex logic</li>
                <li>Keep PRs focused on a single issue</li>
                <li>Respect repository structure and best practices</li>
              </ul>
            </section>

            <section className="margin-bottom--xl">
              <h2>Contribution Guidelines</h2>
              <p>
                Make sure your contributions align with the project’s goals. We
                value quality, clarity, and collaboration.
              </p>
            </section>

            <div className="text--center margin-top--xl">
              <Link className="button button--primary button--lg" to="/docs">
                Browse Full Documentation →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentationPage;
