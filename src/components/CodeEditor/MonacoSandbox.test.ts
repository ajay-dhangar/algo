import {
  DEFAULT_TEMPLATES,
  executePythonFallback,
  executeCppFallback,
  runPythonCode,
  runCppCode,
} from './MonacoSandbox';

type Language = 'javascript' | 'python' | 'cpp';

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

/** Simulates JS eval logic from MonacoSandbox.handleRun for JavaScript */
function runJavaScript(code: string): string {
  const logs: string[] = [];
  const customConsole = {
    log: (...args: unknown[]) => logs.push(args.map(String).join(' ')),
    error: (...args: unknown[]) => logs.push('[Error] ' + args.map(String).join(' ')),
  };
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function('console', code);
    fn(customConsole);
    return logs.join('\n') || '(No output — code executed successfully)';
  } catch (err: unknown) {
    return `Runtime Error: ${err instanceof Error ? err.message : String(err)}`;
  }
}

describe('MonacoSandbox — tokenizer', () => {
  it('marks JavaScript keywords correctly', () => {
    const tokens = tokenize('function foo() { return 42; }', 'javascript');
    const kwTokens = tokens.filter(t => t.cls === 'tok-keyword');
    expect(kwTokens.map(t => t.text)).toContain('function');
    expect(kwTokens.map(t => t.text)).toContain('return');
  });

  it('marks string literals correctly', () => {
    const tokens = tokenize('const s = "hello";', 'javascript');
    const strTok = tokens.find(t => t.cls === 'tok-string');
    expect(strTok?.text).toBe('"hello"');
  });

  it('marks numeric literals correctly', () => {
    const tokens = tokenize('let x = 42;', 'javascript');
    const numTok = tokens.find(t => t.cls === 'tok-number');
    expect(numTok?.text).toBe('42');
  });

  it('marks JS line comments correctly', () => {
    const tokens = tokenize('// This is a comment\nlet x = 1;', 'javascript');
    const commentTok = tokens.find(t => t.cls === 'tok-comment');
    expect(commentTok?.text).toBe('// This is a comment');
  });

  it('marks Python keywords and # comments correctly', () => {
    const tokens = tokenize('# comment\ndef foo(): return 1', 'python');
    expect(tokens.find(t => t.cls === 'tok-comment')?.text).toBe('# comment');
    expect(tokens.find(t => t.text === 'def')?.cls).toBe('tok-keyword');
    expect(tokens.find(t => t.text === 'return')?.cls).toBe('tok-keyword');
  });
});

describe('MonacoSandbox — JavaScript execution', () => {
  it('captures console.log output', () => {
    const result = runJavaScript('console.log("hello", "world");');
    expect(result).toBe('hello world');
  });

  it('captures multiple console.log lines', () => {
    const result = runJavaScript('console.log(1); console.log(2); console.log(3);');
    expect(result).toBe('1\n2\n3');
  });

  it('returns no-output message when nothing is logged', () => {
    const result = runJavaScript('const x = 1 + 1;');
    expect(result).toBe('(No output — code executed successfully)');
  });

  it('returns Runtime Error on invalid code', () => {
    const result = runJavaScript('undefinedFn();');
    expect(result).toMatch(/Runtime Error/);
  });

  it('executes a binary search and logs the correct index', () => {
    const code = `
      function binarySearch(arr, t) {
        let lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
          const mid = Math.floor((lo + hi) / 2);
          if (arr[mid] === t) return mid;
          else if (arr[mid] < t) lo = mid + 1;
          else hi = mid - 1;
        }
        return -1;
      }
      console.log(binarySearch([2, 5, 8, 12, 16, 23, 38], 23));
    `;
    const result = runJavaScript(code);
    expect(result.trim()).toBe('5');
  });
});

describe('MonacoSandbox — Python execution', () => {
  it('executes Python print statements', () => {
    const result = executePythonFallback('print("Hello", "Python")');
    expect(result).toContain('Hello Python');
  });

  it('executes Python merge sort template', () => {
    const result = executePythonFallback(DEFAULT_TEMPLATES.python);
    expect(result).toContain('Sorted:');
  });

  it('runs Python code via runPythonCode helper', async () => {
    const result = await runPythonCode('print(42)');
    expect(result).toContain('42');
  });
});

describe('MonacoSandbox — C++ execution', () => {
  it('executes C++ quick sort template fallback', () => {
    const result = executeCppFallback(DEFAULT_TEMPLATES.cpp);
    expect(result).toContain('10');
  });

  it('runs C++ code via runCppCode helper', async () => {
    const result = await runCppCode('#include <iostream>\nusing namespace std;\nint main() { cout << "Hello C++" << endl; return 0; }');
    expect(result).toContain('Hello C++');
  });
});
