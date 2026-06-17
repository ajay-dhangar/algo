const challengeData = [
  {
    title: "Challenge 1: Data Structures-1",
    description:
      "Solve the problem within 30 minutes to earn points and rank up.",
    timeLimit: "30 min",
    link: "/challenges/challenge1",
  },
  {
    title: "Challenge 2: Data Structures-2",
    description:
      "Solve this challenging problem within 30 minutes to earn even more points!",
    timeLimit: "30 min",
    link: "/challenges/challenge2",
  },
  {
    title: "Challenge 3: Advanced Data Structures",
    description:
      "Solve this challenging problem within 60 minutes to earn even more points!",
    timeLimit: "60 min",
    link: "/challenges/challenge3",
  },
 {
    title: "Tree Traversals (Inorder, Preorder, Postorder)",
    description:
      "Return all three traversals of a binary tree. Great entry point into recursive tree thinking.",
    timeLimit: "20 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Easy",
    link: "/challenges/Trees/tree-traversals",
  },
  {
    title: "Maximum Depth of Binary Tree",
    description:
      "Find the length of the longest root-to-leaf path using elegant recursion.",
    timeLimit: "15 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Easy",
    link: "/challenges/Trees/maximum-depth-binary-tree",
  },
  {
    title: "Count Leaf Nodes",
    description:
      "Count all nodes with no children — a clean exercise in base-case thinking.",
    timeLimit: "15 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Easy",
    link: "/challenges/Trees/count-leaf-nodes",
  },
  {
    title: "Sum of All Nodes",
    description:
      "Compute the sum of every node value in the binary tree recursively.",
    timeLimit: "15 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Easy",
    link: "/challenges/Trees/sum-of-all-nodes",
  },
  {
    title: "Symmetric Tree",
    description:
      "Determine whether a binary tree is a mirror image of itself.",
    timeLimit: "15 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Easy",
    link: "/challenges/Trees/symmetric-tree",
  },
  // ─── Trees: Medium ──────────────────────────────────────────────────────
  {
    title: "Level Order Traversal",
    description:
      "Traverse a binary tree level by level using BFS — a classic queue-based challenge.",
    timeLimit: "25 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Medium",
    link: "/challenges/Trees/level-order-traversal",
  },
  {
    title: "Lowest Common Ancestor",
    description:
      "Find the deepest node that is a common ancestor of two given nodes.",
    timeLimit: "30 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Medium",
    link: "/challenges/Trees/lowest-common-ancestor",
  },
  {
    title: "Validate Binary Search Tree",
    description:
      "Verify that a binary tree satisfies all BST properties using bounds propagation.",
    timeLimit: "25 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Medium",
    link: "/challenges/Trees/validate-binary-search-tree",
  },
  {
    title: "Diameter of Binary Tree",
    description:
      "Find the longest path (in edges) between any two nodes in the tree.",
    timeLimit: "25 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Medium",
    link: "/challenges/Trees/diameter-binary-tree",
  },
  {
    title: "Left View / Right View of Binary Tree",
    description:
      "Return the first and last visible node at every level of the tree.",
    timeLimit: "25 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Medium",
    link: "/challenges/Trees/left-right-view-binary-tree",
  },
  // ─── Trees: Hard ────────────────────────────────────────────────────────
  {
    title: "Serialize and Deserialize Binary Tree",
    description:
      "Design an encode/decode scheme so any tree can be stored and fully reconstructed.",
    timeLimit: "45 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Hard",
    link: "/challenges/Trees/serialize-deserialize-binary-tree",
  },
  {
    title: "Vertical Order Traversal",
    description:
      "Group tree nodes by column position, breaking ties by row then value.",
    timeLimit: "40 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Hard",
    link: "/challenges/Trees/vertical-order-traversal",
  },
  {
    title: "Construct Tree from Traversal Arrays",
    description:
      "Rebuild a unique binary tree given its preorder and inorder traversals.",
    timeLimit: "45 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Hard",
    link: "/challenges/Trees/construct-tree-from-traversals",
  },
  {
    title: "Binary Tree Maximum Path Sum",
    description:
      "Find the highest-sum path between any two nodes — negative values make it tricky.",
    timeLimit: "45 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Hard",
    link: "/challenges/Trees/binary-tree-max-path-sum",
  },
  {
    title: "Recover Binary Search Tree",
    description:
      "Two BST nodes were swapped by mistake. Restore the tree in O(n) time.",
    timeLimit: "50 min",
    category: "Trees",
    tags: ["Trees"],
    difficulty: "Hard",
    link: "/challenges/Trees/recover-binary-search-tree",
  },
   // ─── Graphs: Easy ───────────────────────────────────────────────────────
  {
    title: "Graph Representation (Adjacency List & Matrix)",
    description:
      "Build both the adjacency list and adjacency matrix from a list of edges.",
    timeLimit: "15 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Easy",
    link: "/challenges/Graphs/graph-representation",
  },
  {
    title: "Depth First Search (DFS)",
    description:
      "Traverse a graph as deep as possible along each branch before backtracking.",
    timeLimit: "20 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Easy",
    link: "/challenges/Graphs/depth-first-search",
  },
  {
    title: "Breadth First Search (BFS)",
    description:
      "Traverse a graph level by level using a queue — the foundation for shortest paths.",
    timeLimit: "20 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Easy",
    link: "/challenges/Graphs/breadth-first-search",
  },
  {
    title: "Number of Connected Components",
    description:
      "Count how many separate connected components exist in an undirected graph.",
    timeLimit: "20 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Easy",
    link: "/challenges/Graphs/number-of-connected-components",
  },
  {
    title: "Find Path Between Two Nodes",
    description:
      "Determine whether a path exists between two vertices and reconstruct it.",
    timeLimit: "20 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Easy",
    link: "/challenges/Graphs/find-path-between-two-nodes",
  },
  // ─── Graphs: Medium ─────────────────────────────────────────────────────
  {
    title: "Detect Cycle in an Undirected Graph",
    description:
      "Use DFS with parent-tracking to determine if an undirected graph has a cycle.",
    timeLimit: "25 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Medium",
    link: "/challenges/Graphs/detect-cycle-undirected-graph",
  },
  {
    title: "Detect Cycle in a Directed Graph",
    description:
      "Use three-color DFS state tracking to detect cycles in a directed graph.",
    timeLimit: "25 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Medium",
    link: "/challenges/Graphs/detect-cycle-directed-graph",
  },
  {
    title: "Topological Sort",
    description:
      "Order the vertices of a DAG so every directed edge points forward in the order.",
    timeLimit: "30 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Medium",
    link: "/challenges/Graphs/topological-sort",
  },
  {
    title: "Bipartite Graph Check",
    description:
      "Determine whether a graph's vertices can be 2-colored with no same-color edges.",
    timeLimit: "25 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Medium",
    link: "/challenges/Graphs/bipartite-graph-check",
  },
  {
    title: "Shortest Path in Unweighted Graph",
    description:
      "Compute shortest distances from a source using BFS on an unweighted graph.",
    timeLimit: "25 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Medium",
    link: "/challenges/Graphs/shortest-path-unweighted-graph",
  },
  // ─── Graphs: Hard ───────────────────────────────────────────────────────
  {
    title: "Dijkstra's Algorithm",
    description:
      "Find shortest paths from a source in a weighted graph with non-negative weights.",
    timeLimit: "35 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Hard",
    link: "/challenges/Graphs/dijkstras-algorithm",
  },
  {
    title: "Bellman-Ford Algorithm",
    description:
      "Compute shortest paths even with negative edge weights, and detect negative cycles.",
    timeLimit: "35 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Hard",
    link: "/challenges/Graphs/bellman-ford-algorithm",
  },
  {
    title: "Floyd-Warshall Algorithm",
    description:
      "Compute shortest paths between every pair of vertices using dynamic programming.",
    timeLimit: "35 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Hard",
    link: "/challenges/Graphs/floyd-warshall-algorithm",
  },
  {
    title: "Minimum Spanning Tree (Kruskal's & Prim's)",
    description:
      "Find the minimum-weight set of edges connecting all vertices using Kruskal's algorithm.",
    timeLimit: "40 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Hard",
    link: "/challenges/Graphs/minimum-spanning-tree",
  },
  {
    title: "Strongly Connected Components (Kosaraju/Tarjan)",
    description:
      "Find all maximal sets of mutually reachable vertices using Kosaraju's two-pass DFS.",
    timeLimit: "40 min",
    category: "Graphs",
    tags: ["Graphs"],
    difficulty: "Hard",
    link: "/challenges/Graphs/strongly-connected-components",
  },
];

export default challengeData;
