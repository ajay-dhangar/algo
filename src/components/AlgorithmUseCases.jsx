import React, { useState } from "react";
import { motion } from "framer-motion";

const algorithmData = {
  "Binary Search": {
    uses: [
      "Search engines",
      "Database indexing",
      "Dictionary search",
    ],
    description:
      "Binary Search is used to quickly find elements in sorted data. Companies use this algorithm in search engines, databases, and applications where fast searching is important. For example, when you search for a contact in a sorted phonebook or look up a word in a dictionary, Binary Search helps reduce the search time significantly.",
  },

  "Merge Sort": {
    uses: [
      "Big data processing",
      "External sorting",
      "Stable sorting systems",
    ],
    description:
      "Merge Sort is commonly used in systems that process huge amounts of data. It is useful in big data applications, external storage sorting, and stable sorting systems where maintaining the original order of equal elements is important. Companies handling large datasets often prefer Merge Sort because of its consistent performance.",
  },

  "Bubble Sort": {
    uses: [
      "Educational purposes",
      "Small datasets",
      "Beginner learning",
    ],
    description:
      "Bubble Sort is mainly used for teaching sorting concepts because of its simplicity and easy implementation. Although it is not efficient for large datasets, it helps beginners understand how sorting algorithms work step by step.",
  },

  "Quick Sort": {
    uses: [
      "Fast in-memory sorting",
      "Programming libraries",
      "Competitive programming",
    ],
    description:
      "Quick Sort is one of the fastest sorting algorithms used in real-world software systems and programming libraries. It is widely used in competitive programming and applications where quick data sorting is required.",
  },

  DFS: {
    uses: [
      "Maze solving",
      "Path finding",
      "Graph traversal",
    ],
    description:
      "Depth First Search (DFS) is used in graph traversal and path-finding applications. It is commonly used in maze solving, game development, and exploring connected systems such as social networks or websites.",
  },

  BFS: {
    uses: [
      "Shortest path in graphs",
      "Social network connections",
      "Web crawling",
    ],
    description:
      "Breadth First Search (BFS) is used to find the shortest path in unweighted graphs. Social media platforms use BFS to suggest mutual friends, and search engines use it for web crawling and indexing pages.",
  },

  "Dijkstra Algorithm": {
    uses: [
      "Google Maps",
      "GPS navigation",
      "Network routing",
    ],
    description:
      "Dijkstra’s Algorithm is widely used in navigation systems like Google Maps and GPS applications to calculate the shortest possible route between locations. It is also used in computer networks for routing data efficiently.",
  },

  Stack: {
    uses: [
      "Undo feature",
      "Expression evaluation",
      "Browser history",
    ],
    description:
      "Stacks are used in applications that require last-in-first-out operations. Examples include undo and redo features in editors, browser history navigation, and expression evaluation in compilers.",
  },

  Queue: {
    uses: [
      "CPU scheduling",
      "Printer queue",
      "Task processing",
    ],
    description:
      "Queues are used in systems where tasks are processed in the order they arrive. Real-world examples include printer queues, CPU task scheduling, customer support systems, and ticket booking systems.",
  },

  "Linked List": {
    uses: [
      "Music playlists",
      "Memory management",
      "Dynamic data storage",
    ],
    description:
      "Linked Lists are useful when data needs dynamic memory allocation and flexible insertion or deletion. Applications include music playlists, browser navigation systems, and memory management in operating systems.",
  },

  Recursion: {
    uses: [
      "Tree traversal",
      "Backtracking problems",
      "Divide and conquer algorithms",
    ],
    description:
      "Recursion is widely used in algorithms that solve problems by dividing them into smaller subproblems. It is used in tree traversal, backtracking problems like Sudoku solving, and divide-and-conquer algorithms such as Merge Sort.",
  },

  "Dynamic Programming": {
    uses: [
      "Optimization problems",
      "Game development",
      "Resource management",
    ],
    description:
      "Dynamic Programming is used to solve complex optimization problems efficiently. It is commonly used in game development, resource management systems, shortest path problems, and AI-based decision-making systems.",
  },
};

function AlgorithmUseCases() {
  const [selected, setSelected] = useState("Binary Search");

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
<<<<<<< Updated upstream
=======
        flexWrap: "wrap",
>>>>>>> Stashed changes
        gap: "30px",
        padding: "30px",
        margin: "40px auto",
        maxWidth: "1200px",
        borderRadius: "20px",
        background: "#f8fafc",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >

      <div
        style={{
          display: "flex",
<<<<<<< Updated upstream
=======
          flexWrap: "wrap",
>>>>>>> Stashed changes
          flexDirection: "column",
          gap: "15px",
          maxHeight: "500px",
          overflowY: "auto",
          minWidth: "250px",
        }}
      >
        {Object.keys(algorithmData).map((algo) => (
          <button
            key={algo}
            onClick={() => setSelected(algo)}
<<<<<<< Updated upstream
          <button
            key={algo}
            onClick={() => setSelected(algo)}
            aria-pressed={selected === algo}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "12px",
              background:
                selected === algo ? "#1d4ed8" : "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            {algo}
          </button>
        ))}
      </div>


      
      <motion.div
  key={selected}
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.4 }}
  style={{ flex: 1 }}
>
  <h1 style={{ marginBottom: "20px" }}>
    {selected}
  </h1>

  <h3>Real-World Applications</h3>

  <ul style={{ marginTop: "15px" }}>
    {algorithmData[selected].uses.map((item, index) => (
      <li
        key={index}
        style={{
          marginBottom: "12px",
          fontSize: "16px",
        }}
      >
        {item}
      </li>
    ))}
  </ul>

  <h3 style={{ marginTop: "30px" }}>
    Real-Time Explanation
  </h3>

  <p
    style={{
      marginTop: "15px",
      lineHeight: "1.9",
      color: "#333",
      fontSize: "16px",
    }}
  >
    {algorithmData[selected].description}
  </p>
</motion.div>
</div>
  );
}
export default AlgorithmUseCases;