import React, { useState } from "react";
import Editor, { OnChange } from "@monaco-editor/react";
import useConsoleCapture from "../../hooks/useConsoleCapture";

function AlgoCodeStudio() {
  const [code, setCode] = useState<string | undefined>(
    `// Write your algo testing scripts here\nfunction calculateRSI(prices) {\n  return 100;\n}\n\nconsole.log("Calculated RSI:", calculateRSI([]));`
  );
  const [output, setOutput] = useState<string[]>([]);
  const { runWithCapture } = useConsoleCapture();

  // Triggered on every stroke changes inside the editor screen
  const handleEditorChange: OnChange = (value, event) => {
    setCode(value);
  };

  const handleExecute = () => {
    if (code) {
      const logs = runWithCapture(code);
      setOutput(logs);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontFamily: "sans-serif" }}>Algo Code Studio Sandbox</h2>
      
      <div style={{ border: "1px solid #ccc", borderRadius: "6px", overflow: "hidden" }}>
        <Editor
          height="400px"
          language="javascript" // Supports python, cpp, typescript etc.
          theme="vs-dark"       // Options: "vs-dark" | "light"
          value={code}
          onChange={handleEditorChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false }, // Disables right-side layout map viewport
            wordWrap: "on",
            lineNumbers: "on",
            automaticLayout: true,       // Autosizes editor context box if window sizes scale
          }}
        />
      </div>

      <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexDirection: "column" }}>
        <div>
          <button 
            onClick={handleExecute}
            style={{ padding: "10px 20px", background: "#0070f3", color: "#fff", border: "none", cursor: "pointer", borderRadius: "4px" }}
          >
            Execute Code Script
          </button>
        </div>

        {output.length > 0 && (
          <div style={{ background: "#1e1e1e", color: "#fff", padding: "15px", borderRadius: "6px", fontFamily: "monospace", minHeight: "100px", marginTop: "10px" }}>
            <h4 style={{ margin: "0 0 10px 0", color: "#888" }}>Console Output</h4>
            {output.map((log, index) => (
              <div key={index} style={{ whiteSpace: "pre-wrap", marginBottom: "4px", color: log.startsWith("❌") ? "#ff6b6b" : "#fff" }}>
                {log}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AlgoCodeStudio;
