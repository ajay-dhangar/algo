import React, { useState } from "react";
import styles from "./styles.module.css";

interface GraphAlgorithmInfo {
  id: string;
  name: string;
  category: "Traversal" | "Shortest Path" | "MST" | "Topological Sort" | "Connectivity" | "Advanced";
  timeComplexity: string;
  spaceComplexity: string;
  handlesNegativeWeights: boolean;
  supportsDirected: boolean;
  supportsUndirected: boolean;
  bestUseCase: string;
  docsPath: string;
}

const ALGORITHMS: GraphAlgorithmInfo[] = [
  {
    id: "bfs",
    name: "Breadth-First Search (BFS)",
    category: "Traversal",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    handlesNegativeWeights: false,
    supportsDirected: true,
    supportsUndirected: true,
    bestUseCase: "Unweighted shortest path & level-order traversal",
    docsPath: "/docs/graph-algorithms/traversals/bfs",
  },
  {
    id: "dfs",
    name: "Depth-First Search (DFS)",
    category: "Traversal",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    handlesNegativeWeights: false,
    supportsDirected: true,
    supportsUndirected: true,
    bestUseCase: "Path finding, cycle detection, topological ordering",
    docsPath: "/docs/graph-algorithms/traversals/dfs",
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    category: "Shortest Path",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    handlesNegativeWeights: false,
    supportsDirected: true,
    supportsUndirected: true,
    bestUseCase: "Single-source shortest path with non-negative edge weights",
    docsPath: "/docs/graph-algorithms/shortest-path/dijkstra",
  },
  {
    id: "bellman-ford",
    name: "Bellman-Ford Algorithm",
    category: "Shortest Path",
    timeComplexity: "O(V × E)",
    spaceComplexity: "O(V)",
    handlesNegativeWeights: true,
    supportsDirected: true,
    supportsUndirected: true,
    bestUseCase: "Shortest path with negative edge weights & negative cycle detection",
    docsPath: "/docs/graph-algorithms/shortest-path/bellman-ford",
  },
  {
    id: "floyd-warshall",
    name: "Floyd-Warshall Algorithm",
    category: "Shortest Path",
    timeComplexity: "O(V³)",
    spaceComplexity: "O(V²)",
    handlesNegativeWeights: true,
    supportsDirected: true,
    supportsUndirected: true,
    bestUseCase: "All-pairs shortest path in dense graphs",
    docsPath: "/docs/graph-algorithms/shortest-path/floyd-warshall",
  },
  {
    id: "kruskal",
    name: "Kruskal's Algorithm",
    category: "MST",
    timeComplexity: "O(E log E)",
    spaceComplexity: "O(V + E)",
    handlesNegativeWeights: true,
    supportsDirected: false,
    supportsUndirected: true,
    bestUseCase: "Minimum Spanning Tree using edge sorting & DSU",
    docsPath: "/docs/graph-algorithms/mst/kruskal",
  },
  {
    id: "prim",
    name: "Prim's Algorithm",
    category: "MST",
    timeComplexity: "O(E log V)",
    spaceComplexity: "O(V + E)",
    handlesNegativeWeights: true,
    supportsDirected: false,
    supportsUndirected: true,
    bestUseCase: "Minimum Spanning Tree for dense graphs",
    docsPath: "/docs/graph-algorithms/mst/prim",
  },
  {
    id: "topological-sort",
    name: "Topological Sort (Kahn / DFS)",
    category: "Topological Sort",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    handlesNegativeWeights: true,
    supportsDirected: true,
    supportsUndirected: false,
    bestUseCase: "Ordering vertices in Directed Acyclic Graphs (DAG)",
    docsPath: "/docs/graph-algorithms/topological-sort",
  },
  {
    id: "tarjan-scc",
    name: "Tarjan's SCC Algorithm",
    category: "Connectivity",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    handlesNegativeWeights: true,
    supportsDirected: true,
    supportsUndirected: false,
    bestUseCase: "Finding Strongly Connected Components in 1 pass",
    docsPath: "/docs/graph-algorithms/connectivity/scc",
  },
  {
    id: "dsu",
    name: "Disjoint Set Union (DSU)",
    category: "Advanced",
    timeComplexity: "O(α(N)) amortized",
    spaceComplexity: "O(N)",
    handlesNegativeWeights: true,
    supportsDirected: false,
    supportsUndirected: true,
    bestUseCase: "Dynamic connectivity & component tracking",
    docsPath: "/docs/graph-algorithms/advanced/dsu",
  },
];

export const GraphDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [requireNegativeWeights, setRequireNegativeWeights] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Interactive Recommendation Tool State
  const [recGoal, setRecGoal] = useState<string>("shortest-path");
  const [recWeighted, setRecWeighted] = useState<string>("yes");
  const [recNegative, setRecNegative] = useState<string>("no");
  const [recAllPairs, setRecAllPairs] = useState<string>("no");

  const filteredAlgorithms = ALGORITHMS.filter((algo) => {
    if (selectedCategory !== "All" && algo.category !== selectedCategory) return false;
    if (requireNegativeWeights && !algo.handlesNegativeWeights) return false;
    if (searchQuery && !algo.name.toLowerCase().includes(searchQuery.toLowerCase()) && !algo.bestUseCase.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getRecommendedAlgorithm = () => {
    if (recGoal === "traversal") {
      if (recWeighted === "no") return ALGORITHMS.find((a) => a.id === "bfs");
      return ALGORITHMS.find((a) => a.id === "dfs");
    }
    if (recGoal === "shortest-path") {
      if (recAllPairs === "yes") return ALGORITHMS.find((a) => a.id === "floyd-warshall");
      if (recWeighted === "no") return ALGORITHMS.find((a) => a.id === "bfs");
      if (recNegative === "yes") return ALGORITHMS.find((a) => a.id === "bellman-ford");
      return ALGORITHMS.find((a) => a.id === "dijkstra");
    }
    if (recGoal === "mst") {
      return ALGORITHMS.find((a) => a.id === "kruskal");
    }
    if (recGoal === "ordering") {
      return ALGORITHMS.find((a) => a.id === "topological-sort");
    }
    if (recGoal === "connectivity") {
      return ALGORITHMS.find((a) => a.id === "tarjan-scc");
    }
    return ALGORITHMS[0];
  };

  const recommendation = getRecommendedAlgorithm();

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>📊 Graph Algorithms Interactive Comparison Dashboard</h2>
        <p className={styles.subtitle}>
          Compare complexities, properties, and choose the optimal graph algorithm for your technical requirements.
        </p>
      </div>

      {/* Decision Assistant Widget */}
      <div className={styles.stateBox} style={{ borderLeft: "4px solid var(--ifm-color-primary, #25c2a0)" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem" }}>🎯 Algorithm Decision Selector</h3>
        <p style={{ fontSize: "0.88rem", marginBottom: "0.75rem" }}>Select your problem constraints below to get an instant algorithm recommendation:</p>
        <div className={styles.controls}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Goal:</span>
            <select className={styles.select} value={recGoal} onChange={(e) => setRecGoal(e.target.value)}>
              <option value="shortest-path">Shortest Path</option>
              <option value="traversal">Graph Traversal</option>
              <option value="mst">Minimum Spanning Tree (MST)</option>
              <option value="ordering">Dependency Ordering (DAG)</option>
              <option value="connectivity">Strongly Connected Components</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Weighted Edges:</span>
            <select className={styles.select} value={recWeighted} onChange={(e) => setRecWeighted(e.target.value)}>
              <option value="yes">Yes</option>
              <option value="no">No (Unweighted)</option>
            </select>
          </div>

          {recGoal === "shortest-path" && (
            <>
              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>Negative Weights:</span>
                <select className={styles.select} value={recNegative} onChange={(e) => setRecNegative(e.target.value)}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div className={styles.filterGroup}>
                <span className={styles.filterLabel}>All-Pairs Required:</span>
                <select className={styles.select} value={recAllPairs} onChange={(e) => setRecAllPairs(e.target.value)}>
                  <option value="no">No (Single Source)</option>
                  <option value="yes">Yes (All Pairs)</option>
                </select>
              </div>
            </>
          )}
        </div>

        {recommendation && (
          <div style={{ marginTop: "0.75rem", padding: "0.75rem", background: "rgba(37, 194, 160, 0.1)", borderRadius: "6px" }}>
            <strong>Recommended Choice:</strong> <a href={recommendation.docsPath}>{recommendation.name}</a>
            <div style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>
              Time: <code>{recommendation.timeComplexity}</code> | Space: <code>{recommendation.spaceComplexity}</code> | Best for: {recommendation.bestUseCase}
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className={styles.controls}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Category:</span>
          <select className={styles.select} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Traversal">Traversal</option>
            <option value="Shortest Path">Shortest Path</option>
            <option value="MST">Minimum Spanning Tree</option>
            <option value="Topological Sort">Topological Sort</option>
            <option value="Connectivity">Connectivity</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <input
            type="text"
            className={styles.select}
            placeholder="Search algorithm or use case..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "220px" }}
          />
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={requireNegativeWeights}
            onChange={(e) => setRequireNegativeWeights(e.target.checked)}
          />
          Requires Negative Weight Support
        </label>
      </div>

      {/* Comparison Grid Table */}
      <div style={{ overflowX: "auto" }}>
        <table className={styles.gridTable}>
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>Category</th>
              <th>Time Complexity</th>
              <th>Space Complexity</th>
              <th>Negative Weights</th>
              <th>Best Use Case</th>
            </tr>
          </thead>
          <tbody>
            {filteredAlgorithms.map((algo) => (
              <tr key={algo.id}>
                <td style={{ fontWeight: 600 }}>
                  <a href={algo.docsPath}>{algo.name}</a>
                </td>
                <td>
                  <span className={`${styles.badge} ${styles.badgeBlue}`}>{algo.category}</span>
                </td>
                <td>
                  <code>{algo.timeComplexity}</code>
                </td>
                <td>
                  <code>{algo.spaceComplexity}</code>
                </td>
                <td>
                  {algo.handlesNegativeWeights ? (
                    <span className={`${styles.badge} ${styles.badgeGreen}`}>Supported ✅</span>
                  ) : (
                    <span className={`${styles.badge} ${styles.badgeRed}`}>Not Supported ❌</span>
                  )}
                </td>
                <td style={{ fontSize: "0.85rem" }}>{algo.bestUseCase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GraphDashboard;
