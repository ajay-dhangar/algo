import React from "react";
import GiscusComponent from "@site/src/components/GiscusComponent";

interface DocDiscussionProps {
  /**
   * Page title, used only for the section heading copy.
   */
  title?: string;
}

/**
 * DocDiscussion
 *
 * Renders a "Discuss this page" section at the bottom of a doc page,
 * backed by Giscus (GitHub Discussions). Each doc page gets its own
 * thread because Giscus is configured with `mapping="pathname"` in
 * GiscusComponent, so a question asked on one page doesn't mix with
 * another page's thread.
 *
 * Maintainers get notified the normal GitHub way (Discussions
 * notifications) whenever someone comments, with no extra backend.
 *
 * Opt-out: set `hide_discussion: true` in a doc's frontmatter to skip
 * rendering this section on that page (e.g. index/overview pages).
 */
export default function DocDiscussion({ title }: DocDiscussionProps): JSX.Element {
  return (
    <section className="docusaurus-mt-lg mt-10 border-t border-solid border-[var(--ifm-toc-border-color)] pt-8">
      <h2 className="mb-1 text-xl font-semibold">💬 Discuss this page</h2>
      <p className="mb-4 text-sm opacity-80">
        Have a question or spot something confusing{title ? ` in "${title}"` : ""}? Ask below —
        it's backed by GitHub Discussions, so maintainers get notified like any other GitHub
        activity.
      </p>
      <GiscusComponent />
    </section>
  );
}
