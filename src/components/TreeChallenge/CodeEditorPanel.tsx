import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Editor from "@monaco-editor/react";
import { FaPlay } from "react-icons/fa";

interface CodeEditorPanelProps {
  code: string;
  onChange: (value: string) => void;
  onRun: () => void;
  running: boolean;
}

export default function CodeEditorPanel({ code, onChange, onRun, running }: CodeEditorPanelProps) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <span className="text-xs font-mono text-slate-400">JavaScript</span>
        <button
          onClick={onRun}
          disabled={running}
          className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer"
        >
          <FaPlay /> {running ? "Running..." : "Run Code"}
        </button>
      </div>

      <div className="flex-1 relative">
        <BrowserOnly
          fallback={
            <textarea
              value={code}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-full bg-slate-950 text-slate-200 font-mono text-sm p-4 resize-none border-none outline-none"
              spellCheck={false}
            />
          }
        >
          {() => (
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(val: string | undefined) => onChange(val ?? "")}
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
          )}
        </BrowserOnly>
      </div>
    </div>
  );
}