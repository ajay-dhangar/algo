import React, { useEffect, useRef, useState } from "react";

interface Step {
  title: string;
  description: string;
  icon: JSX.Element;
}

const steps: Step[] = [
  {
    title: "Choose Your Algorithm",
    description:
      "Select from our comprehensive library of algorithms across all difficulty levels and domains.",
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
    title: "Study & Practice",
    description:
      "Learn with detailed solutions, multiple implementations, and interactive visualizations.",
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
    title: "Master & Contribute",
    description:
      "Perfect your skills and give back by sharing your solutions with the community.",
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
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 relative overflow-hidden opacity-0"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 dark:bg-indigo-900/20 rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl -z-10 opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-indigo-600 dark:text-yellow-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-200 dark:border-indigo-700">
            Simple Learning Path
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            How{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-yellow-400 dark:to-yellow-500 bg-clip-text text-transparent">
              It Works
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Follow our proven three-step methodology to accelerate your learning
            and master algorithms from the ground up.
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid gap-8 md:gap-10 md:grid-cols-3 relative">
          {/* Connection lines - visible only on md and up */}
          <svg
            className="hidden md:block absolute top-1/3 left-0 w-full h-20 -z-10"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" className="text-indigo-300 dark:text-indigo-600" />
                <stop offset="50%" stopColor="currentColor" className="text-purple-300 dark:text-purple-600" />
                <stop offset="100%" stopColor="currentColor" className="text-indigo-300 dark:text-indigo-600" />
              </linearGradient>
            </defs>
            <path
              d="M 50 50 Q 300 0 600 50 T 1150 50"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="8,4"
              opacity="0.6"
            />
          </svg>

          {/* Step Cards */}
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Card Container */}
              <div
                className="relative h-full overflow-hidden rounded-3xl transition-all duration-500 ease-out
                  bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
                  shadow-lg hover:shadow-2xl
                  hover:-translate-y-2 cursor-pointer
                  p-8 md:p-10 flex flex-col"
              >
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 to-purple-50/0 dark:from-indigo-900/0 dark:to-purple-900/0 group-hover:from-indigo-50 group-hover:to-purple-50 dark:group-hover:from-indigo-900/20 dark:group-hover:to-purple-900/20 transition-all duration-500 -z-10" />

                {/* Step Number - Enhanced */}
                <div className="mb-8 relative">
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-400/10 dark:to-purple-400/10 rounded-full blur-xl transition-all duration-500 group-hover:scale-150" />
                  <span className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-yellow-400 dark:to-yellow-500 text-white dark:text-gray-900 font-bold text-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                    {index + 1}
                  </span>
                </div>

                {/* Icon - Enhanced Animation */}
                <div
                  className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 
                  transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-indigo-200 group-hover:to-purple-200 dark:group-hover:from-indigo-800/60 dark:group-hover:to-purple-800/60"
                >
                  {step.icon}
                </div>

                {/* Title */}
                <h3
                  className="text-2xl md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 
                  transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-yellow-400 line-clamp-2"
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow
                  transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                >
                  {step.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 group-hover:border-indigo-300 dark:group-hover:border-yellow-400 transition-colors duration-300">
                  <div className="flex items-center text-sm font-semibold text-indigo-600 dark:text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore more</span>
                    <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Animated Border on Hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-2 border-transparent bg-gradient-to-r from-indigo-500/30 to-purple-500/30 p-[2px] -z-20" />
              </div>

              {/* Index Label for Mobile */}
              <div className="md:hidden mt-4 text-center">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Step {index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
            Ready to master algorithms?
          </p>
          <button className="px-8 py-4 rounded-full font-semibold transition-all duration-300 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-yellow-400 dark:to-yellow-500 text-white dark:text-gray-900 hover:shadow-xl hover:scale-105 active:scale-95">
            Start Learning Now
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;
