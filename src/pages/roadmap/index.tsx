import React from "react";
import { motion } from "framer-motion";
import Layout from "@theme/Layout";

interface Milestone {
  title: string;
  description: string;
  status: "planned" | "in-progress" | "completed";
}

const milestones: Milestone[] = [
  {
    title: "AI and Machine Learning Algorithms",
    description:
      "Integrate AI and machine learning algorithms to enhance the learning experience and provide advanced problem-solving tools.",
    status: "planned",
  },
  {
    title: "Performance Benchmarking",
    description:
      "Implement performance benchmarking tools to compare different algorithm implementations across various metrics.",
    status: "in-progress",
  },
  {
    title: "Support for Additional Languages",
    description:
      "Expand support for more programming languages such as Go, Rust, and Kotlin to cater to a broader developer audience.",
    status: "planned",
  },
  {
    title: "Interactive Visualizations",
    description:
      "Develop interactive visualizations for algorithm performance and execution flow to aid in deeper understanding.",
    status: "planned",
  },
  {
    title: "Mobile Application",
    description:
      "Launch a mobile application version of Algo to provide on-the-go access to tutorials, algorithms, and contributions.",
    status: "completed",
  },
];

const Roadmap: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-500";
      case "in-progress":
        return "text-yellow-500";
      case "planned":
        return "text-blue-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Layout title="Roadmap" description="Discover the future plans and upcoming features for Algo.">
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Header Section */}
      <section className="container mx-auto py-12 px-6 md:px-12 text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Roadmap
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Discover the future plans and upcoming features for Algo.
        </motion.p>
      </section>

      {/* Roadmap Items */}
      <section className="container mx-auto py-8 px-6 md:px-12">
        <motion.div
          className="max-w-4xl mx-auto space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mr-6">
                <span
                  className={`text-3xl font-bold ${getStatusColor(
                    milestone.status
                  )}`}
                >
                  •
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">{milestone.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                <span className={`inline-block mt-2 ${getStatusColor(milestone.status)} font-medium capitalize`}>
                  {milestone.status.replace("-", " ")}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
    </Layout>
  );
};

export default Roadmap;
