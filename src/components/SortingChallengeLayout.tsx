import React, { useState, useCallback } from "react";
import Layout from "@theme/Layout";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Link from "@docusaurus/Link";
import {
  FaArrowLeft, FaLightbulb, FaCheck, FaTimes, FaPlay,
  FaEye, FaEyeSlash, FaClock, FaChevronRight,
} from "react-icons/fa";
import type { SortingChallenge } from "../data/sortingChallengesData";
import Editor from "@monaco-editor/react";
import useConsoleCapture from "../hooks/useConsoleCapture";

const DIFF_COLORS = {
  Easy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Hard: "bg-red-500/10 text-red-500 border-red-500/20",
};

interface Props { challenge: SortingChallenge; }

export default function SortingChallengeLayout({ challenge }: Props) {
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<{ pass: boolean; msg: string }[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [running, setRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<"problem" | "solution">("problem");
  const { runWithCapture } = useConsoleCapture();

  const runCode = useCallback(async () => {
    setRunning(true);
    setOutput([]);
    setTestResults([]);
    const logs = await runWithCapture(code);
    setOutput(logs);
    setRunning(false);
  }, [code, runWithCapture]);

  return (
    <Layout title={challenge.title} description={challenge.description}>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19]">
        {/* Top bar */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center gap-4">
          <Link
            to="/challenges"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white text-sm font-mono transition-colors no-underline"
          >
            <FaArrowLeft /> Back to Challenges
          </Link>
          <FaChevronRight className="text-slate-300 dark:text-slate-700 text-xs" />
          <span className="text-slate-700 dark:text-slate-300 text-sm font-mono font-bold truncate">
            {challenge.title}
          </span>
          <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold border ${DIFF_COLORS[challenge.difficulty]}`}>
            {challenge.difficulty}
          </span>
          <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
            <FaClock /> {challenge.timeLimit}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(100vh-112px)]">
          {/* Left Panel: Problem / Solution */}
          <div className="w-full lg:w-[45%] overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800">
              {(["problem", "solution"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                    activeTab === tab
                      ? "border-b-2 border-indigo-500 text-indigo-500"
                      : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-6">
              {activeTab === "problem" ? (
                <>
                  <h1 className="text-xl font-black text-slate-900 dark:text-white">{challenge.title}</h1>

                  <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
                    {challenge.description.split("\n").map((line, i) => (
                      <p key={i} className="my-1">{line}</p>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Examples</h3>
                    <div className="space-y-3">
                      {challenge.examples.map((ex, i) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-950 rounded-xl p-4 border border-slate-200 dark:border-slate-800 text-sm font-mono">
                          <div><span className="text-slate-400">Input:</span> <span className="text-slate-800 dark:text-slate-200">{ex.input}</span></div>
                          <div><span className="text-slate-400">Output:</span> <span className="text-emerald-600 dark:text-emerald-400">{ex.output}</span></div>
                          <div className="text-slate-500 mt-1 text-xs">{ex.explanation}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Constraints</h3>
                    <ul className="space-y-1">
                      {challenge.constraints.map((c, i) => (
                        <li key={i} className="text-sm font-mono text-slate-600 dark:text-slate-400 flex items-start gap-2">
                          <span className="text-indigo-500 mt-0.5">•</span> {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Complexity Analysis</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 border border-blue-200/50 dark:border-blue-800/30">
                        <div className="text-xs font-mono text-blue-400 mb-1">Time</div>
                        <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{challenge.timeComplexity.split("—")[0].trim()}</div>
                        <div className="text-xs text-slate-500 mt-1">{challenge.timeComplexity.split("—")[1]}</div>
                      </div>
                      <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-3 border border-purple-200/50 dark:border-purple-800/30">
                        <div className="text-xs font-mono text-purple-400 mb-1">Space</div>
                        <div className="text-sm font-bold text-purple-700 dark:text-purple-300">{challenge.spaceComplexity.split("—")[0].trim()}</div>
                        <div className="text-xs text-slate-500 mt-1">{challenge.spaceComplexity.split("—")[1]}</div>
                      </div>
                    </div>
                  </div>

                  {/* Hint */}
                  <div>
                    <button
                      onClick={() => setShowHint((v) => !v)}
                      className="flex items-center gap-2 text-indigo-500 text-sm font-mono font-bold cursor-pointer hover:text-indigo-600"
                    >
                      <FaLightbulb /> {showHint ? "Hide Hint" : "Show Hint"}
                    </button>
                    {showHint && (
                      <div className="mt-2 bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-800/30 rounded-lg p-3 text-sm text-indigo-800 dark:text-indigo-300">
                        {challenge.hint}
                      </div>
                    )}
                  </div>

                  {/* Test Cases */}
                  <div>
                    <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Test Cases</h3>
                    <div className="space-y-2">
                      {challenge.testCases.map((tc, i) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                          <div className="text-slate-500 mb-1">#{i + 1} {tc.description}</div>
                          <div><span className="text-slate-400">Input:</span> <span className="text-slate-700 dark:text-slate-300">{tc.input}</span></div>
                          <div><span className="text-slate-400">Expected:</span> <span className="text-emerald-600 dark:text-emerald-400">{tc.expected}</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-slate-900 dark:text-white">Solution</h2>
                    <button
                      onClick={() => setShowSolution((v) => !v)}
                      className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-white text-xs font-mono cursor-pointer"
                    >
                      {showSolution ? <><FaEyeSlash /> Hide</> : <><FaEye /> Reveal</>}
                    </button>
                  </div>
                  {showSolution ? (
                    <>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{challenge.hint}</p>
                      <pre className="bg-slate-950 rounded-xl p-4 text-emerald-400 text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap">
                        {challenge.solution}
                      </pre>
                    </>
                  ) : (
                    <div className="text-center py-16 text-slate-400 text-sm font-mono">
                      Click "Reveal" to see the solution after attempting the problem.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Editor + Output */}
          <div className="w-full lg:w-[55%] flex flex-col">
            {/* Editor */}
            <div className="flex-1 overflow-hidden">
              <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                <span className="text-xs font-mono text-slate-400">JavaScript</span>
                <button
                  onClick={runCode}
                  disabled={running}
                  className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  <FaPlay /> {running ? "Running..." : "Run Code"}
                </button>
              </div>
              <BrowserOnly
                fallback={
                  <textarea
                    aria-label="Code Editor Fallback"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-full bg-slate-950 text-slate-200 font-mono text-sm p-4 resize-none border-none outline-none"
                    spellCheck={false}
                  />
                }
              >
                {() => { return (
                    <Editor
                      height="100%"
                      defaultLanguage="javascript"
                      value={code}
                      onChange={(val: string | undefined) => setCode(val ?? "")}
                      theme="vs-dark"
                      options={{
                        fontSize: 13,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        wordWrap: "on",
                        lineNumbers: "on",
                        tabSize: 2,
                        automaticLayout: true,
                      }}
                    />
                  );
                }}
              </BrowserOnly>
            </div>

            {/* Output Panel */}
            <div className="h-48 bg-slate-950 border-t border-slate-800 flex flex-col">
              <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase">Output</span>
                {output.length > 0 && (
                  <button
                    onClick={() => setOutput([])}
                    className="text-xs text-slate-600 hover:text-slate-400 ml-auto cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                {output.length === 0 ? (
                  <span className="text-slate-600 text-xs">Click "Run Code" to see output here...</span>
                ) : (
                  output.map((line, i) => (
                    <div
                      key={i}
                      className={`leading-relaxed ${
                        line.startsWith("❌") ? "text-red-400" : "text-emerald-400"
                      }`}
                    >
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
