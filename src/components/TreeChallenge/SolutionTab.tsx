import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SolutionTabProps {
  hint: string;
  solution: string;
}

export default function SolutionTab({ hint, solution }: SolutionTabProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
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
          <p className="text-sm text-slate-600 dark:text-slate-400">{hint}</p>
          <pre className="bg-slate-950 rounded-xl p-4 text-emerald-400 text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap">
            {solution}
          </pre>
        </>
      ) : (
        <div className="text-center py-16 text-slate-400 text-sm font-mono">
          Click "Reveal" to see the solution after attempting the problem.
        </div>
      )}
    </div>
  );
}