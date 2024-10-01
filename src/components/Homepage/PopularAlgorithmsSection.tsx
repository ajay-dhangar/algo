import React, { useState } from "react";

const algorithms = [
  {
    name: "Binary Search",
    description: "Efficiently find an item from a sorted list of items.",
    complexity: "O(log n)",
    // imageUrl: "/images/binary-search.png",
  },
  {
    name: "Quick Sort",
    description: "Sorts an array by partitioning it into smaller sub-arrays.",
    complexity: "O(n log n)",
    // imageUrl: "/images/quick-sort.png",
  },
  {
    name: "Dijkstra's Algorithm",
    description: "Finds the shortest path in a graph.",
    complexity: "O(V^2)",
    // imageUrl: "/images/dijkstra.png",
  },
  {
    name: "Merge Sort",
    description: "Divides the array into halves, sorts them, and merges them.",
    complexity: "O(n log n)",
    // imageUrl: "/images/merge-sort.png",
  },
  {
    name: "Depth-First Search (DFS)",
    description: "Explores as far as possible along each branch before backtracking.",
    complexity: "O(V + E)",
    // imageUrl: "/images/dfs.png",
  },
  {
    name: "Breadth-First Search (BFS)",
    description: "Explores all neighbors at the present depth before moving on to nodes at the next depth.",
    complexity: "O(V + E)",
    // imageUrl: "/images/bfs.png",
  },
];

const PopularAlgorithmsSection: React.FC = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState<number | null>(null);

  const toggleAlgorithm = (index: number) => {
    setActiveAlgorithm(activeAlgorithm === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-12">
          Popular Algorithms
        </h2>

        {/* Algorithms Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {algorithms.map((algorithm, index) => (
            <div
              key={algorithm.name}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
              onClick={() => toggleAlgorithm(index)}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {algorithm.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {algorithm.description}
                </p>
                {/* Show Complexity on Click */}
                {activeAlgorithm === index && (
                  <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-gray-700 dark:text-gray-200">
                      <strong>Time Complexity:</strong> {algorithm.complexity}
                    </p>
                    {/* <img
                      src={algorithm.imageUrl}
                      alt={algorithm.name}
                      className="mt-4 w-full h-auto rounded-lg"
                    /> */}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularAlgorithmsSection;
