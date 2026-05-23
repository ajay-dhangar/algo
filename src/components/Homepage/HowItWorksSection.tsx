import React from "react";
import { FiSearch, FiSliders, FiGitMerge } from "react-icons/fi";

interface Step {
  stepNumber: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: Step[] = [
  {
    stepNumber: "01",
    title: "Filter Paradigms",
    description: "Query our comprehensive core catalog by space-time complexity bounds, structural data types, or specific pattern archetypes.",
    icon: FiSearch,
  },
  {
    stepNumber: "02",
    title: "Analyze Runtime Traces",
    description: "Evaluate highly optimized compiler outputs alongside interactive, AST-driven visual execution walkthroughs.",
    icon: FiSliders,
  },
  {
    stepNumber: "03",
    title: "Optimize & Push Core",
    description: "Refactor edge cases, append unit test vectors, and execute regression pipelines back to our open-source codebase.",
    icon: FiGitMerge,
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-white dark:bg-gray-950">
      {/* Decorative Structural Glow Elements */}
      <div className="absolute top-12 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-blue-500/[0.03] dark:bg-blue-500/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-12 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.03] dark:bg-indigo-500/[0.02] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Typography Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/5 dark:bg-indigo-950/40 border border-indigo-500/10 dark:border-indigo-900/30 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-4">
            System Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            The Learning <span className="bg-gradient-to-r from-[var(--ifm-color-primary)] via-indigo-500 to-purple-600 bg-clip-text text-transparent">Workflow</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A linear, engineering-grade pipeline designed to advance your mental models from abstract pseudocode to stable production implementations.
          </p>
        </div>

        {/* Process Flow Interactive Grid Track */}
        <div className="relative">
          {/* Horizontal Progress Connection Vector Line (Desktop viewports only) */}
          <div 
            className="hidden lg:block absolute top-[44px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-slate-100 via-indigo-100 to-slate-100 dark:from-gray-900 dark:via-indigo-950/50 dark:to-gray-900 -z-10" 
            aria-hidden="true"
          />

          {/* Dynamic Responsive Columns Layout */}
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <div
                  key={index}
                  className="
                    group relative flex flex-col justify-between
                    bg-slate-50/50 dark:bg-gray-900/20 
                    backdrop-blur-sm 
                    border border-slate-200/60 dark:border-slate-800/60
                    p-6 sm:p-8 rounded-2xl 
                    shadow-sm hover:shadow-xl hover:shadow-slate-100/50 dark:hover:shadow-none
                    transition-all duration-300 ease-out
                    hover:-translate-y-1.5 select-none
                  "
                >
                  <div>
                    {/* Header Controls Layout Block */}
                    <div className="flex items-center justify-between mb-8">
                      {/* Metric Node Box */}
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-gray-900 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-[var(--ifm-color-primary)] group-hover:text-white group-hover:border-transparent shadow-sm">
                        <IconComponent className="h-5 w-5 stroke-[2]" />
                      </div>
                      {/* Positional Sequence Counter */}
                      <span className="font-mono text-3xl sm:text-4xl font-black tracking-tighter text-slate-200 dark:text-slate-800/60 select-none transition-colors duration-300 group-hover:text-[var(--ifm-color-primary)]/40">
                        {step.stepNumber}
                      </span>
                    </div>

                    {/* Step Structural Text Nodes */}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight transition-colors duration-200 group-hover:text-[var(--ifm-color-primary)]">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Corner Accent Graphic Lines */}
                  <div className="absolute top-0 right-0 h-16 w-16 pointer-events-none overflow-hidden rounded-tr-2xl">
                    <div className="absolute top-0 right-0 h-[2px] w-0 bg-[var(--ifm-color-primary)] transition-all duration-300 ease-out group-hover:w-full" />
                    <div className="absolute top-0 right-0 h-0 w-[2px] bg-[var(--ifm-color-primary)] transition-all duration-300 ease-out group-hover:h-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default HowItWorksSection;