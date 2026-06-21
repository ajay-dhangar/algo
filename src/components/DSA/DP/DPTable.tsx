import React, { useState } from "react";
import { withVisualizerErrorBoundary } from "../../Visualizing/VisualizerErrorBoundary";

const DPTableComponent: React.FC = () => {
  const [str1, setStr1] = useState("LCS");
  const [str2, setStr2] = useState("CLASS");
  const [hovered, setHovered] = useState<{ r: number; c: number } | null>(null);

  const n = str1.length;
  const m = str2.length;

  // Compute DP table for LCS
  const dp: number[][] = Array(n + 1)
    .fill(0)
    .map(() => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Determine if a cell is a dependency of the hovered cell
  const isDependency = (r: number, c: number) => {
    if (!hovered) return false;
    const { r: hr, c: hc } = hovered;
    if (hr === 0 || hc === 0) return false;

    if (str1[hr - 1] === str2[hc - 1]) {
      return r === hr - 1 && c === hc - 1;
    } else {
      return (r === hr - 1 && c === hc) || (r === hr && c === hc - 1);
    }
  };

  const getExplanation = () => {
    if (!hovered) return "Hover over any cell to see how its value is computed from its dependencies.";
    const { r: hr, c: hc } = hovered;
    if (hr === 0 || hc === 0) {
      return `Cell at [${hr}, ${hc}] is a base case initialized to 0.`;
    }
    const match = str1[hr - 1] === str2[hc - 1];
    if (match) {
      return `Characters match ('${str1[hr - 1]}'). Value = 1 + diagonal cell [${hr - 1}, ${hc - 1}] (${dp[hr - 1][hc - 1]}) = ${dp[hr][hc]}`;
    } else {
      return `Characters mismatch ('${str1[hr - 1]}' != '${str2[hc - 1]}'). Value = max(top cell [${hr - 1}, ${hc}] (${dp[hr - 1][hc]}), left cell [${hr}, ${hc - 1}] (${dp[hr][hc - 1]})) = ${dp[hr][hc]}`;
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold mb-4 text-emerald-600 dark:text-emerald-400">
        Interactive DP Transition Table (LCS)
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            String 1 (Rows):
          </label>
          <input
            type="text"
            value={str1}
            maxLength={10}
            onChange={(e) => setStr1(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            String 2 (Columns):
          </label>
          <input
            type="text"
            value={str2}
            maxLength={10}
            onChange={(e) => setStr2(e.target.value.toUpperCase())}
            className="w-full px-3 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-mono"
          />
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-100 dark:border-zinc-850 rounded-xl mb-4 bg-gray-50/50 dark:bg-zinc-950/20 p-4">
        <table className="min-w-full text-center border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-xs font-bold text-gray-400 font-mono">-</th>
              <th className="p-2 text-xs font-bold text-gray-400 font-mono">Ø</th>
              {str2.split("").map((char, j) => (
                <th key={j} className="p-2 text-xs font-bold text-gray-900 dark:text-white font-mono bg-zinc-100/50 dark:bg-zinc-800/30 rounded-lg">
                  {char}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Row index 0 is base cases */}
            {Array(n + 1).fill(0).map((_, r) => (
              <tr key={r}>
                <td className="p-2 text-xs font-bold text-gray-900 dark:text-white font-mono bg-zinc-100/50 dark:bg-zinc-800/30 rounded-lg">
                  {r === 0 ? "Ø" : str1[r - 1]}
                </td>
                {Array(m + 1).fill(0).map((_, c) => {
                  const val = dp[r][c];
                  const isHovered = hovered?.r === r && hovered?.c === c;
                  const isDep = isDependency(r, c);

                  let cellBg = "bg-white dark:bg-zinc-900";
                  let borderStyle = "border border-gray-200 dark:border-zinc-800";

                  if (isHovered) {
                    cellBg = "bg-blue-500 text-white font-bold";
                    borderStyle = "border-2 border-blue-600 dark:border-blue-400";
                  } else if (isDep) {
                    cellBg = "bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-semibold";
                    borderStyle = "border border-amber-300 dark:border-amber-700";
                  }

                  return (
                    <td
                      key={c}
                      onMouseEnter={() => setHovered({ r, c })}
                      onMouseLeave={() => setHovered(null)}
                      className={`p-3 text-sm font-mono transition-all duration-150 cursor-pointer ${cellBg} ${borderStyle}`}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-zinc-50 dark:bg-zinc-850/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Dependency Formula Explanation
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 font-mono leading-relaxed">
          {getExplanation()}
        </p>
      </div>
    </div>
  );
};

export const DPTable = withVisualizerErrorBoundary(DPTableComponent);
