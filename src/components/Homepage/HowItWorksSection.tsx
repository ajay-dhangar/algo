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
        className="h-12 w-12 text-indigo-500 dark:text-yellow-400"
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
        className="h-12 w-12 text-indigo-500 dark:text-yellow-400"
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
        className="h-12 w-12 text-indigo-500 dark:text-yellow-400"
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
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">
            How{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
         <p className="mt-5 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Follow these three simple steps to start learning,
            implementing, and contributing.
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative overflow-hidden flex flex-col items-center text-center
                bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border border-gray-200 dark:border-gray-700
                p-8 rounded-2xl shadow-md
                transition-all duration-500 ease-out hover:-translate-y-3
                hover:shadow-2xl hover:border-indigo-500/40 cursor-pointer "
            >
              <div
                className="absolute top-4 right-4
                  text-6xl font-bold text-gray-100 dark:text-gray-700
                  transition-all duration-500 group-hover:scale-110"
              >0{index + 1} </div>
              <div
                className="relative z-10 mb-6 text-5xl
                  transition-all duration-500 group-hover:scale-110 group-hover:rotate-6"
              >
                {step.icon}
              </div>
              <h3
                className="relative z-10 text-2xl font-bold text-gray-800 dark:text-white
                  mb-4 transition-colors duration-300 group-hover:text-indigo-500"
              >
                {step.title}
              </h3>
              <p
                className="relative z-10 text-gray-600 dark:text-gray-400 leading-relaxed
                  transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300"
              >
                {step.description}
              </p>
              <div
                className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 group-hover:w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;