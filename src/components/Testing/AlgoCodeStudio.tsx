import React, { useState } from "react";
import Editor, { OnChange } from "@monaco-editor/react";

function AlgoCodeStudio() {
  const [code, setCode] = useState<string | undefined>(
    `// Write your algo testing scripts here\nfunction calculateRSI(prices) {\n  return 100;\n}`
  );

  // Triggered on every stroke changes inside the editor screen
  const handleEditorChange: OnChange = (value, event) => {
    setCode(value);
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

      <div style={{ marginTop: "15px" }}>
        <button 
          onClick={() => alert(`Running Algo Code Stream Payload... Check Console!`)}
          style={{ padding: "10px 20px", background: "#0070f3", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Execute Code Script
        </button>
      </div>
    </div>
  );
}

export default AlgoCodeStudio;
