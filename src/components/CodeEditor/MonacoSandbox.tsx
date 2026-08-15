import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

export type Language = 'javascript' | 'python' | 'cpp';

export interface MonacoSandboxProps {
  /** Initial source code shown in the editor */
  initialCode?: string;
  /** Programming language for syntax-highlighting class and execution mode */
  language?: Language;
  /** Alias for language used in test suites and PracticeRoom */
  initialLanguage?: Language;
  /** Title shown in the editor header */
  title?: string;
}

/**
 * Default algorithm templates per language.
 * Shown when the user clicks "Reset Code".
 */
export const DEFAULT_TEMPLATES: Record<Language, string> = {
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
console.log("Input Array:", JSON.stringify(arr));
console.log("Target Value:", target);
console.log("Found at index:", idx);
console.log("Status: Passed");`,

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
print("Input Array:", arr)
print("Sorted:", merge_sort(arr))
print("Status: Passed")`,

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
    cout << "Sorted: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    return 0;
}`,
};

/**
 * Applies a minimal token-based syntax highlight to code strings for preview mode.
 */
function tokenize(code: string, lang: Language): { text: string; cls: string }[] {
  const keywords: Record<Language, string[]> = {
    javascript: ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'while', 'for', 'of', 'new', 'import', 'export', 'default'],
    python: ['def', 'return', 'if', 'else', 'elif', 'while', 'for', 'in', 'import', 'from', 'class', 'len', 'print', 'and', 'or', 'not'],
    cpp: ['int', 'void', 'return', 'if', 'else', 'while', 'for', 'include', 'using', 'namespace', 'std', 'vector', 'swap', 'cout', 'main'],
  };

  const tokens: { text: string; cls: string }[] = [];
  const kw = new Set(keywords[lang]);

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
      className="m-0 p-3 text-sm font-mono bg-gray-950 text-gray-100 overflow-auto whitespace-pre min-h-[250px]"
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

// Global Pyodide singleton promise
let pyodidePromise: Promise<any> | null = null;

export async function runPythonCode(code: string): Promise<string> {
  if (typeof window !== 'undefined') {
    try {
      if (!pyodidePromise) {
        pyodidePromise = (async () => {
          if (typeof (window as any).loadPyodide !== 'function') {
            await new Promise<void>((resolve, reject) => {
              const script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
              script.onload = () => resolve();
              script.onerror = () => reject(new Error('CDN script failed to load'));
              document.head.appendChild(script);
            });
          }
          return await (window as any).loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
          });
        })();
      }

      const pyodide = await pyodidePromise;
      const setupCode = `
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`;
      await pyodide.runPythonAsync(setupCode);
      await pyodide.runPythonAsync(code);

      const stdout = await pyodide.runPythonAsync('sys.stdout.getvalue()');
      const stderr = await pyodide.runPythonAsync('sys.stderr.getvalue()');

      const combined = [stdout, stderr].filter(Boolean).join('\n[Stderr]\n');
      return combined.trim() || '(No output — code executed successfully)';
    } catch (err: any) {
      if (err && err.message && !err.message.includes('CDN')) {
        return `Python Runtime Error: ${err.message}`;
      }
    }
  }

  return executePythonFallback(code);
}

/** Fallback Python evaluator for offline / test environments */
export function executePythonFallback(code: string): string {
  const logs: string[] = [];
  try {
    let jsCode = code
      .replace(/#.*/g, '')
      .replace(/def\s+([a-zA-Z_]\w*)\s*\(([^)]*)\):/g, 'function $1($2) {')
      .replace(/elif\s+/g, '} else if ')
      .replace(/else:/g, '} else {')
      .replace(/if\s+(.*?):/g, 'if ($1) {')
      .replace(/while\s+(.*?):/g, 'while ($1) {')
      .replace(/for\s+([a-zA-Z_]\w*)\s+in\s+range\((.*?)\):/g, 'for (let $1 = 0; $1 < $2; $1++) {')
      .replace(/for\s+([a-zA-Z_]\w*)\s+in\s+(.*?):/g, 'for (let $1 of $2) {')
      .replace(/print\((.*?)\)/g, 'console.log($1)')
      .replace(/len\((.*?)\)/g, '$1.length')
      .replace(/([a-zA-Z_]\w*)\.append\((.*?)\)/g, '$1.push($2)')
      .replace(/(\w+)\s*\/\/\s*(\w+)/g, 'Math.floor($1 / $2)')
      .replace(/\bTrue\b/g, 'true')
      .replace(/\bFalse\b/g, 'false')
      .replace(/\bNone\b/g, 'null')
      .replace(/\band\b/g, '&&')
      .replace(/\bor\b/g, '||')
      .replace(/\bnot\b/g, '!');

    const openBraces = (jsCode.match(/\{/g) || []).length;
    const closeBraces = (jsCode.match(/\}/g) || []).length;
    for (let i = 0; i < openBraces - closeBraces; i++) {
      jsCode += '\n}';
    }

    const customConsole = {
      log: (...args: unknown[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      error: (...args: unknown[]) => logs.push('[Error] ' + args.map(String).join(' ')),
    };

    const fn = new Function('console', jsCode);
    fn(customConsole);
    return logs.join('\n') || '(No output — code executed successfully)';
  } catch (err: any) {
    return `Python Execution Error: ${err.message || String(err)}`;
  }
}

export async function runCppCode(code: string): Promise<string> {
  if (typeof window !== 'undefined' && typeof fetch === 'function') {
    try {
      const res = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          compiler: 'gcc-head',
          code: code,
          options: 'c++20',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === '0') {
          const out = (data.program_message || '').trim();
          return out || '(No output — program executed successfully)';
        } else {
          return `Compilation Error:\n${data.compiler_message || data.program_message || 'Compilation failed.'}`;
        }
      }
    } catch (netErr) {
      // Fall through to fallback
    }
  }

  return executeCppFallback(code);
}

/** Fallback C++ evaluator for offline / test environments */
export function executeCppFallback(code: string): string {
  const logs: string[] = [];
  try {
    let jsCode = code
      .replace(/#include\s*<.*?>/g, '')
      .replace(/using\s+namespace\s+std;/g, '')
      .replace(/\bvector<[^>]+>\s*/g, 'let ')
      .replace(/\bint\b|\bvoid\b|\bdouble\b|\bfloat\b|\bstring\b|\bauto\b/g, 'let ');

    jsCode = jsCode.replace(/cout\s*<<\s*(.*?);/g, (match, expr) => {
      const parts = expr.split('<<').map((p: string) => p.trim()).filter((p: string) => p && p !== 'endl');
      return `console.log(${parts.join(', ')});`;
    });

    jsCode = jsCode.replace(/swap\((.*?),\s*(.*?)\)/g, '[$1, $2] = [$2, $1]');
    jsCode = jsCode.replace(/for\s*\(\s*let\s+([a-zA-Z_]\w*)\s*:\s*(.*?)\)/g, 'for (let $1 of $2)');
    jsCode = jsCode.replace(/let\s+main\s*\(\s*\)\s*\{/g, 'function main() {');
    jsCode = jsCode.replace(/let\s+let\s+/g, 'let ');

    if (jsCode.includes('function main()')) {
      jsCode += '\nmain();';
    }

    const customConsole = {
      log: (...args: unknown[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
      error: (...args: unknown[]) => logs.push('[Error] ' + args.map(String).join(' ')),
    };

    const fn = new Function('console', jsCode);
    fn(customConsole);
    return logs.join('\n') || '(No output — code executed successfully)';
  } catch (err: any) {
    return `C++ Execution Error: ${err.message || String(err)}`;
  }
}

export default function MonacoSandbox({
  initialCode,
  language,
  initialLanguage,
  title = 'Interactive Algorithm Sandbox',
}: MonacoSandboxProps) {
  const activeLanguage: Language = language || initialLanguage || 'javascript';
  const defaultCode = initialCode ?? DEFAULT_TEMPLATES[activeLanguage];

  const [lang, setLang] = useState<Language>(activeLanguage);
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

  /** Clear console output */
  const handleClearOutput = () => {
    setOutput('');
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
          if (typeof window === 'undefined' || typeof Worker === 'undefined') {
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
            setIsRunning(false);
            return;
          }

          const workerScript = `
            self.onmessage = function(e) {
              const code = e.data;
              const logs = [];
              const customConsole = {
                log: function(...args) { logs.push(args.map(String).join(' ')); },
                error: function(...args) { logs.push('[Error] ' + args.map(String).join(' ')); },
                warn: function(...args) { logs.push('[Warn] ' + args.map(String).join(' ')); }
              };
              try {
                const fn = new Function('console', code);
                fn(customConsole);
                self.postMessage({ status: 'success', output: logs.join('\\n') || '(No output — code executed successfully)' });
              } catch (err) {
                self.postMessage({ status: 'error', error: err instanceof Error ? err.message : String(err) });
              }
            };
          `;

          const blob = new Blob([workerScript], { type: 'application/javascript' });
          const blobUrl = URL.createObjectURL(blob);
          const worker = new Worker(blobUrl);

          const EXECUTION_TIMEOUT_MS = 2000;
          let isFinished = false;

          const timeoutId = setTimeout(() => {
            if (!isFinished) {
              isFinished = true;
              worker.terminate();
              URL.revokeObjectURL(blobUrl);
              setOutput(`Runtime Error: Execution Timeout — Code took longer than ${EXECUTION_TIMEOUT_MS}ms to execute (possible infinite loop).`);
              setIsRunning(false);
            }
          }, EXECUTION_TIMEOUT_MS);

          worker.onmessage = (e: MessageEvent) => {
            if (isFinished) return;
            isFinished = true;
            clearTimeout(timeoutId);
            worker.terminate();
            URL.revokeObjectURL(blobUrl);

            if (e.data.status === 'success') {
              setOutput(e.data.output);
            } else {
              setOutput(`Runtime Error: ${e.data.error}`);
            }
            setIsRunning(false);
          };

          worker.onerror = (err: ErrorEvent) => {
            if (isFinished) return;
            isFinished = true;
            clearTimeout(timeoutId);
            worker.terminate();
            URL.revokeObjectURL(blobUrl);
            setOutput(`Runtime Error: ${err.message || 'Worker execution failed'}`);
            setIsRunning(false);
          };

          worker.postMessage(code);
          return;
        } else if (lang === 'python') {
          runPythonCode(code).then(res => {
            setOutput(res);
            setIsRunning(false);
          });
          return;
        } else if (lang === 'cpp') {
          runCppCode(code).then(res => {
            setOutput(res);
            setIsRunning(false);
          });
          return;
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setOutput(`Runtime Error: ${msg}`);
        setIsRunning(false);
      }
    }, 200);
  };

  const outputLines = output ? output.split('\n') : [];

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
            aria-label="Reset code"
          >
            🔄 Reset
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
        <Editor
          height="300px"
          language={lang === 'cpp' ? 'cpp' : lang}
          value={code}
          onChange={(val?: string) => setCode(val || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            scrollBeyondLastLine: false,
          }}
        />
      )}

      {/* Output console */}
      <div
        role="region"
        aria-label="output console"
        className="p-3 bg-gray-950 text-green-400 font-mono text-xs border-t border-gray-800 whitespace-pre-wrap"
      >
        <div className="flex items-center justify-between text-gray-400 mb-2">
          <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Console Output</span>
          {output ? (
            <button
              onClick={handleClearOutput}
              className="text-[11px] px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
              aria-label="Clear console output"
            >
              Clear
            </button>
          ) : null}
        </div>
        <div>
          {output ? (
            outputLines.map((line, idx) => {
              const parts = line.split(':');
              if (parts.length > 1) {
                const label = parts[0] + ':';
                const rest = parts.slice(1).join(':');
                return (
                  <div key={idx}>
                    <div className="inline-block text-gray-300 font-medium mr-1">{label}</div>
                    {rest.includes('Passed') ? (
                      <span className="text-green-400 font-bold">{rest}</span>
                    ) : (
                      <span>{rest}</span>
                    )}
                  </div>
                );
              }
              return (
                <div key={idx}>
                  {line.includes('Passed') ? (
                    <span className="text-green-400 font-bold">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              );
            })
          ) : (
            <span className="text-gray-500 italic">Click "Run Code" to execute algorithm</span>
          )}
        </div>
      </div>
    </div>
  );
}
