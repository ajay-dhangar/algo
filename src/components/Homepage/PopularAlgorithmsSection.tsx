import React from "react";
import { motion } from "framer-motion";
import Link from "@docusaurus/Link"; // Importing Docusaurus Link

const PopularAlgorithmsSection: React.FC = () => {
  const algorithms = [
    {
      title: "Binary Search",
      description: "Efficient searching in a sorted array",
      link: "/docs/binary-search/iterative-binary-search-DSA", 
    },
    {
      title: "Merge Sort",
      description: "Divide and conquer sorting algorithm",
      link: "/docs/algorithms/sorting-algorithms/merge-sort-algo", 
    },
    {
      title: "Dijkstra's Algorithm",
      description: "Shortest path in weighted graphs",
      link: "/docs/graphs/shortest-path-algorithms/dijkstra", 
    },
    {
      title: "Quick Sort",
      description: "Efficient in-place sorting algorithm",
      link: "/docs/algorithms/sorting-algorithms/quick-sort-algo", 
    },
    {
      title: "Linked Lists",
      description: "Nodes linked in sequence",
      link: "/docs/category/linked-list", 
    },
    {
      title: "Recursion",
      description: "Function calls itself for solutions",
      link: "/docs/Recursion/", 
    },
  ];
  

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          Popular{" "}
          <span className="text-blue-600 dark:text-yellow-400">Algorithms</span>
        </h2>

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
                <Link
                  to={algorithm.link}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </motion.div>
          
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularAlgorithmsSection;
