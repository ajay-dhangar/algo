import React from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link";

const PopularAlgorithmsSection: React.FC = () => {
  const algorithms = [
    {
      title: "Binary Search",
      description: "Efficient searching in a sorted array",
      link: "#",
    },
    {
      title: "Merge Sort",
      description: "Divide and conquer sorting algorithm",
      link: "#",
    },
    {
      title: "Dijkstra's Algorithm",
      description: "Shortest path in weighted graphs",
      link: "#",
    },
    {
      title: "Quick Sort",
      description: "Efficient in-place sorting algorithm",
      link: "#",
    },
    {
      title: "Linked Lists",
      description: "Nodes linked in sequence",
      link: "#",
    },
    {
      title: "Recursion",
      description: "Function calls itself for solutions",
      link: "#",
    }
  ];

  return (
    <section
      className="
      relative overflow-hidden
      py-24 px-6 bg-blue-100 
      dark:bg-gray-950"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2
            className="
            text-4xl md:text-5xl
            font-extrabold
            tracking-tight
            text-gray-900 dark:text-white
            mb-6
          "
          >
            Popular{" "}
            <span
              className="
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
              bg-clip-text
              text-transparent
            "
            >
              Algorithms
            </span>
          </h2>

          <p
            className="
            max-w-3xl mx-auto
            text-lg leading-relaxed
            text-var(--ifm-color-primary)
          "
          >
            Explore the most essential algorithms and data structures
            every developer should master for coding interviews,
            competitive programming, and real-world applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {algorithms.map((algorithm, index) => (
            <motion.div
            key={index}
            className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-2xl hover:bg-[#3b82f6] cursor-pointer group flex flex-col justify-between h-full"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }} // Scale on hover
            whileTap={{ scale: 0.95 }} // Scale down on tap
          >
            <motion.div
              className="absolute inset-0 border-2 border-transparent rounded-lg"
              initial={{ borderColor: "transparent" }}
              whileHover={{ borderColor: "#3b82f6" }} // Add blue border on hover
              transition={{ duration: 0.3 }}
            />
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white group-hover:text-white mb-4">
                  {algorithm.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 group-hover:text-slate-50">
                  {algorithm.description}
                </p>
              </div>
              <div className="flex justify-center mt-auto">
                <a
                  href={algorithm.link}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition hover:bg-blue-700 hover:text-white cursor-pointer pointer-events-auto z-10"
                >
                  Learn More
                </a>
              </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link
            to="#"
            className="
              inline-flex items-center gap-2
              px-8 py-4
              rounded-2xl
              bg-gray-900 dark:bg-white
              text-white dark:text-black
              font-semibold
              shadow-lg
              transition-all duration-300
              hover:scale-105
              hover:shadow-2xl hover : text-gray-100
            "
          >
            Explore All Algorithms
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularAlgorithmsSection;