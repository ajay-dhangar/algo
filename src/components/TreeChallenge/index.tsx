import React, { useState, useCallback } from "react";
import type { TreeChallenge } from "../../data/treeChallengesData";
import useConsoleCapture from "../../hooks/useConsoleCapture";

// Extracted Subcomponents
import ChallengeHeader from "./ChallengeHeader";
import ProblemTab from "./ProblemTab";
import SolutionTab from "./SolutionTab";
import CodeEditorPanel from "./CodeEditorPanel";
import OutputPanel from "./OutputPanel";
import PseudocodeTab from "../PseudocodeTab";

interface Props {
  challenge: TreeChallenge;
}

export default function TreeChallengeLayout({ challenge }: Props) {
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"problem" | "solution" | "pseudocode">("problem");
  const { runWithCapture } = useConsoleCapture();

  const handleRunCode = useCallback(async () => {
    setRunning(true);
    setOutput([]);
    const logs = await runWithCapture(code);
    setOutput(logs);
    setRunning(false);
  }, [code, runWithCapture]);

  const handleClearOutput = useCallback(() => {
    setOutput([]);
  }, []);

  return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex flex-col">
        {/* Navigation Info Bar */}
        <ChallengeHeader 
          id={challenge.id}
          title={challenge.title} 
          difficulty={challenge.difficulty} 
          timeLimit={challenge.timeLimit} 
        />

        {/* Main Split Layout Workspace */}
        <div className="flex flex-col lg:flex-row flex-1 h-[calc(100vh-112px)] overflow-hidden">
          
          {/* Left Side: Metadata Markdown & Answers Panels */}
          <div className="w-full lg:w-[45%] overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col">
            <div className="flex border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
              {(["problem", "solution", "pseudocode"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "border-b-2 border-red-500 text-red-500"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6 flex-1">
              {activeTab === "problem" ? (
                <ProblemTab challenge={challenge} />
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
              onChange={setCode} 
              onRun={handleRunCode} 
              running={running} 
            />
            <OutputPanel 
              logs={output} 
              onClear={handleClearOutput} 
            />
          </div>

        </div>
      </div>
  );
}