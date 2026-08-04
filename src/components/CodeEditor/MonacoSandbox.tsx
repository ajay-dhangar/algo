import React, { useState } from 'react';

type Language = 'javascript' | 'python' | 'cpp';

interface MonacoSandboxProps {
  /** Initial source code shown in the editor */
  initialCode?: string;
  /** Programming language for syntax-highlighting class and execution mode */
  language?: Language;
  /** Title shown in the editor header */
  title?: string;
}

/**
 * Default algorithm templates per language.
 * Shown when the user clicks "Reset Code".
 */
const DEFAULT_TEMPLATES: Record<Language, string> = {
  javascript: `// Binary Search — JavaScript
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  return -1;
}

const arr = [2, 5, 8, 12, 16, 23, 38, 45];
const target = 23;
const idx = binarySearch(arr, target);
console.log(\`Found \${target} at index: \${idx}\`);`,

  python: `# Merge Sort — Python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]

arr = [38, 27, 43, 3, 9, 82, 10]
print("Sorted:", merge_sort(arr))`,

  cpp: `// Quick Sort — C++
#include <vector>
#include <iostream>
using namespace std;

int partition(vector<int>& arr, int lo, int hi) {
    int pivot = arr[hi], i = lo;
    for (int j = lo; j < hi; j++)
        if (arr[j] <= pivot) swap(arr[i++], arr[j]);
    swap(arr[i], arr[hi]);
    return i;
}

void quickSort(vector<int>& arr, int lo, int hi) {
    if (lo < hi) {
        int p = partition(arr, lo, hi);
        quickSort(arr, lo, p - 1);
        quickSort(arr, p + 1, hi);
    }
}

int main() {
    vector<int> arr = {10, 80, 30, 90, 40, 50, 70};
    quickSort(arr, 0, arr.size() - 1);
    for (int x : arr) cout << x << " ";
    return 0;
}`,
};

/**
 * Applies a minimal token-based syntax highlight to code strings.
 * Returns an array of {text, cls} segments for rendering.
 */
function tokenize(code: string, lang: Language): { text: string; cls: string }[] {
  const keywords: Record<Language, string[]> = {
    javascript: ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'while', 'for', 'of', 'new', 'import', 'export', 'default'],
    python: ['def', 'return', 'if', 'else', 'elif', 'while', 'for', 'in', 'import', 'from', 'class', 'len', 'print', 'and', 'or', 'not'],
    cpp: ['int', 'void', 'return', 'if', 'else', 'while', 'for', 'include', 'using', 'namespace', 'std', 'vector', 'swap', 'cout', 'main'],
  };

  const tokens: { text: string; cls: string }[] = [];
  const kw = new Set(keywords[lang]);

  // Very lightweight tokenizer: split on word boundaries and whitespace
  const regex = /(\/\/.*|#.*|"[^"]*"|'[^']*'|\d+|[a-zA-Z_]\w*|[^\w])/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(code)) !== null) {
    const tok = match[0];
    if (tok.startsWith('//') || tok.startsWith('#')) tokens.push({ text: tok, cls: 'tok-comment' });
    else if (tok.startsWith('"') || tok.startsWith("'")) tokens.push({ text: tok, cls: 'tok-string' });
    else if (/^\d+$/.test(tok)) tokens.push({ text: tok, cls: 'tok-number' });
    else if (kw.has(tok)) tokens.push({ text: tok, cls: 'tok-keyword' });
    else tokens.push({ text: tok, cls: '' });
  }
  return tokens;
}

function HighlightedCode({ code, lang }: { code: string; lang: Language }) {
  const tokens = tokenize(code, lang);
  return (
    <pre
      className="m-0 p-3 text-sm font-mono bg-gray-950 text-gray-100 overflow-auto whitespace-pre"
      aria-label="Syntax highlighted code"
    >
      {tokens.map((t, i) => {
        let style: React.CSSProperties = {};
        if (t.cls === 'tok-keyword') style = { color: '#c792ea' };
        else if (t.cls === 'tok-string') style = { color: '#c3e88d' };
        else if (t.cls === 'tok-number') style = { color: '#f78c6c' };
        else if (t.cls === 'tok-comment') style = { color: '#546e7a', fontStyle: 'italic' };
        return <span key={i} style={style}>{t.text}</span>;
      })}
    </pre>
  );
}

export default function MonacoSandbox({
  initialCode,
  language = 'javascript',
  title = 'Interactive Algorithm Sandbox',
}: MonacoSandboxProps) {
  const defaultCode = initialCode ?? DEFAULT_TEMPLATES[language];

  const [lang, setLang] = useState<Language>(language);
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  /** Reset code to default template for the current language */
  const handleReset = () => {
    setCode(DEFAULT_TEMPLATES[lang]);
    setOutput('');
    setShowPreview(false);
  };

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    setCode(DEFAULT_TEMPLATES[newLang]);
    setOutput('');
    setShowPreview(false);
  };

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Running…');

    setTimeout(() => {
      try {
        if (lang === 'javascript') {
          const logs: string[] = [];
          const customConsole = {
            log: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
            error: (...args: unknown[]) => logs.push('[Error] ' + args.map(String).join(' ')),
            warn: (...args: unknown[]) => logs.push('[Warn] ' + args.map(String).join(' ')),
          };
          // eslint-disable-next-line no-new-func
          const fn = new Function('console', code);
          fn(customConsole);
          setOutput(logs.join('\n') || '(No output — code executed successfully)');
        } else if (lang === 'python') {
          setOutput(
            `[Python Execution — Pyodide simulation]\n\n` +
            `The following Python code was submitted:\n\n${code}\n\n` +
            `→ To run Python in-browser, integrate Pyodide:\n` +
            `  https://pyodide.org/en/stable/usage/quickstart.html`,
          );
        } else {
          setOutput(
            `[C++ Execution — Server-side compilation required]\n\n` +
            `The following C++ code was submitted:\n\n${code}\n\n` +
            `→ C++ requires server-side compilation (e.g., via Godbolt/Compiler Explorer API).`,
          );
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setOutput(`Runtime Error: ${msg}`);
      } finally {
        setIsRunning(false);
      }
    }, 200);
  };

  return (
    <div className="monaco-sandbox-container my-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md overflow-hidden font-mono">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="font-semibold text-sm text-gray-700 dark:text-gray-200 truncate">{title}</span>
        <div className="flex items-center gap-2 ml-2 flex-shrink-0">
          {/* Language selector */}
          <select
            value={lang}
            onChange={e => handleLangChange(e.target.value as Language)}
            className="text-xs px-1.5 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
            aria-label="Select programming language"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          {/* Preview toggle */}
          <button
            onClick={() => setShowPreview(p => !p)}
            className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 hover:bg-gray-100 transition"
            title="Toggle syntax-highlighted preview"
          >
            {showPreview ? '✏️ Edit' : '👁 Preview'}
          </button>
          {/* Reset */}
          <button
            onClick={handleReset}
            className="px-2 py-1 text-xs rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Reset code to default template"
          >
            🔄 Reset Code
          </button>
          {/* Run */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-3 py-1 text-xs font-semibold rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white transition"
            aria-label="Run code"
          >
            {isRunning ? '⏳ Running…' : '▶ Run Code'}
          </button>
        </div>
      </div>

      {/* Editor area */}
      {showPreview ? (
        <HighlightedCode code={code} lang={lang} />
      ) : (
        <textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={14}
          spellCheck={false}
          aria-label="Code editor"
          className="w-full p-3 font-mono text-sm bg-gray-950 text-gray-100 focus:outline-none resize-y border-0"
          style={{ minHeight: '200px' }}
        />
      )}

      {/* Output console */}
      {output && (
        <div
          className="p-3 bg-gray-950 text-green-400 font-mono text-xs border-t border-gray-800 whitespace-pre-wrap"
          aria-label="Output console"
          aria-live="polite"
        >
          <div className="text-gray-500 mb-1 text-[10px] uppercase tracking-wider">Output</div>
          {output}
        </div>
      )}
    </div>
  );
}
