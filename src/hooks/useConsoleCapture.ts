import { useCallback, useEffect, useRef } from "react";

export default function useConsoleCapture() {
  const origLogRef = useRef(console.log);
  const origErrorRef = useRef(console.error);

  // Safely restore original console methods on unmount
  useEffect(() => {
    return () => {
      console.log = origLogRef.current;
      console.error = origErrorRef.current;
    };
  }, []);

  const runWithCapture = useCallback((code: string): string[] => {
    const logs: string[] = [];
    
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
      console.log = origLogRef.current;
      console.error = origErrorRef.current;
    }

    return logs;
  }, []);

  return { runWithCapture };
}
