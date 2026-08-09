import React from "react";
import type { JudgeResult } from "../../utils/challengeJudge";

interface OutputPanelProps {
  logs: string[];
  judgeResults?: JudgeResult[];
  onClear: () => void;
}

export default function OutputPanel({ logs, judgeResults = [], onClear }: OutputPanelProps) {
  return (
    <div className="h-48 bg-slate-950 border-t border-slate-800 flex flex-col">
      <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase">Output</span>
        {(judgeResults.length > 0 || logs.length > 0) && (
          <button
            onClick={onClear}
            className="text-xs text-slate-600 hover:text-slate-400 ml-auto cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {judgeResults.length > 0 ? (
          <div className="space-y-2">
            {judgeResults.map((result, i) => (
              <div
                key={i}
                className={`rounded-lg border p-2 text-xs ${result.pass ? "border-emerald-700/40 bg-emerald-500/10 text-emerald-300" : "border-red-700/40 bg-red-500/10 text-red-300"}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span>#{i + 1} {result.description}</span>
                  <span>{result.pass ? "PASS" : "FAIL"}</span>
                </div>
                <div className="mt-1 opacity-80">Output: {result.output || "—"}</div>
                <div className="opacity-80">Expected: {result.expected}</div>
                <div className="opacity-70">Runtime: {result.runtimeMs}ms</div>
              </div>
            ))}
          </div>
        ) : logs.length === 0 ? (
          <span className="text-slate-600 text-xs">Click "Run Code" to see output here...</span>
        ) : (
          logs.map((line, i) => (
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
  );
}