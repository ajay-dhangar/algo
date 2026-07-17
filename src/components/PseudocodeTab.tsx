import React, { useMemo } from 'react';
import { generatePseudocode } from '../utils/pseudocodeGenerator';

interface PseudocodeTabProps {
  solution: string;
  customPseudocode?: string[];
}

export default function PseudocodeTab({ solution, customPseudocode }: PseudocodeTabProps) {
  const pseudocodeLines = useMemo(() => {
    if (customPseudocode && customPseudocode.length > 0) {
      return customPseudocode;
    }
    return generatePseudocode(solution);
  }, [solution, customPseudocode]);

  return (
    <div className="space-y-6 flex flex-col h-full">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-lg font-black text-slate-900 dark:text-white m-0">Pseudocode</h2>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <p className="text-sm text-slate-600 dark:text-slate-400 shrink-0">
          This is a high-level representation of the algorithm to help you understand its logic without language-specific syntax.
        </p>
        
        <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col">
          <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 shrink-0">
            <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Algorithm Logic</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/50">
            <pre
              className="m-0 bg-transparent p-0 text-sm font-mono leading-relaxed"
              style={{ color: 'var(--ifm-font-color-base)' }}
            >
              {pseudocodeLines.map((line, idx) => (
                <div
                  key={idx}
                  className="hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-colors px-2 py-0.5 rounded"
                  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                >
                  <span className="text-slate-400 dark:text-slate-500 mr-4 select-none text-xs">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-slate-700 dark:text-slate-300">{line}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
