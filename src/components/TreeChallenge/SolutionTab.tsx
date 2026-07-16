import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import BrowserOnly from "@docusaurus/BrowserOnly";

interface SolutionTabProps {
  hint: string;
  solution: string;
  userCode?: string;
}

export default function SolutionTab({ hint, solution, userCode }: SolutionTabProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-lg font-black text-slate-900 dark:text-white m-0">Solution</h2>
        <button
          onClick={() => setShowSolution((v) => !v)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-white text-xs font-mono cursor-pointer"
        >
          {showSolution ? <><FaEyeSlash /> Hide</> : <><FaEye /> Reveal</>}
        </button>
      </div>
      
      {showSolution ? (
        <div className="flex-1 flex flex-col overflow-hidden min-h-[500px]">
          <p className="text-sm text-slate-600 dark:text-slate-400 shrink-0">{hint}</p>
          <div className="flex-1 mt-2 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col">
            <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800 shrink-0">
              <span className="text-xs font-mono text-slate-400">Your Code (Left) vs Solution (Right)</span>
            </div>
            <div className="flex-1 relative">
              <BrowserOnly fallback={<div className="p-4 text-slate-400 text-xs font-mono">Loading diff editor...</div>}>
                {() => {
                  const { DiffEditor } = require("@monaco-editor/react");
                  return (
                    <DiffEditor
                      original={userCode || ""}
                      modified={solution}
                      language="javascript"
                      theme="vs-dark"
                      options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 13,
                        renderSideBySide: true,
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                      }}
                    />
                  );
                }}
              </BrowserOnly>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400 text-sm font-mono shrink-0">
          Click "Reveal" to see the solution after attempting the problem.
        </div>
      )}
    </div>
  );
}