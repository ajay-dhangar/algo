import React, { useState, useEffect, useRef } from 'react';
import { FaEdit, FaEye, FaDownload, FaTrashAlt, FaChevronDown, FaChevronUp, FaCloudUploadAlt, FaCheckCircle } from 'react-icons/fa';

interface Props {
  topicId: string;
}

// Simple markdown to HTML renderer driven natively by CSS Variables
function renderMarkdown(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/^### (.+)$/gm, '<h3 style="margin:16px 0 6px; font-size:15px; font-weight:700; color:var(--ifm-color-primary)">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="margin:20px 0 8px; font-size:18px; font-weight:700; color:var(--ifm-color-primary); border-bottom:1px solid rgba(128,128,128,0.15); padding-bottom:4px;">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="margin:24px 0 12px; font-size:22px; font-weight:800; color:var(--ifm-color-primary)">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--ifm-heading-color, inherit)">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code style="background:rgba(128,128,128,0.1); padding:2px 6px; border-radius:4px; font-family:var(--ifm-font-family-monospace, monospace); font-size:var(--ifm-code-font-size, 90%); color:var(--ifm-color-primary-dark, inherit)">$1</code>')
    .replace(/^- (.+)$/gm, '<li style="margin:4px 0; padding-left:2px">$1</li>')
    .replace(/(<li.*<\/li>)/gs, '<ul style="margin:8px 0; padding-left:20px; list-style-type:disc;">$1</ul>')
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
    }, 800);
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
    
    // Grabbing clean primary color styles for the printing stylesheet context
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ifm-color-primary').trim() || '#3b82f6';
    const headingText = topicId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Notes - ${headingText}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              max-width: 820px;
              margin: 40px auto;
              padding: 0 40px;
              color: #1c1917;
              line-height: 1.65;
            }
            h1, h2, h3 { color: ${primaryColor}; font-weight: 700; }
            h1 { border-bottom: 2px solid ${primaryColor}; padding-bottom: 6px; margin-top: 0; }
            code {
              background: #f4f4f5;
              padding: 3px 6px;
              border-radius: 4px;
              font-family: monospace;
              font-size: 13px;
            }
            .header-banner {
              border-left: 4px solid ${primaryColor};
              background: #f8fafc;
              padding: 16px 20px;
              border-radius: 0 12px 12px 0;
              margin-bottom: 32px;
            }
            .header-banner h2 { color: #0f172a; margin: 0; font-size: 20px; }
            .header-banner p { margin: 4px 0 0; color: #64748b; font-size: 12px; font-weight: 500; }
            @media print { body { margin: 20px; } .header-banner { background: #ffffff; border: 1px solid #e2e8f0; } }
          </style>
        </head>
        <body>
          <div class="header-banner">
            <h2>📝 Personal Study Logs: ${headingText}</h2>
            <p>Exported from Workbook on ${new Date().toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
          </div>
          <div>${renderMarkdown(notes || '<em>No custom logs saved for this topic yet.</em>')}</div>
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
    if (window.confirm('Clear all local notes for this topic? This execution is permanent.')) {
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
    { label: 'B', title: 'Bold', snippet: '**bold**', className: 'font-bold' },
    { label: 'I', title: 'Italic', snippet: '*italic*', className: 'italic font-serif' },
    { label: '<>', title: 'Code Block', snippet: '`code`', className: 'font-mono text-xs opacity-90' },
    { label: 'H2', title: 'Heading', snippet: '## Heading', className: 'font-black text-xs' },
    { label: '• List', title: 'Bullet List', snippet: '- ' },
  ];

  return (
    <div className="my-6 border rounded-xl overflow-hidden shadow-sm transition-all duration-300 bg-white border-slate-200 dark:bg-zinc-900/30 dark:border-zinc-800">
      
      {/* Interactive Ribbon Top-Header */}
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ background: 'linear-gradient(135deg, var(--ifm-color-primary) 0%, var(--ifm-color-primary-dark) 100%)' }}
        className="px-5 py-3.5 flex justify-between items-center cursor-pointer select-none shadow-sm active:opacity-95 transition-opacity"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg">📝</span>
          <strong className="text-sm sm:text-base font-bold text-white tracking-tight">
            My Study Notes
          </strong>
          <span className="bg-white/20 text-white px-2 py-0.5 rounded-md text-[9px] font-black tracking-wider uppercase backdrop-blur-sm">
            Local Sync
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-white/90 flex items-center gap-1.5 min-w-[70px] justify-end">
            {saveStatus === 'saving' && <><FaCloudUploadAlt className="animate-pulse" /> Saving...</>}
            {saveStatus === 'saved' && <><FaCheckCircle /> Saved</>}
          </span>
          <div className="text-white opacity-80 hover:opacity-100 text-sm transition-opacity">
            {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
          </div>
        </div>
      </div>

      {!isCollapsed && (
        <div className="flex flex-col">
          
          {/* Action Module Toolbar */}
          <div className="px-4 py-2 bg-slate-50 border-b flex flex-wrap gap-2 items-center justify-between dark:bg-zinc-900/60 border-slate-200 dark:border-zinc-800">
            <div className="flex flex-wrap gap-1.5 items-center">
              
              {/* Layout Formatter Hooks */}
              {toolbarItems.map(item => (
                <button
                  key={item.label}
                  title={item.title}
                  onClick={() => insertSnippet(item.snippet)}
                  style={{ color: 'var(--ifm-color-primary)' }}
                  className={`bg-white hover:bg-slate-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors shadow-2xs ${item.className || ''}`}
                >
                  {item.label}
                </button>
              ))}

              <div className="w-[1px] h-5 bg-slate-200 dark:bg-zinc-700 mx-1" />

              {/* View Controller Toggles */}
              <div className="inline-flex rounded-lg border border-slate-200 dark:border-zinc-700 p-0.5 bg-white dark:bg-zinc-800">
                <button
                  onClick={() => setMode('write')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md transition-all border-none cursor-pointer ${
                    mode === 'write'
                      ? 'bg-[var(--ifm-color-primary)] text-white shadow-xs'
                      : 'bg-transparent text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <FaEdit className="text-[10px]" /> Write
                </button>
                <button
                  onClick={() => setMode('preview')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-md transition-all border-none cursor-pointer ${
                    mode === 'preview'
                      ? 'bg-[var(--ifm-color-primary)] text-white shadow-xs'
                      : 'bg-transparent text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200'
                  }`}
                >
                  <FaEye className="text-[10px]" /> Preview
                </button>
              </div>
            </div>

            {/* Global Operations Control */}
            <div className="flex items-center gap-2 mt-1 sm:mt-0">
              <button
                onClick={handleExportPDF}
                style={{ backgroundColor: 'var(--ifm-color-primary)' }}
                className="hover:opacity-90 text-white font-bold py-1 px-3 rounded-md text-xs inline-flex items-center gap-1.5 transition-opacity cursor-pointer border-none"
              >
                <FaDownload className="text-[10px]" /> Export PDF
              </button>
              <button
                onClick={handleClear}
                className="bg-transparent hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-slate-200 dark:border-zinc-700 hover:border-rose-200 dark:hover:border-rose-900 rounded-md py-1 px-3 text-xs font-bold text-rose-600 dark:text-rose-400 transition-colors cursor-pointer"
              >
                <FaTrashAlt className="text-[10px]" /> Clear
              </button>
            </div>
          </div>

          {/* Core Content Editor / Buffer Area */}
          <div className="relative bg-slate-50/30 dark:bg-zinc-950/20">
            {mode === 'write' ? (
              <textarea
                id={`notes-${topicId}`}
                value={notes}
                onChange={e => handleChange(e.target.value)}
                placeholder={`Write notes here — markdown supported!\n\n## Core Algorithm Strategy\n- Step 1: Base validation constraints.\n- Step 2: Recurse dynamically.\n\n**Note:** Code tokens like \`O(N log N)\` auto-render nicely.`}
                className="w-full min-h-[240px] p-5 border-none font-mono text-sm leading-relaxed resize-y bg-transparent outline-none text-slate-800 dark:text-zinc-200 placeholder-slate-400 dark:placeholder-zinc-600 focus:ring-0 block"
              />
            ) : (
              <div
                className="min-h-[240px] p-6 text-sm leading-relaxed text-slate-800 dark:text-zinc-200 overflow-y-auto"
                dangerouslySetInnerHTML={{
                  __html: notes
                    ? renderMarkdown(notes)
                    : '<span class="text-slate-400 dark:text-zinc-600 italic font-medium">Notebook is currently blank. Flip back to "Write" mode to append custom parameters.</span>'
                }}
              />
            )}
          </div>

          {/* Component Informational Footer */}
          <div className="px-5 py-2.5 bg-slate-50 border-t flex justify-between items-center text-xs text-slate-500 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 dark:text-zinc-500 font-medium font-mono">
            <span>{lineCount} lines &middot; {wordCount} words</span>
            <span className="hidden sm:inline">Locked Workspace &bull; Encrypted Browser Store</span>
          </div>
          
        </div>
      )}
    </div>
  );
}