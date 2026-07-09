import React, { useState, useEffect } from "react";
import { algorithmsData } from "../../data/algorithmsData";
import Link from "@docusaurus/Link";
import { FiCalendar, FiTrendingUp, FiArrowRight } from "react-icons/fi";

const categoryColors: Record<string, string> = {
  Sorting: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/50",
  Searching: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50",
  Graph: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50",
  "Dynamic Programming": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900/50",
};

const AlgorithmOfTheDaySection: React.FC = () => {
  const [algo, setAlgo] = useState<typeof algorithmsData[0] | null>(null);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const date = new Date();
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (algorithmsData && algorithmsData.length > 0) {
      setAlgo(algorithmsData[dayOfYear % algorithmsData.length]);
    }
    
    setFormattedDate(
      date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    );
  }, []);

  // Structural placeholder state layout during compilation to eliminate hydration layout shifting
  if (!isMounted || !algo) {
    return (
      <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-gray-950 dark:via-gray-900/20 dark:to-gray-950">
        <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] dark:bg-indigo-500/[0.02] blur-[140px] pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-gray-800 border border-transparent text-transparent text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
              <span className="flex h-1.5 w-1.5 rounded-full bg-transparent" />
              Loading Instance...
            </div>
            <div className="h-10 bg-slate-200 dark:bg-gray-800 rounded-lg w-3/4 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-slate-200 dark:bg-gray-800 rounded mx-auto w-1/2 animate-pulse"></div>
          </div>
          <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900/40 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md h-[400px] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-[var(--ifm-color-primary)] animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  const badgeClass =
    categoryColors[algo.category] ||
    "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800";

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-gray-950 dark:via-gray-900/20 dark:to-gray-950">
      {/* Decorative Blur Vectors */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/[0.03] dark:bg-indigo-500/[0.02] blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header Block Typography */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 dark:bg-blue-400/5 border border-blue-500/10 dark:border-blue-400/10 text-[var(--ifm-color-primary)] dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            Daily Asynchronous Routine
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Algorithm of the <span className="bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 bg-clip-text text-transparent">Day</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            Keep your problem-solving skills sharp. Expand your paradigm comfort zone by mastering one data layout execution every 24 hours.
          </p>
        </div>

        {/* Core Dashboard Card Canvas */}
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-900/40 backdrop-blur-md rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-none transition-all duration-300 group overflow-hidden">
          
          {/* Top Gradient Edge Accent Accent Bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[var(--ifm-color-primary)] via-indigo-500 to-purple-500" />

          <div className="p-6 sm:p-10 lg:p-12">
            
            {/* Top Row Meta Options Layout */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-slate-100 dark:border-slate-800/60 pb-6">
              <span className={`text-xs font-extrabold px-3 py-1.5 rounded-lg border tracking-wide uppercase ${badgeClass}`}>
                {algo.category}
              </span>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-gray-400 bg-slate-50 dark:bg-gray-800/40 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800/40">
                <FiCalendar className="text-slate-400 dark:text-gray-500 w-3.5 h-3.5" />
                {formattedDate || "Active Instance"}
              </div>
            </div>

            {/* Content Layout Grid Matrix splitting text blocks from metrics values */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-8">
              
              {/* Algorithm Core Text Description Column Block */}
              <div className="lg:col-span-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200">
                  {algo.name}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                  {algo.description}
                </p>
              </div>

              {/* Complexity Metrics Quick Read Data Column Block */}
              <div className="bg-slate-50/50 dark:bg-gray-950/40 rounded-xl border border-slate-200/50 dark:border-slate-800/40 p-5 lg:p-6 w-full">
                <h4 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FiTrendingUp className="w-4 h-4 text-[var(--ifm-color-primary)]" />
                  Asymptotic Complexity
                </h4>
                
                <div className="flex flex-col gap-3.5">
                  {[
                    { label: "Best Case", value: algo.timeComplexity.best, color: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/[0.03] dark:bg-emerald-400/[0.02]" },
                    { label: "Average Case", value: algo.timeComplexity.average, color: "text-blue-600 dark:text-blue-400 bg-blue-500/[0.03] dark:bg-blue-400/[0.02]" },
                    { label: "Worst Case", value: algo.timeComplexity.worst, color: "text-rose-600 dark:text-rose-400 bg-rose-500/[0.03] dark:bg-rose-400/[0.02]" },
                    { label: "Space Bounds", value: algo.spaceComplexity, color: "text-purple-600 dark:text-purple-400 bg-purple-500/[0.03] dark:bg-purple-400/[0.02]" }
                  ].map((item, idx) => (
                    <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border border-slate-200/60 dark:border-slate-800/60 shadow-sm bg-white dark:bg-gray-900 ${item.color}`}>
                      <span className="text-xs font-bold text-slate-500 dark:text-gray-400">{item.label}</span>
                      <span className="font-mono text-sm font-black tracking-tight">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Execution Controls Action Elements */}
            <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800/40">
              <Link
                to={algo.docLink}
                className="
                  inline-flex items-center gap-2 
                  bg-slate-900 hover:bg-slate-800 
                  dark:bg-[var(--ifm-color-primary)] dark:hover:bg-blue-600 
                  text-white text-xs sm:text-sm
                  font-bold px-6 py-3 rounded-xl 
                  transition-all duration-200 shadow-sm hover:shadow-md
                  no-underline hover:no-underline hover:text-white
                "
              >
                Deep Dive Reference Solutions
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AlgorithmOfTheDaySection;