import React, { useState } from 'react';

interface MonacoSandboxProps {
  initialCode?: string;
  language?: 'javascript' | 'python' | 'cpp';
  title?: string;
}

export default function MonacoSandbox({
  initialCode = '// Write your algorithm code here\nconsole.log("Hello, Algo Sandbox!");',
  language = 'javascript',
  title = 'Interactive Algorithm Sandbox',
}: MonacoSandboxProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Running code...');

    setTimeout(() => {
      try {
        if (language === 'javascript') {
          const logs: string[] = [];
          const customConsole = {
            log: (...args: any[]) => logs.push(args.join(' ')),
            error: (...args: any[]) => logs.push('[Error] ' + args.join(' ')),
          };
          const runFn = new Function('console', code);
          runFn(customConsole);
          setOutput(logs.join('\n') || 'Code executed successfully with no output.');
        } else {
          setOutput(`[${language.toUpperCase()} Execution Simulated]\nOutput:\n${code.slice(0, 100)}...`);
        }
      } catch (err: any) {
        setOutput(`Runtime Error: ${err.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 300);
  };

  return (
    <div className="monaco-sandbox-container my-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="font-semibold text-sm text-gray-700 dark:text-gray-200">{title} ({language})</span>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="px-3 py-1 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition"
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </button>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={8}
        className="w-full p-3 font-mono text-sm bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:outline-none resize-y"
      />
      {output && (
        <div className="p-3 bg-gray-900 text-green-400 font-mono text-xs border-t border-gray-800 whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
}
