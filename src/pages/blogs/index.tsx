import Layout from "@theme/Layout";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTag } from "react-icons/fa";

const Blogs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [modalContent, setModalContent] = useState<string | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: "Understanding Time Complexity",
      tag: "Theory",
      summary: "Learn the basics of time complexity analysis.",
      content: `
        Time complexity is a computational concept that helps us measure the efficiency of an algorithm. It describes the amount of time an algorithm takes to run, as a function of the size of its input. This is essential when evaluating how well an algorithm scales as the input size grows.

        **Why Time Complexity Matters:**
        When designing algorithms, we are interested in how fast they can solve a problem. Time complexity provides a way to estimate the performance of an algorithm without having to test it on every possible input. A more efficient algorithm can handle larger datasets in less time, which is crucial in real-world applications like searching or sorting large amounts of data.

        **Big-O Notation:**
        Time complexity is often expressed using Big-O notation, which describes the upper bound of an algorithm's running time. This means it gives the worst-case scenario for how long an algorithm will take. Here are some common time complexities:

        - O(1) – Constant Time: The algorithm takes the same amount of time regardless of the input size. Example: Accessing an element in an array by index.
        - O(log n) – Logarithmic Time: The algorithm's runtime increases logarithmically as the input size grows. Example: Binary search in a sorted array.
        - O(n) – Linear Time: The algorithm's runtime increases linearly with the input size. Example: Iterating through an array of n elements.
        - O(n log n) – Log-Linear Time: Common in more efficient sorting algorithms like Merge Sort and Quick Sort.
        - O(n²) – Quadratic Time: The runtime increases quadratically as the input size grows. Example: Nested loops, such as in Bubble Sort.
        - O(2ⁿ) – Exponential Time: The algorithm's runtime doubles with every additional input. This is highly inefficient for large inputs. Example: Solving the Fibonacci sequence using simple recursion.

        **Practical Example:**
        Let’s consider an algorithm that checks whether a number exists in an unsorted list.
        - A linear search will scan through each element one by one until the number is found. This takes O(n) time, where n is the number of elements in the list.
        - If the list is sorted, we could use a binary search, which halves the search space with each step, making it run in O(log n) time.

        **Best, Worst, and Average Cases:**
        Time complexity analysis often considers three scenarios:
        - Best Case: The fastest execution time (e.g., the element is found at the start of the array).
        - Worst Case: The slowest execution time (e.g., the element is not in the array, so every element must be checked).
        - Average Case: The expected time based on a random input distribution.

        **Conclusion:**
        Understanding time complexity helps in choosing the best algorithm for the task. It allows us to predict how an algorithm will perform as the data grows, and it helps in optimizing code for efficiency. Time complexity analysis, along with space complexity, provides a solid foundation for building scalable, high-performance algorithms.
      `,
    },
    {
      id: 2,
      title: "Top 5 Sorting Algorithms",
      tag: "Sorting",
      summary: "Explore the most common sorting algorithms and their use cases.",
      content: `
      Sorting is a fundamental operation in computer science and programming, crucial for efficiently organizing and retrieving data. Here are the top 5 sorting algorithms you should know about:

1. Bubble Sort
Time Complexity: O(n²)
How It Works: Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. This process is repeated until the list is sorted.
Use Case: Though simple, it's inefficient for large datasets. Best used when the input list is small or nearly sorted.

2. Selection Sort
Time Complexity: O(n²)
How It Works: Selection Sort divides the list into a sorted and unsorted section. It repeatedly selects the smallest (or largest) element from the unsorted section and moves it to the end of the sorted section.
Use Case: Good for small lists, but inefficient for larger datasets due to its quadratic time complexity.

3. Insertion Sort
Time Complexity: O(n²) in the worst case, but O(n) when nearly sorted
How It Works: Insertion Sort builds the sorted list one element at a time. It takes each element and inserts it into its correct position within the sorted part of the array.
Use Case: Best used when the dataset is small or mostly sorted. It performs well for real-time applications like sorting cards by hand.

4. Merge Sort
Time Complexity: O(n log n)
How It Works: Merge Sort is a divide-and-conquer algorithm. It splits the list into smaller sublists, sorts them, and then merges them back together. It guarantees a consistent time complexity of O(n log n).
Use Case: Great for large datasets and when stability (preserving the relative order of equal elements) is important.

5. Quick Sort
Time Complexity: O(n log n) on average, but O(n²) in the worst case
How It Works: Quick Sort also follows a divide-and-conquer approach. It selects a pivot element and partitions the array into two sub-arrays—elements smaller than the pivot go to the left, and those greater go to the right. It recursively sorts the sub-arrays.
Use Case: Quick Sort is widely used because of its efficiency on average, making it one of the fastest sorting algorithms. It’s not stable but is highly efficient for large datasets.

Conclusion:
These five sorting algorithms represent a range of efficiency and use cases. Algorithms like Merge Sort and Quick Sort offer better performance for larger datasets, while Bubble Sort, Selection Sort, and Insertion Sort are easier to implement and suitable for smaller, simpler datasets. Understanding these algorithms helps in optimizing the performance of data-intensive applications.
      `,
    },
    {
      id: 3,
      title: "Graph Theory Basics",
      tag: "Graphs",
      summary: "Introduction to graph theory and essential algorithms.",
      content: `
      Graph theory is a branch of mathematics and computer science that studies the properties and relationships of graphs. A graph consists of vertices (or nodes) and edges (or links) connecting these vertices. Graphs are widely used to model real-world problems such as social networks, road maps, communication systems, and more. Here’s an introduction to the key concepts in graph theory:

1. Vertices (Nodes) and Edges
Vertices (or Nodes): The fundamental units of a graph, representing entities such as people in a social network or cities in a map.
Edges: The connections between vertices, representing relationships like friendships or roads between cities.
There are two main types of graphs based on how edges connect the vertices:

Undirected Graphs: Edges have no direction, meaning the relationship between two vertices is mutual. Example: An undirected graph can represent friendships, where if A is friends with B, then B is also friends with A.
Directed Graphs (Digraphs): Edges have a direction, meaning the relationship goes one way. Example: Twitter follows, where user A may follow user B, but not necessarily vice versa.

2. Types of Graphs
Simple Graph: A graph with no loops (edges connecting a vertex to itself) or multiple edges between the same pair of vertices.
Weighted Graph: A graph where edges have weights or costs associated with them, useful for problems like finding the shortest path.
Complete Graph: A graph where every pair of distinct vertices is connected by a unique edge.
Cyclic vs Acyclic Graph: A cyclic graph contains cycles (a path where the starting and ending vertices are the same). In contrast, an acyclic graph contains no cycles. A Directed Acyclic Graph (DAG) is a key structure in many applications like task scheduling.

3. Key Graph Algorithms
Breadth-First Search (BFS):
Explores the graph level by level, starting from a given node.
Used to find the shortest path in an unweighted graph.
Time Complexity: O(V + E), where V is the number of vertices and E is the number of edges.

Depth-First Search (DFS):
Explores as far as possible along a branch before backtracking.
Useful for detecting cycles, finding connected components, and topological sorting in a DAG.
Time Complexity: O(V + E).

Dijkstra's Algorithm:
A shortest path algorithm for weighted graphs.
It finds the shortest path from a single source to all other vertices.
Time Complexity: O(V²) for the basic version and O((V + E) log V) for an optimized version using a priority queue.

Kruskal’s and Prim’s Algorithms:
These are algorithms for finding the Minimum Spanning Tree (MST), which connects all vertices in the graph with the minimum total edge weight.
Time Complexity: O(E log V).

4. Applications of Graphs
Social Networks: Modeling relationships and interactions between users.
Maps and Navigation: Finding the shortest route between locations.
Communication Networks: Designing efficient networks for data transfer.
Task Scheduling: Using Directed Acyclic Graphs (DAGs) to model tasks with dependencies (used in project management, compilation of code, etc.).

5. Connected Components
In an undirected graph, a connected component is a subset of vertices such that there is a path between any two vertices in that subset. In a directed graph, components can be strongly connected (every vertex is reachable from every other vertex in that component).

6. Graph Representations
Adjacency Matrix: A 2D array used to represent the graph. Each cell (i, j) contains 1 if there is an edge between vertices i and j, otherwise 0.
Efficient for dense graphs (many edges), but requires O(V²) space.
Adjacency List: A list of lists where each vertex has a list of adjacent vertices. This is more space-efficient for sparse graphs (few edges).

Conclusion:
Graph theory provides a powerful framework for solving a wide variety of problems in computer science. By understanding basic concepts such as vertices, edges, graph types, and key algorithms like BFS, DFS, and Dijkstra’s algorithm, you can tackle problems related to networks, shortest paths, and efficient data organization. Whether it’s social media, navigation systems, or scheduling tasks, graphs play a crucial role in modeling and solving complex real-world scenarios.
      `,
    },
    // Add more blog posts here
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag = selectedTag === "All" || post.tag === selectedTag;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  const tags = ["All", "Theory", "Sorting", "Graphs"];

  const handleReadMore = (content: string) => {
    setModalContent(content);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <Layout title="Blogs" description="Read the latest blog posts on various topics.">
      <section className="bg-gray-100 dark:bg-gray-900 py-12 px-8">
        <div className="container mx-auto">
          <motion.h1
            className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Blogs
          </motion.h1>

          <motion.div
            className="flex justify-center items-center space-x-4 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600" />
              <input
                type="text"
                placeholder="Search Blog Posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>
            <div className="relative">
              <FaTag className="absolute left-3 top-3 text-[var(--ifm-color-primary)] dark:bg-gray-700 dark:border-gray-600" />
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400"
              >
                {tags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Blog Posts List */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 capitalize">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{post.summary}</p>
                <button
                  className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 border-none"
                  onClick={() => handleReadMore(post.content)}
                >
                  Read More
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Modal */}
        {modalContent && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 mt-12">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4 relative">
      <button
        className="absolute top-2 right-2 text-gray-600 dark:text-gray-300"
        onClick={closeModal}
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Blog Content
      </h2>
      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line overflow-y-auto max-h-[70vh]">
        {modalContent}
      </div>
    </div>
  </div>
)}

      </section>
    </Layout>
  );
};

export default Blogs;
