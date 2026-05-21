import React from "react";

interface Step {
  title: string;
  description: string;
  icon: JSX.Element;
}

const steps: Step[] = [
  {
    title: "1. Choose Your Algorithm",
    description:
      "Select the algorithm you want to learn or implement from our vast library of options.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16h8M8 12h8M8 8h8M8 4h8M6 4h2M6 16h2M6 12h2M6 8h2"
        />
      </svg>
    ),
  },
  {
    title: "2. Study the Solution",
    description:
      "Explore detailed solutions with multiple languages, complexity analysis, and interactive visuals.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7-5 7 5-7 5-7-5zm0 8l7-5 7 5-7 5-7-5z"
        />
      </svg>
    ),
  },
  {
    title: "3. Implement & Contribute",
    description:
      "Write your own solutions, test them, and contribute back to the community through open-source.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 transition-colors duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v16m8-8H4"
        />
      </svg>
    ),
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            How{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Follow these three simple steps to start learning, implementing, and contributing.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-indigo-100 via-purple-200 to-indigo-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />

          <div className="absolute left-12 top-10 bottom-10 w-0.5 bg-gradient-to-b from-indigo-100 via-purple-200 to-indigo-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 md:hidden" />

          <div className="grid gap-12 md:grid-cols-3 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group flex flex-col items-start md:items-center text-left md:text-center pl-24 pr-4 md:p-0 relative"
              >
                <div className="absolute left-2 md:left-auto md:relative flex items-center justify-center w-20 h-20 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-slate-950 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all duration-300 group-hover:scale-110 group-hover:border-indigo-500 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white">
                  {step.icon}
                </div>

                <div className="mt-1 md:mt-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
