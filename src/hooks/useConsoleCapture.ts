import { useCallback } from "react";

export default function useConsoleCapture() {
  const runWithCapture = useCallback((code: string): string[] => {
    const logs: string[] = [];
    const origLog = console.log;
    const origError = console.error;
    
    // Override methods to capture output
    console.log = (...args: unknown[]) => {
      logs.push(args.map(String).join(" "));
    };
    
    console.error = (...args: unknown[]) => {
      logs.push("❌ Error: " + args.map(String).join(" "));
    };

    try {
      // eslint-disable-next-line no-new-func
      new Function(code)();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      logs.push("❌ Error: " + msg);
    } finally {
      // Restore immediately after synchronous execution completes
      console.log = origLog;
      console.error = origError;
    }

    return logs;
  }, []);

  return { runWithCapture };
}
