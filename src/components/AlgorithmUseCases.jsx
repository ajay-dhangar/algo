import React, { useState } from "react";

const algorithmData = {
  "Binary Search": {
    applications: [
      "Search engines",
      "Database indexing",
      "Dictionary search",
    ],

    description:
      "Binary Search is used to quickly find elements in sorted data. It reduces search time by repeatedly dividing the search space into halves.",

    steps: [
      "Find the middle element",
      "Compare target with middle value",
      "Move left or right accordingly",
      "Repeat until element is found",
    ],
  },

  "Merge Sort": {
    applications: [
      "Big data processing",
      "External sorting",
      "Stable sorting systems",
    ],

    description:
      "Merge Sort is commonly used in large-scale data processing because of its stable and consistent performance on large datasets.",

    steps: [
      "Divide array into smaller halves",
      "Recursively sort both halves",
      "Merge sorted halves together",
      "Repeat until fully sorted",
    ],
  },

  "Bubble Sort": {
    applications: [
      "Educational purposes",
      "Small datasets",
      "Beginner learning",
    ],

    description:
      "Bubble Sort is mainly used for learning sorting concepts because of its simple implementation and easy visualization.",

    steps: [
      "Compare adjacent elements",
      "Swap if elements are in wrong order",
      "Move largest element to the end",
      "Repeat until array becomes sorted",
    ],
  },

  "Quick Sort": {
    applications: [
      "Fast in-memory sorting",
      "Programming libraries",
      "Competitive programming",
    ],

    description:
      "Quick Sort is widely used because of its fast average performance and efficient divide-and-conquer approach.",

    steps: [
      "Choose a pivot element",
      "Partition elements around pivot",
      "Recursively sort left side",
      "Recursively sort right side",
    ],
  },

  DFS: {
    applications: [
      "Maze solving",
      "Path finding",
      "Graph traversal",
    ],

    description:
      "Depth First Search explores nodes deeply before backtracking and is useful in graph traversal and path exploration.",

    steps: [
      "Start from root node",
      "Visit adjacent unvisited node",
      "Move deeper recursively",
      "Backtrack when needed",
    ],
  },

  BFS: {
    applications: [
      "Shortest path in graphs",
      "Social network connections",
      "Web crawling",
    ],

    description:
      "Breadth First Search explores level by level and helps find shortest paths in unweighted graphs.",

    steps: [
      "Start from source node",
      "Visit all neighboring nodes",
      "Add neighbors into queue",
      "Repeat level-by-level",
    ],
  },

  "Dijkstra Algorithm": {
    applications: [
      "Google Maps",
      "GPS navigation",
      "Network routing",
    ],

    description:
      "Dijkstra Algorithm is used to calculate shortest paths efficiently in weighted graphs.",

    steps: [
      "Start from source node",
      "Assign shortest tentative distance",
      "Visit nearest unvisited node",
      "Update neighboring distances",
    ],
  },

  Stack: {
    applications: [
      "Undo feature",
      "Expression evaluation",
      "Browser history",
    ],

    description:
      "Stack follows LIFO order and is commonly used in recursion, browser history, and undo operations.",

    steps: [
      "Push elements into stack",
      "Access top element",
      "Pop top element when needed",
      "Repeat operations in LIFO order",
    ],
  },

  Queue: {
    applications: [
      "CPU scheduling",
      "Printer queue",
      "Task processing",
    ],

    description:
      "Queue follows FIFO order and is widely used in scheduling and resource-sharing systems.",

    steps: [
      "Insert element at rear",
      "Process front element",
      "Remove processed element",
      "Continue in FIFO order",
    ],
  },

  "Linked List": {
    applications: [
      "Music playlists",
      "Memory management",
      "Dynamic data storage",
    ],

    description:
      "Linked Lists allow dynamic memory allocation and flexible insertion or deletion of elements.",

    steps: [
      "Create nodes dynamically",
      "Connect nodes using pointers",
      "Traverse node-by-node",
      "Insert or delete efficiently",
    ],
  },

  Recursion: {
    applications: [
      "Tree traversal",
      "Backtracking problems",
      "Divide and conquer algorithms",
    ],

    description:
      "Recursion solves problems by repeatedly calling the same function with smaller inputs.",

    steps: [
      "Define base condition",
      "Call function recursively",
      "Reduce problem size",
      "Return result after base case",
    ],
  },

  "Dynamic Programming": {
    applications: [
      "Optimization problems",
      "Game development",
      "Resource management",
    ],

    description:
      "Dynamic Programming stores previously computed results to optimize complex recursive problems.",

    steps: [
      "Break problem into subproblems",
      "Store computed results",
      "Reuse stored values",
      "Build final optimized solution",
    ],
  },
};

function AlgorithmUseCases() {
  const [selected, setSelected] = useState(
  Object.keys(algorithmData)[0]
);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
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
          flexDirection: "column",
          gap: "15px",
          minWidth: "220px",
        }}
      >
        {Object.keys(algorithmData).map((algo) => (
          <button
            key={algo}
            onClick={() => setSelected(algo)}
            aria-pressed={selected === algo}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "12px",
              background:
  selected === algo
    ? "var(--ifm-color-primary-dark)"
    : "var(--ifm-color-primary)",
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

      <div style={{ flex: 1, minWidth: "300px" }}>
        <h1>{selected}</h1>

        <h3>Real-World Applications</h3>

        <ul>
          {algorithmData[selected].applications.map(
            (item, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "10px",
                  lineHeight: "1.7",
                }}
              >
                {item}
              </li>
            )
          )}
        </ul>

        <p
          style={{
            marginTop: "20px",
            lineHeight: "1.8",
            color: "#444",
          }}
        >
          {algorithmData[selected].description}
        </p>

        <h3 style={{ marginTop: "30px" }}>
          Step-by-Step Explanation
        </h3>

        <ol>
          {algorithmData[selected].steps.map(
            (step, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "12px",
                  lineHeight: "1.7",
                }}
              >
                {step}
              </li>
            )
          )}
        </ol>
      </div>
    </div>
  );
}

export default AlgorithmUseCases;