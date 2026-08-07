import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import styles from "./styles.module.css";

export interface DiffAnnotation {
  title: string;
  description: string;
  highlight?: string;
}

interface BruteForceOptimizedDiffProps {
  title?: string;
  bruteForceLabel?: string;
  optimizedLabel?: string;
  language: string;
  bruteForceCode: string;
  optimizedCode: string;
  annotations: DiffAnnotation[];
}

export default function BruteForceOptimizedDiff({
  title = "Brute-Force vs Optimized Diff",
  bruteForceLabel = "Brute-Force",
  optimizedLabel = "Optimized",
  language,
  bruteForceCode,
  optimizedCode,
  annotations,
}: BruteForceOptimizedDiffProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subTitle}>
            Compare the naive implementation to the optimized version with line-aligned diffs and complexity annotations.
          </p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.editorPanel}>
          <div className={styles.labels}>
            <span className={styles.label}>{bruteForceLabel}</span>
            <span className={styles.label}>{optimizedLabel}</span>
          </div>
          <div className={styles.editorWrapper}>
            <BrowserOnly fallback={<div className={styles.loading}>Loading diff viewer...</div>}>
              {() => {
                const { DiffEditor } = require("@monaco-editor/react");
                return (
                  <DiffEditor
                    original={bruteForceCode}
                    modified={optimizedCode}
                    language={language}
                    theme="vs-dark"
                    options={{
                      readOnly: true,
                      renderSideBySide: true,
                      minimap: { enabled: false },
                      scrollBeyondLastLine: false,
                      fontSize: 13,
                      automaticLayout: true,
                      renderIndicators: true,
                    }}
                  />
                );
              }}
            </BrowserOnly>
          </div>
        </div>

        <aside className={styles.annotationPanel}>
          <h4 className={styles.annotationHeading}>Why this improves complexity</h4>
          <div className={styles.annotationList}>
            {annotations.map((annotation, index) => (
              <div key={index} className={styles.annotationCard}>
                <div className={styles.annotationTitle}>{annotation.title}</div>
                {annotation.highlight ? (
                  <div className={styles.annotationHighlight}>{annotation.highlight}</div>
                ) : null}
                <p className={styles.annotationDescription}>{annotation.description}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
