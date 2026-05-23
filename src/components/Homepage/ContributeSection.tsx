import React from "react";
import { 
  FaGithub, 
  FaCodeBranch, 
  FaFileCode, 
  FaArrowRight, 
  FaBookOpen,
  FaCheckCircle
} from "react-icons/fa";

interface ContributionStep {
  icon: React.ReactElement;
  stepNumber: string;
  title: string;
  description: string;
  link?: string;
  actionText?: string;
  badgeText?: string;
}

const ContributeSection: React.FC = () => {
  const contributions: ContributionStep[] = [
    {
      icon: <FaGithub />,
      stepNumber: "01",
      title: "Fork the Repository",
      description: "Create a personal copy of the code ecosystem under your GitHub profile to freely implement, test, and sand-box your algorithmic configurations.",
      link: "https://github.com/ajay-dhangar/algo/fork",
      actionText: "Fork Repository",
    },
    {
      icon: <FaCodeBranch />,
      stepNumber: "02",
      title: "Create a Feature Branch",
      description: "Isolate your changes inside a isolated development branch. Keeping your system commits separated ensures a clean, predictable merge hierarchy.",
      badgeText: "Local Setup",
    },
    {
      icon: <FaFileCode />,
      stepNumber: "03",
      title: "Submit a Pull Request",
      description: "Open a upstream PR. Our automated continuous integration runners and core reviewers will analyze your structures for integration.",
      badgeText: "Review Phase",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white via-slate-50/40 to-white dark:from-gray-950 dark:via-gray-900/30 dark:to-gray-950">
      
      {/* Decorative High-Tech Mesh Overlay and Ambient Light Flares */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-10 -z-10 h-96 w-96 rounded-full bg-blue-500/5 blur-[100px] dark:bg-blue-500/10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-[100px] dark:bg-indigo-500/10 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Component Title & Subtitle Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30 text-xs font-bold text-[var(--ifm-color-primary)] uppercase tracking-wider mb-4">
            Open Source Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Want to <span className="text-[var(--ifm-color-primary)] bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 bg-clip-text text-transparent">Contribute?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Join an engineering community building clear, accessible computer science infrastructure. We welcome feature builds, runtime optimization, and refined algorithm indexing.
          </p>
        </div>

        {/* 3-Column Pipeline Component Grid Layout */}
        <div className="grid gap-8 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch relative">
          {contributions.map((item, index) => (
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
                hover:-translate-y-1.5
              "
            >
              <div>
                {/* Header Row: Structural Card Icons & Step Counter Labels */}
                <div className="flex items-center justify-between mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-slate-50 dark:bg-gray-800/60 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700/50 transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-[var(--ifm-color-primary)] group-hover:text-white group-hover:border-transparent">
                    {React.cloneElement(item.icon, { className: "h-5 w-5 sm:h-6 sm:w-6" })}
                  </div>
                  <span className="text-3xl font-black font-mono tracking-tight text-slate-200 dark:text-slate-800 transition-colors duration-300 group-hover:text-[var(--ifm-color-primary)]/20">
                    {item.stepNumber}
                  </span>
                </div>

                {/* Main Descriptive Card Typography */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-[var(--ifm-color-primary)] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Dynamic Bottom Context Footer Frame Panel */}
              <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between min-h-[40px]">
                {item.link && item.actionText ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--ifm-color-primary)] no-underline hover:underline group/link"
                  >
                    <span>{item.actionText}</span>
                    <FaArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-slate-400 dark:text-slate-500 uppercase">
                    <FaCheckCircle className="h-3 w-3 text-slate-300 dark:text-slate-700" />
                    <span>{item.badgeText}</span>
                  </div>
                )}
              </div>

              {/* Base Color Accent Dynamic Focus Bars */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[var(--ifm-color-primary)] to-indigo-500 transition-all duration-300 ease-out group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Global Action Anchors Segment Footer Control Cluster */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-none mx-auto">
          <a
            href="https://github.com/ajay-dhangar/algo"
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full sm:w-auto inline-flex items-center justify-center gap-2.5
              bg-[var(--ifm-color-primary)] hover:bg-slate-900 dark:hover:bg-indigo-600
              text-white font-bold px-8 py-4 rounded-xl text-base shadow-lg
              shadow-indigo-500/10 hover:shadow-xl hover:shadow-indigo-500/20
              transition-all duration-200 no-underline hover:no-underline hover:text-white
            "
          >
            <FaGithub className="text-xl" />
            <span>Explore the Repository</span>
          </a>

          <a
            href="https://github.com/ajay-dhangar/algo/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-full sm:w-auto inline-flex items-center justify-center gap-2.5
              bg-white hover:bg-slate-50 dark:bg-gray-900 dark:hover:bg-gray-800/80
              text-slate-700 dark:text-slate-200 font-bold px-8 py-4 rounded-xl text-base
              border border-slate-200 dark:border-slate-800
              transition-all duration-200 shadow-sm no-underline hover:no-underline
            "
          >
            <FaBookOpen className="text-base text-slate-400 dark:text-slate-500" />
            <span>Read Contribution Guide</span>
          </a>
        </div>
        
      </div>
    </section>
  );
};

export default ContributeSection;