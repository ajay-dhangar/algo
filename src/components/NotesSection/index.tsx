import React, { useState, useEffect, useRef } from 'react';

interface Props {
  topicId: string;
}

// Simple markdown to HTML renderer
function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.+)$/gm, '<h3 style="margin:10px 0 4px;font-size:15px;color:#1565c0">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="margin:12px 0 6px;font-size:17px;color:#1565c0">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="margin:14px 0 8px;font-size:20px;color:#1565c0">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:#f0f0f0;padding:1px 5px;border-radius:3px;font-family:monospace;font-size:13px">$1</code>')
    .replace(/^- (.+)$/gm, '<li style="margin:3px 0;padding-left:4px">$1</li>')
    .replace(/(<li.*<\/li>)/gs, '<ul style="margin:6px 0;padding-left:20px">$1</ul>')
    .replace(/\n/g, '<br/>');
}

export default function NotesSection({ topicId }: Props) {
  const [notes, setNotes] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('algo_notes');
      if (saved) {
        const data = JSON.parse(saved);
        if (data[topicId]) setNotes(data[topicId]);
      }
    } catch (e) {
      console.error('Error loading notes:', e);
    }
  }, [topicId]);

  const handleChange = (value: string) => {
    setNotes(value);
    setSaveStatus('saving');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      try {
        const saved = localStorage.getItem('algo_notes');
        const data = saved ? JSON.parse(saved) : {};
        data[topicId] = value;
        localStorage.setItem('algo_notes', JSON.stringify(data));
        setSaveStatus('saved');
      } catch (e) {
        console.error('Error saving notes:', e);
      }
    }, 1000);
  };

  const insertSnippet = (snippet: string) => {
    const textarea = document.getElementById(`notes-${topicId}`) as HTMLTextAreaElement;
    if (!textarea) {
      handleChange(notes + (notes ? '\n' : '') + snippet);
      return;
    }
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newValue = notes.substring(0, start) + snippet + notes.substring(end);
    handleChange(newValue);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + snippet.length;
      textarea.selectionEnd = start + snippet.length;
    }, 0);
  };

  const handleExportPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Notes - ${topicId}</title>
          <style>
            body {
              font-family: Georgia, serif;
              max-width: 800px;
              margin: 40px auto;
              padding: 0 40px;
              color: #1a1a1a;
              line-height: 1.7;
            }
            h1 { color: #1565c0; border-bottom: 2px solid #1565c0; padding-bottom: 8px; }
            h2 { color: #1565c0; }
            h3 { color: #1976d2; }
            code {
              background: #f4f4f4;
              padding: 2px 6px;
              border-radius: 3px;
              font-family: monospace;
            }
            .header {
              background: #1565c0;
              color: white;
              padding: 16px 24px;
              border-radius: 8px;
              margin-bottom: 24px;
            }
            .header h2 { color: white; margin: 0; }
            .header p { margin: 4px 0 0; opacity: 0.8; font-size: 13px; }
            @media print { body { margin: 20px; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>📝 My Notes — ${topicId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h2>
            <p>Exported on ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
          </div>
          <div>${renderMarkdown(notes || 'No notes written yet.')}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 300);
  };

  const handleClear = () => {
    if (window.confirm('Clear all notes for this topic? This cannot be undone.')) {
      setNotes('');
      setSaveStatus('idle');
      try {
        const saved = localStorage.getItem('algo_notes');
        if (saved) {
          const data = JSON.parse(saved);
          delete data[topicId];
          localStorage.setItem('algo_notes', JSON.stringify(data));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const wordCount = notes.trim() ? notes.trim().split(/\s+/).length : 0;
  const lineCount = notes ? notes.split('\n').length : 0;

  const toolbarItems = [
    { label: 'B', title: 'Bold', snippet: '**bold**', style: { fontWeight: 'bold' as const } },
    { label: 'I', title: 'Italic', snippet: '*italic*', style: { fontStyle: 'italic' as const } },
    { label: '<>', title: 'Code', snippet: '`code`', style: { fontFamily: 'monospace' } },
    { label: 'H2', title: 'Heading', snippet: '## Heading' },
    { label: '•', title: 'List item', snippet: '- ' },
  ];

  return (
    <div style={{
      margin: '12px 0 40px',
      border: '1.5px solid #d0dff5',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(21,101,192,0.08)',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          padding: '13px 18px',
          background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none' as const
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '18px' }}>📝</span>
          <strong style={{ fontSize: '15px', color: 'white', letterSpacing: '0.2px' }}>
            My Personal Notes
          </strong>
          <span style={{
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '10px',
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '0.8px'
          }}>AUTO-SAVE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontStyle: 'italic' }}>
            {saveStatus === 'saving' && '💾 Saving...'}
            {saveStatus === 'saved' && '✓ Saved'}
          </span>
          <span style={{ fontSize: '14px', color: 'white' }}>
            {isCollapsed ? '▼' : '▲'}
          </span>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Toolbar */}
          <div style={{
            padding: '8px 16px',
            background: '#f0f4ff',
            borderBottom: '1px solid #d0dff5',
            display: 'flex',
            gap: '6px',
            flexWrap: 'wrap' as const,
            alignItems: 'center'
          }}>
            {/* Format buttons */}
            {toolbarItems.map(item => (
              <button
                key={item.label}
                title={item.title}
                onClick={() => insertSnippet(item.snippet)}
                style={{
                  background: 'white',
                  border: '1.5px solid #c5d5f0',
                  borderRadius: '5px',
                  padding: '3px 10px',
                  fontSize: '13px',
                  cursor: 'pointer',
                  color: '#1565c0',
                  ...(item.style || {})
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Divider */}
            <div style={{ width: '1px', height: '22px', background: '#c5d5f0', margin: '0 4px' }} />

            {/* Write / Preview toggle */}
            <div style={{ display: 'flex', border: '1.5px solid #c5d5f0', borderRadius: '6px', overflow: 'hidden' }}>
              {(['write', 'preview'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    background: mode === m ? '#1565c0' : 'white',
                    color: mode === m ? 'white' : '#1565c0',
                    border: 'none',
                    padding: '3px 12px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: mode === m ? '600' : '400',
                    transition: 'all 0.2s'
                  }}
                >
                  {m === 'write' ? '✏️ Write' : '👁️ Preview'}
                </button>
              ))}
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Export PDF */}
            <button
              onClick={handleExportPDF}
              title="Export as PDF"
              style={{
                background: '#1565c0',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '4px 12px',
                fontSize: '12px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              📄 Export PDF
            </button>

            {/* Clear */}
            <button
              onClick={handleClear}
              title="Clear notes"
              style={{
                background: 'white',
                border: '1.5px solid #ffcdd2',
                borderRadius: '5px',
                padding: '4px 12px',
                fontSize: '12px',
                cursor: 'pointer',
                color: '#c62828',
                fontWeight: '600'
              }}
            >
              🗑️ Clear
            </button>
          </div>

          {/* Write mode */}
          {mode === 'write' && (
            <textarea
              id={`notes-${topicId}`}
              value={notes}
              onChange={e => handleChange(e.target.value)}
              placeholder={`Write your notes here — markdown supported!\n\n## Key Concepts\n- Point 1\n- Point 2\n\n**Important:** Use **bold**, *italic*, \`code\` freely.\n\n## Time Complexity\n- Best: O(n log n)\n- Worst: O(n²)`}
              style={{
                width: '100%',
                minHeight: '220px',
                padding: '18px 20px',
                border: 'none',
                fontFamily: "'Fira Code', 'Cascadia Code', 'Roboto Mono', monospace",
                fontSize: '13.5px',
                lineHeight: '1.7',
                resize: 'vertical',
                outline: 'none',
                boxSizing: 'border-box' as const,
                display: 'block',
                color: '#1a1a1a',
                background: '#fafcff'
              }}
            />
          )}

          {/* Preview mode */}
          {mode === 'preview' && (
            <div
              style={{
                minHeight: '220px',
                padding: '18px 24px',
                background: '#fafcff',
                fontSize: '14px',
                lineHeight: '1.75',
                color: '#1a1a1a',
                overflowY: 'auto' as const
              }}
              dangerouslySetInnerHTML={{
                __html: notes
                  ? renderMarkdown(notes)
                  : '<span style="color:#aaa;font-style:italic">Nothing to preview yet. Switch to Write mode and add some notes.</span>'
              }}
            />
          )}

          {/* Footer */}
          <div style={{
            padding: '8px 18px',
            background: '#f0f4ff',
            borderTop: '1px solid #d0dff5',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
            color: '#5c7cb5'
          }}>
            <span>📄 {lineCount} lines · 🔤 {wordCount} words</span>
            <span>💾 Stored locally · never leaves your browser</span>
          </div>
        </>
      )}
    </div>
  );
}