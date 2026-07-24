import React from 'react';

interface EditorProps {
  value?: string;
  onChange?: (value: string) => void;
  [key: string]: any;
}

export default function Editor({ value, onChange }: EditorProps) {
  return (
    <textarea
      aria-label="Monaco Code Editor"
      data-testid="monaco-editor"
      value={value ?? ''}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}

export function DiffEditor({ original, modified }: { original?: string; modified?: string }) {
  return (
    <div data-testid="monaco-diff-editor">
      <pre data-testid="diff-original">{original}</pre>
      <pre data-testid="diff-modified">{modified}</pre>
    </div>
  );
}
