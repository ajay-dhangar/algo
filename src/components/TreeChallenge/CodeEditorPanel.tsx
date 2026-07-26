import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Editor from "@monaco-editor/react";
import { FaPlay } from "react-icons/fa";

interface CodeEditorPanelProps {
  code: string;
  activeLanguage: string;
  onLanguageChange: (lang: string) => void;
  onChange: (value: string) => void;
  onRun: () => void;
  running: boolean;
}

export default function CodeEditorPanel({ code, activeLanguage, onLanguageChange, onChange, onRun, running }: CodeEditorPanelProps) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <select
          value={activeLanguage}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="bg-slate-800 text-slate-300 text-xs font-mono rounded border border-slate-700 px-2 py-1 outline-none focus:border-slate-500 cursor-pointer"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="cpp">C++</option>
        </select>
        <div className="flex items-center gap-2">
          {activeLanguage !== "javascript" && (
            <span className="text-slate-500 text-[10px] font-mono mr-2">
              (Run disabled for {activeLanguage})
            </span>
          )}
          <button
            onClick={onRun}
            disabled={running || activeLanguage !== "javascript"}
            className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer"
          >
            <FaPlay /> {running ? "Running..." : "Run Code"}
          </button>
        </div>
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
              language={activeLanguage}
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