import React, { useMemo, useState } from "react";
import CodeBlock from "@theme/CodeBlock";
import { FaExchangeAlt } from "react-icons/fa";
import { CODE_SNIPPET_REGISTRY, ComparatorEntry, LanguageSnippet } from "../../data/codeSnippets";
import styles from "./styles.module.css";

interface LanguageComparatorProps {
  /**
   * Key into CODE_SNIPPET_REGISTRY (src/data/codeSnippets/index.ts).
   * Use this in docs: <LanguageComparator algorithm="sqrt-decomposition" />
   */
  algorithm?: string;
  /**
   * Or pass a snippet set directly, e.g. from an MDX file that wants
   * one-off snippets without touching the shared registry.
   */
  snippets?: Record<string, LanguageSnippet>;
  title?: string;
  /** Which two languages are pre-selected on first render (language keys) */
  defaultLeft?: string;
  defaultRight?: string;
}

/**
 * Renders two dropdowns for picking a language on each side, then shows
 * the matching code for the same algorithm side-by-side (stacked on
 * mobile). Distinct from Docusaurus <Tabs>, which only shows one
 * language at a time — this lets a learner map syntax between two
 * languages directly, e.g. "what does this Python line look like in Rust?"
 */
const LanguageComparator: React.FC<LanguageComparatorProps> = ({
  algorithm,
  snippets,
  title,
  defaultLeft,
  defaultRight,
}) => {
  const entry: ComparatorEntry | undefined = algorithm
    ? CODE_SNIPPET_REGISTRY[algorithm]
    : snippets
    ? { title: title ?? "Compare Languages", languages: snippets }
    : undefined;

  const languageKeys = useMemo(() => (entry ? Object.keys(entry.languages) : []), [entry]);

  const [leftLang, setLeftLang] = useState(
    defaultLeft && languageKeys.includes(defaultLeft) ? defaultLeft : languageKeys[0]
  );
  const [rightLang, setRightLang] = useState(
    defaultRight && languageKeys.includes(defaultRight)
      ? defaultRight
      : languageKeys[1] ?? languageKeys[0]
  );

  if (!entry || languageKeys.length === 0) {
    if (algorithm) {
      // Fail loudly in a way that's easy to spot in a PR review, rather than
      // silently rendering nothing if someone typos an algorithm id.
      return (
        <div className={styles.container} style={{ padding: 16 }}>
          <strong>LanguageComparator:</strong> no snippets found for algorithm id{" "}
          <code>{algorithm}</code>. Check <code>src/data/codeSnippets/index.ts</code>.
        </div>
      );
    }
    return null;
  }

  const handleSwap = () => {
    setLeftLang(rightLang);
    setRightLang(leftLang);
  };

  const left = entry.languages[leftLang];
  const right = entry.languages[rightLang];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title ?? entry.title}</h4>
        <div className={styles.controls}>
          <select
            className={styles.select}
            value={leftLang}
            onChange={(e) => setLeftLang(e.target.value)}
            aria-label="Left language"
          >
            {languageKeys.map((key) => (
              <option key={key} value={key}>
                {entry.languages[key].label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={styles.swapButton}
            onClick={handleSwap}
            aria-label="Swap languages"
            title="Swap sides"
          >
            <FaExchangeAlt />
          </button>

          <select
            className={styles.select}
            value={rightLang}
            onChange={(e) => setRightLang(e.target.value)}
            aria-label="Right language"
          >
            {languageKeys.map((key) => (
              <option key={key} value={key}>
                {entry.languages[key].label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.panes}>
        <div className={styles.pane}>
          <div className={styles.paneLabel}>{left.label}</div>
          <CodeBlock language={left.language}>{left.code}</CodeBlock>
        </div>
        <div className={styles.pane}>
          <div className={styles.paneLabel}>{right.label}</div>
          <CodeBlock language={right.language}>{right.code}</CodeBlock>
        </div>
      </div>
    </div>
  );
};

export default LanguageComparator;
