import React, { useState, useCallback } from "react";
import type { TreeChallenge } from "../../data/treeChallengesData";
import useConsoleCapture from "../../hooks/useConsoleCapture";
import Link from "@docusaurus/Link";
import BrowserOnly from "@docusaurus/BrowserOnly";

// Extracted Subcomponents
import ChallengeHeader from "./ChallengeHeader";
import ProblemTab from "./ProblemTab";
import SolutionTab from "./SolutionTab";
import CodeEditorPanel from "./CodeEditorPanel";
import OutputPanel from "./OutputPanel";
import PseudocodeTab from "../PseudocodeTab";

import useChallengeJudge from "../../hooks/useChallengeJudge";
import type { JudgeResult } from "../../utils/challengeJudge";

interface Props {
  challenge: TreeChallenge;
}

export default function TreeChallengeLayout({ challenge }: Props) {
  const [activeLanguage, setActiveLanguage] = useState<string>("javascript");
  const [codeMap, setCodeMap] = useState<Record<string, string>>({ javascript: challenge.starterCode });
  const code = codeMap[activeLanguage] ?? challenge.starterCodes?.[activeLanguage] ?? "";
  
  const handleCodeChange = (val: string) => {
    setCodeMap((prev) => ({ ...prev, [activeLanguage]: val }));
  };
  const [output, setOutput] = useState<string[]>([]);
  const [judgeResults, setJudgeResults] = useState<JudgeResult[]>([]);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"problem" | "visualize" | "solution" | "pseudocode">("problem");
  const { runJudge } = useChallengeJudge(challenge);

  const handleRunCode = useCallback(async () => {
    setRunning(true);
    setOutput([]);
    setJudgeResults([]);
    try {
      const results = await runJudge(code, activeLanguage);
      setJudgeResults(results);
      const passed = results.filter((result) => result.pass).length;
      setOutput([`${passed}/${results.length} hidden cases passed`, ...results.map((result) => `${result.pass ? "✅" : "❌"} ${result.description} (${result.runtimeMs}ms)`)]);
    } catch (error) {
      setOutput([`❌ ${error instanceof Error ? error.message : String(error)}`]);
    } finally {
      setRunning(false);
    }
  }, [activeLanguage, code, runJudge]);

  const handleClearOutput = useCallback(() => {
    setOutput([]);
    setJudgeResults([]);
  }, []);

  return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex flex-col">
        {/* Navigation Info Bar */}
        <ChallengeHeader 
          id={challenge.id}
          title={challenge.title} 
          difficulty={challenge.difficulty} 
          timeLimit={challenge.timeLimit} 
          judgeResults={judgeResults}
        />

        {/* Main Split Layout Workspace */}
        <div className="flex flex-col lg:flex-row flex-1 h-[calc(100vh-112px)] overflow-hidden">
          
          {/* Left Side: Metadata Markdown & Answers Panels */}
          <div className="w-full lg:w-[45%] overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
            <div className="flex border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10 overflow-x-auto">
              {([
                { key: "problem",    label: "Problem" },
                { key: "visualize",  label: "Visualize ✨" },
                { key: "solution",   label: "Solution" },
                { key: "pseudocode", label: "Pseudocode" },
              ] as const).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`shrink-0 px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === key
                      ? "border-b-2 border-emerald-500 text-emerald-500"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              {activeTab === "problem" ? (
                <ProblemTab challenge={challenge} />
              ) : activeTab === "visualize" ? (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl">
                    <div>
                      <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300 m-0">Interactive Tree Sandbox</h3>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 m-0 mt-1">
                        Experiment with BST & AVL tree insertions, deletions, and rotation animations.
                      </p>
                    </div>
                    <Link
                      to="/tree-sandbox"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-mono font-bold transition-colors no-underline shrink-0 shadow-sm"
                    >
                      Try in Tree Sandbox →
                    </Link>
                  </div>

                  <BrowserOnly fallback={<div className="p-4 text-xs font-mono text-slate-400">Loading Tree Sandbox...</div>}>
                    {() => {
                      const TreeSandboxComponent = require("../Visualizing/TreeSandbox").default;
                      return <TreeSandboxComponent />;
                    }}
                  </BrowserOnly>
                </div>
              ) : activeTab === "solution" ? (
                <SolutionTab hint={challenge.hint} solution={challenge.solution} userCode={code} />
              ) : (
                <PseudocodeTab solution={challenge.solution} customPseudocode={challenge.pseudocode} />
              )}
            </div>
          </div>

          {/* Right Side: Execution Environment and logs panel */}
          <div className="w-full lg:w-[55%] flex flex-col overflow-hidden">
            <CodeEditorPanel 
              code={code}
              activeLanguage={activeLanguage}
              onLanguageChange={setActiveLanguage}
              onChange={handleCodeChange} 
              onRun={handleRunCode} 
              running={running} 
            />
            <OutputPanel 
              logs={output} 
              judgeResults={judgeResults}
              onClear={handleClearOutput} 
            />
          </div>

        </div>
      </div>
  );
}