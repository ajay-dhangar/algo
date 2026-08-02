import React, { useEffect, useMemo, useRef, useState } from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { FaProjectDiagram, FaArrowRight, FaBook } from "react-icons/fa";
import { QUIZZES_CONFIG, type QuizCardConfig } from "../../data/quizzesConfig";

const CATEGORY_ORDER = ["Linear", "Non-Linear", "Balanced Tree", "Disk Storage"] as const;
const CATEGORY_STYLES: Record<string, string> = {
  Linear: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  "Non-Linear": "bg-purple-500/10 text-purple-600 border-purple-500/20",
  "Balanced Tree": "bg-amber-500/10 text-amber-800 border-amber-500/20",
  "Disk Storage": "bg-rose-500/10 text-rose-700 border-rose-500/20",
};

function buildMermaidDiagram(quizzes: QuizCardConfig[]) {
  const nodes = quizzes.map((quiz) => `${quiz.id}["${quiz.title.replace(/^Quiz on /, "")} "]`);
  const edges = quizzes.flatMap((quiz) =>
    (quiz.prerequisites ?? []).map((prereqId) => `${prereqId}-->${quiz.id}`)
  );

  const categoryBlocks = CATEGORY_ORDER.map((category) => {
    const members = quizzes.filter((quiz) => quiz.category === category);
    if (members.length === 0) return null;
    const nodeLines = members.map((quiz) => `${quiz.id}["${quiz.title.replace(/^Quiz on /, "")} "]`);
    return [
      `  subgraph ${category}`,
      ...nodeLines.map((line) => `    ${line}`),
      "  end",
    ].join("\n");
  }).filter(Boolean);

  const classDefs = [
    "  classDef linear fill:#eff6ff,stroke:#3b82f6,stroke-width:1px,color:#1d4ed8;",
    "  classDef nonlinear fill:#f3e8ff,stroke:#8b5cf6,stroke-width:1px,color:#5b21b6;",
    "  classDef balanced fill:#fef3c7,stroke:#d97706,stroke-width:1px,color:#92400e;",
    "  classDef disk fill:#fed7aa,stroke:#ea580c,stroke-width:1px,color:#9a3412;",
  ];

  const categoryAssignments = quizzes.map((quiz) => {
    const className =
      quiz.category === "Linear" ? "linear"
      : quiz.category === "Non-Linear" ? "nonlinear"
      : quiz.category === "Balanced Tree" ? "balanced"
      : "disk";
    return `  class ${quiz.id} ${className};`;
  });

  const clickDefs = quizzes.map(
    (quiz) => `  click ${quiz.id} "${quiz.path}" "Open ${quiz.title}"`
  );

  return [
    "%%{init: {\"theme\": \"base\", \"themeVariables\": { \"primaryColor\": \"#2563eb\", \"edgeLabelBackground\": \"#ffffff\" }, \"securityLevel\": \"loose\"}}%%",
    "graph LR",
    "  linkStyle default interpolate basis",
    ...categoryBlocks,
    ...edges,
    ...categoryAssignments,
    ...classDefs,
    ...clickDefs,
  ].join("\n");
}

const DependencyGraphPage: React.FC = () => {
  const graphDefinition = useMemo(() => buildMermaidDiagram(QUIZZES_CONFIG), []);
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let isMounted = true;
    import("mermaid")
      .then((module) => {
        const mermaid = module.default ?? module;
        mermaid.initialize({ startOnLoad: false, theme: "base", securityLevel: "loose" });
        return mermaid.render("quizDependencyDiagram", graphDefinition);
      })
      .then((result) => {
        if (!isMounted || !containerRef.current) return;
        const svg = typeof result === "string" ? result : result.svg ?? "";
        containerRef.current.textContent = svg;
      })
      .catch((error) => {
        console.error("Failed to render dependency graph", error);
        if (isMounted) {
          setRenderError("Failed to generate the graph visualization. Refresh the page or try again later.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [graphDefinition]);

  return (
    <Layout
      title="Quiz Topic Dependency Graph"
      description="Auto-generated graph of quiz topic prerequisites and concept dependencies."
    >
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b1119] text-slate-900 dark:text-slate-100 font-sans pb-16">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-8 rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-slate-950 shadow-lg overflow-hidden">
            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-sm uppercase font-semibold tracking-[0.22em] text-slate-500 dark:text-slate-400">
                    <FaProjectDiagram className="text-base text-blue-600 dark:text-blue-400" />
                    Topic Dependency Map
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                    Auto-generated quiz dependency graph
                  </h1>
                  <p className="max-w-3xl text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-7">
                    Visualize the 19 quiz topics as nodes and see how each quiz depends on the concepts that should be learned first.
                    This diagram is generated directly from the quiz configuration and updates automatically when prerequisites change.
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-3">
                  <Link
                    to="/quizzes"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                  >
                    <FaArrowRight className="text-sm" /> Back to Quizzes
                  </Link>
                  <a
                    href="#graph"
                    className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 text-sm font-semibold transition"
                  >
                    <FaBook className="text-sm" /> Jump to graph
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-slate-950 shadow-sm p-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] font-bold text-slate-400 dark:text-slate-500">
                      Prerequisite Graph
                    </p>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                      Concept flow across quiz topics
                    </h2>
                  </div>
                </div>

                <div id="graph" ref={containerRef} className="min-h-[560px] rounded-3xl border border-slate-200/80 dark:border-zinc-800/80 bg-slate-50 dark:bg-slate-950 p-4 overflow-auto" />
                {renderError && (
                  <div className="mt-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-700 p-4 text-sm text-rose-700 dark:text-rose-200">
                    {renderError}
                  </div>
                )}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-slate-950 shadow-sm p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 mb-4">
                  Legend & categories
                </h3>
                <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
                  {CATEGORY_ORDER.map((category) => (
                    <div key={category} className="flex items-center gap-3">
                      <span className={`h-3.5 w-3.5 rounded-full border ${CATEGORY_STYLES[category]}`} />
                      <span>{category}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-slate-950 shadow-sm p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 mb-4">
                  Why this graph?
                </h3>
                <ul className="space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  <li>It is generated automatically from <code className="rounded bg-slate-100 dark:bg-zinc-900 px-1.5 py-0.5">src/data/quizzesConfig.ts</code>.</li>
                  <li>Each edge shows a prerequisite relationship between quiz topics.</li>
                  <li>Nodes are grouped by category, not by a static checklist order.</li>
                  <li>Click a node to open the matching quiz.</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DependencyGraphPage;
