import React, { useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import type { TreeChallenge } from "../../data/treeChallengesData";
import ComplexityDeepDive from "../ComplexityDeepDive";

interface ProblemTabProps {
  challenge: TreeChallenge;
}

export default function ProblemTab({ challenge }: ProblemTabProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-black text-slate-900 dark:text-white">{challenge.title}</h1>

      {/* Description lines breakdown */}
      <div className="prose prose-sm dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed">
        {challenge.description.split("\n").map((line, i) => (
          <p key={i} className="my-1">{line}</p>
        ))}
      </div>

      {/* Examples Block */}
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

      {/* Constraints */}
      <div>
        <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Constraints</h3>
        <ul className="space-y-1">
          {challenge.constraints.map((c, i) => (
            <li key={i} className="text-sm font-mono text-slate-600 dark:text-slate-400 flex items-start gap-2">
              <span className="text-red-500 mt-0.5">•</span> {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Complexity Badges */}
      <div>
        <h3 className="text-sm font-bold font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Complexity Analysis</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-3 border border-blue-200/50 dark:border-blue-800/30">
            <div className="text-xs font-mono text-blue-400 mb-1">Time</div>
            <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{challenge.timeComplexity.split("—")[0].trim()}</div>
            <div className="text-xs text-slate-500 mt-1">{challenge.timeComplexity.split("—")[1] ?? ""}</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-3 border border-purple-200/50 dark:border-purple-800/30">
            <div className="text-xs font-mono text-purple-400 mb-1">Space</div>
            <div className="text-sm font-bold text-purple-700 dark:text-purple-300">{challenge.spaceComplexity.split("—")[0].trim()}</div>
            <div className="text-xs text-slate-500 mt-1">{challenge.spaceComplexity.split("—")[1] ?? ""}</div>
          </div>
        </div>
      </div>

      <ComplexityDeepDive
        timeComplexity={challenge.timeComplexity}
        spaceComplexity={challenge.spaceComplexity}
        challengeTitle={challenge.title}
      />

      {/* Hint Toggler */}
      <div>
        <button
          onClick={() => setShowHint((v) => !v)}
          className="flex items-center gap-2 text-amber-500 text-sm font-mono font-bold cursor-pointer hover:text-amber-600"
        >
          <FaLightbulb /> {showHint ? "Hide Hint" : "Show Hint"}
        </button>
        {showHint && (
          <div className="mt-2 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300">
            {challenge.hint}
          </div>
        )}
      </div>

      {/* Reference Test Cases */}
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
    </div>
  );
}