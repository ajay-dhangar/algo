import React from "react";
import { FiZap, FiCpu, FiCompass, FiGitBranch } from "react-icons/fi";

interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const features: Feature[] = [
  {
    title: "Fast Performance",
    description: "Our algorithm solutions are thoroughly optimized for runtime execution speed, low memory overhead, and maximum complexity efficiency.",
    icon: FiZap,
  },
  {
    title: "Multiple Languages",
    description: "Explore production-ready, clean implementations available across multiple language paradigms: Python, TypeScript, Java, and C++.",
    icon: FiCpu,
  },
  {
    title: "Beginner-Friendly",
    description: "Step-by-step mathematical documentation, clear trace execution breakdowns, and clean logic flows designed for all core engineering levels.",
    icon: FiCompass,
  },
  {
    title: "Open Source Engine",
    description: "Built collaboratively worldwide. Submit pull requests, pitch runtime updates, improve test coverage metrics, and scale out with the community.",
    icon: FiGitBranch,
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50/30 dark:from-gray-950 dark:via-gray-900/40 dark:to-gray-950">
      
      {/* Structural Minimal Grid Overlays & Glow Filters */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-[var(--ifm-color-primary)]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Animated Structural Header Component */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ifm-color-primary)]/5 dark:bg-blue-950/30 border border-[var(--ifm-color-primary)]/10 dark:border-blue-900/20 text-xs font-bold text-[var(--ifm-color-primary)] uppercase tracking-wider mb-4">
            Core Infrastructure Pillars
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Why Choose <span className="text-[var(--ifm-color-primary)] bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 bg-clip-text text-transparent">Algo?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Explore the architectural features that make our platform the premium destination for code reference standards, system interview prep, and technical education.
          </p>
        </div>

        {/* Feature Highlights Grid System Layout */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div
                key={index}
                className="
                  group relative flex flex-col justify-between overflow-hidden
                  bg-white dark:bg-gray-900/40
                  backdrop-blur-md
                  border border-slate-200/80 dark:border-slate-800/80
                  p-6 sm:p-8 rounded-2xl
                  shadow-sm hover:shadow-xl hover:shadow-slate-100 dark:hover:shadow-none
                  transition-all duration-300 ease-out
                  hover:-translate-y-1.5 select-none
                "
              >
                {/* Active Interactive Ambient Dynamic Accent Frame Border Overlay */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[var(--ifm-color-primary)]/30 rounded-2xl transition-colors duration-300 pointer-events-none" />
                
                <div>
                  {/* Styled Icon Wrapper Frame Box */}
                  <div className="mb-6 inline-flex p-3.5 rounded-xl bg-slate-50 dark:bg-gray-800/50 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700/50 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-[var(--ifm-color-primary)] group-hover:text-white group-hover:border-transparent">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
                  </div>

                  {/* Core Card Content Header Title text */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200">
                    {feature.title}
                  </h3>

                  {/* Description Copy */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Animated Structural Gradient Edge Fill Underlay */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 transition-all duration-300 ease-out group-hover:w-full" />
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
};

export default FeaturesSection;