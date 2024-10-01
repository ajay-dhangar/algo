import React from "react";
import { FaCode, FaGithub, FaBrain, FaUsers } from "react-icons/fa";

const features = [
  {
    icon: <FaCode className="text-blue-600 dark:text-blue-400 w-12 h-12" />,
    title: "Comprehensive Algorithms",
    description:
      "Explore a wide variety of algorithms with detailed explanations, pseudocode, and implementation in multiple programming languages.",
  },
  {
    icon: <FaGithub className="text-green-600 dark:text-green-400 w-12 h-12" />,
    title: "Open Source Collaboration",
    description:
      "Contribute to open source projects and improve your problem-solving skills by working with developers from around the globe.",
  },
  {
    icon: <FaBrain className="text-yellow-600 dark:text-yellow-400 w-12 h-12" />,
    title: "Learning by Doing",
    description:
      "Practice your skills with real-world coding challenges, ensuring a hands-on learning experience to deepen your understanding.",
  },
  {
    icon: <FaUsers className="text-purple-600 dark:text-purple-400 w-12 h-12" />,
    title: "Community Support",
    description:
      "Join a community of developers eager to help you succeed. Get help, feedback, and mentorship as you contribute and learn.",
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12">
          Key Features
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12">
          Explore the key features that make this project a valuable resource for
          developers, students, and open source contributors.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;