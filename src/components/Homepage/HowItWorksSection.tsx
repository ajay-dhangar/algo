import React from "react";

const steps = [
  {
    number: "1",
    title: "Choose an Algorithm",
    description:
      "Browse through our extensive list of algorithms. Each algorithm has detailed information and examples.",
  },
  {
    number: "2",
    title: "Read the Explanation",
    description:
      "Read through the explanation and understand the logic behind the algorithm. Pseudocode is also available for your reference.",
  },
  {
    number: "3",
    title: "Implement in Your Preferred Language",
    description:
      "Choose your preferred programming language and view the implementation. You can also try coding the algorithm yourself.",
  },
  {
    number: "4",
    title: "Test Your Knowledge",
    description:
      "Take quizzes and solve challenges related to the algorithm to reinforce your understanding and improve your coding skills.",
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12">
          How It Works
        </h2>

        {/* Steps List */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300"
            >
              <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                {step.number}
              </h3>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300">
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