import { useCallback } from "react";

export default function useConsoleCapture() {
  const runWithCapture = useCallback((code: string): Promise<string[]> => {
    return new Promise((resolve) => {
      const workerCode = `
        self.onmessage = function(e) {
          const { code } = e.data;
          const logs = [];
          
          const serialize = (arg) => {
            if (arg instanceof Error) {
              return arg.stack || (arg.name + ": " + arg.message);
            }
            if (typeof arg === "object" && arg !== null) {
              try {
                return JSON.stringify(arg, (key, value) => {
                  if (value instanceof Error) {
                    return value.stack || (value.name + ": " + value.message);
                  }
                  return value;
                }, 2);
              } catch (err) {
                return String(arg);
              }
            }
            return String(arg);
          };

          console.log = (...args) => {
            logs.push(args.map(serialize).join(" "));
          };
          console.error = (...args) => {
            logs.push("❌ Error: " + args.map(serialize).join(" "));
          };
          console.warn = (...args) => {
            logs.push("⚠️ Warn: " + args.map(serialize).join(" "));
          };
          console.info = (...args) => {
            logs.push("ℹ️ Info: " + args.map(serialize).join(" "));
          };

          try {
            // eslint-disable-next-line no-new-func
            new Function(code)();
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            logs.push("❌ Error: " + msg);
          }
          
          self.postMessage({ logs });
        };
      `;

      const blob = new Blob([workerCode], { type: "application/javascript" });
      const workerUrl = URL.createObjectURL(blob);
      const worker = new Worker(workerUrl);

      let isDone = false;

      const timeoutId = setTimeout(() => {
        if (!isDone) {
          isDone = true;
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          resolve(["❌ Error: Execution timed out (Possible infinite loop)"]);
        }
      }, 3000); // 3 seconds timeout

      worker.onmessage = (e) => {
        if (!isDone) {
          isDone = true;
          clearTimeout(timeoutId);
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          resolve(e.data.logs);
        }
      };

      worker.onerror = (e) => {
        if (!isDone) {
          isDone = true;
          clearTimeout(timeoutId);
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          resolve(["❌ Error: Worker execution failed"]);
        }
      };

      worker.postMessage({ code });
    });
  }, []);

  return { runWithCapture };
}
