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
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            How{" "}
            <span className="text-indigo-500 dark:text-yellow-400">
              It Works
            </span>
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Follow these three simple steps to start learning, implementing, and
            contributing.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:shadow-xl"
            >
              <div className="mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
