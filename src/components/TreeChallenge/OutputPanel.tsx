import React from "react";

interface OutputPanelProps {
  logs: string[];
  onClear: () => void;
}

export default function OutputPanel({ logs, onClear }: OutputPanelProps) {
  return (
    <div className="h-48 bg-slate-950 border-t border-slate-800 flex flex-col">
      <div className="flex items-center gap-3 px-4 py-2 border-b border-slate-800">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase">Output</span>
        {logs.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-slate-600 hover:text-slate-400 ml-auto cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {logs.length === 0 ? (
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