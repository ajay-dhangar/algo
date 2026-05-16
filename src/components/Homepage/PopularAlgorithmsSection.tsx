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
            text-gray-600 dark:text-gray-400
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="
                group relative overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/70 dark:bg-white/5
                backdrop-blur-xl
                p-8
                shadow-lg shadow-black/5
                transition-all duration-500
                hover:shadow-2xl hover:shadow-blue-500/20
                hover:border-blue-400/40
                flex flex-col justify-between
              "
            >
              <motion.div
                className="absolute inset-0 rounded-3xl border border-transparent"
                whileHover={{
                  borderColor: "rgba(59,130,246,0.4)",
                }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10 flex flex-col h-full">
                <div>
                  <h3
                    className="
                    text-2xl font-bold mb-4
                    text-gray-900 dark:text-white
                    group-hover:text-blue-500
                    transition-colors duration-300
                  "
                  >
                    {algorithm.title}
                  </h3>

                  <p
                    className="
                    text-gray-600 dark:text-gray-300
                    leading-relaxed
                    mb-8
                  "
                  >
                    {algorithm.description}
                  </p>
                </div>

                <div className="flex justify-center mt-auto">
                  <Link
                    to={algorithm.link}
                    className="
                    inline-flex items-center justify-center
                    px-5 py-3
                    rounded-xl
                    font-medium
                    text-white
                    bg-gradient-to-r
                    from-blue-600
                    to-cyan-500
                    shadow-lg shadow-blue-500/20
                    transition-all duration-300
                    hover:scale-105
                    hover:shadow-blue-500/40
                    hover:from-blue-500
                    hover:to-cyan-400 hover:text-gray-100
                  "
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <Link
            to="/algorithms"
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