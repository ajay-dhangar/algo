export type GraphDifficulty = "Easy" | "Medium" | "Hard";

export interface GraphTestCase {
  input: string;
  expected: string;
  description: string;
}

export interface GraphChallenge {
  id: string;
  title: string;
  slug: string;
  difficulty: GraphDifficulty;
  category: "Graphs";
  timeLimit: string;
  description: string;
  examples: { input: string; output: string; explanation: string }[];
  constraints: string[];
  starterCode: string;
  testCases: GraphTestCase[];
  timeComplexity: string;
  spaceComplexity: string;
  hint: string;
  solution: string;
}

export const GRAPH_CHALLENGES: GraphChallenge[] = [
  // ─── EASY ───────────────────────────────────────────────────────────────────
  {
    id: "graph-01",
    title: "Graph Representation (Adjacency List & Matrix)",
    slug: "graph-representation",
    difficulty: "Easy",
    category: "Graphs",
    timeLimit: "15 min",
    description: `Given the number of vertices **n** and a list of **edges**, build both representations of the graph:

- **Adjacency List**: an array where \`list[i]\` contains all neighbors of vertex i.
- **Adjacency Matrix**: an n×n 2D array where \`matrix[i][j] = 1\` if there is an edge between i and j, else 0.

Assume the graph is **undirected**.`,
    examples: [
      {
        input: "n = 4, edges = [[0,1],[1,2],[2,3]]",
        output: 'list: [[1],[0,2],[1,3],[2]], matrix: 4x4 with 1s at symmetric edge positions',
        explanation: "Each edge appears in both directions for an undirected graph.",
      },
      {
        input: "n = 1, edges = []",
        output: "list: [[]], matrix: [[0]]",
        explanation: "Single isolated vertex, no edges.",
      },
    ],
    constraints: ["1 <= n <= 1000", "0 <= edges.length <= 10^4", "No self-loops or duplicate edges"],
    starterCode: `/**
 * @param {number} n - number of vertices (0-indexed)
 * @param {number[][]} edges - list of [u, v] pairs
 * @return {{ list: number[][], matrix: number[][] }}
 */
function buildGraph(n, edges) {
  // Your code here
}

console.log(JSON.stringify(buildGraph(4, [[0,1],[1,2],[2,3]])));
// Expected list: [[1],[0,2],[1,3],[2]]
`,
    testCases: [
      { input: "n=4 edges=[[0,1],[1,2],[2,3]]", expected: '{"list":[[1],[0,2],[1,3],[2]],"matrix":[[0,1,0,0],[1,0,1,0],[0,1,0,1],[0,0,1,0]]}', description: "Path graph" },
      { input: "n=1 edges=[]", expected: '{"list":[[]],"matrix":[[0]]}', description: "Single isolated vertex" },
      { input: "n=3 edges=[[0,1],[0,2],[1,2]]", expected: '{"list":[[1,2],[0,2],[0,1]],"matrix":[[0,1,1],[1,0,1],[1,1,0]]}', description: "Triangle graph" },
    ],
    timeComplexity: "O(V + E) for adjacency list, O(V^2) for adjacency matrix.",
    spaceComplexity: "O(V + E) for list, O(V^2) for matrix.",
    hint: "Initialize an array of n empty arrays for the list, and an n×n zero-filled 2D array for the matrix. For each edge [u, v], push v into list[u] and u into list[v]; set matrix[u][v] = matrix[v][u] = 1.",
    solution: `function buildGraph(n, edges) {
  const list = Array.from({ length: n }, () => []);
  const matrix = Array.from({ length: n }, () => new Array(n).fill(0));
  for (const [u, v] of edges) {
    list[u].push(v);
    list[v].push(u);
    matrix[u][v] = 1;
    matrix[v][u] = 1;
  }
  return { list, matrix };
}`,
  },
  {
    id: "graph-02",
    title: "Depth First Search (DFS)",
    slug: "depth-first-search",
    difficulty: "Easy",
    category: "Graphs",
    timeLimit: "20 min",
    description: `Given a graph as an adjacency list and a starting vertex, return the order of vertices visited using **Depth First Search**.

Visit neighbors in the order they appear in the adjacency list.`,
    examples: [
      { input: "graph = [[1,2],[0,3],[0,3],[1,2]], start = 0", output: "[0,1,3,2]", explanation: "From 0, visit 1, then 1's unvisited neighbor 3, then backtrack to visit 2." },
      { input: "graph = [[1],[0]], start = 0", output: "[0,1]", explanation: "Simple two-node graph." },
    ],
    constraints: ["1 <= vertices <= 1000", "Graph may be disconnected (only traverse reachable nodes)"],
    starterCode: `/**
 * @param {number[][]} graph - adjacency list
 * @param {number} start - starting vertex
 * @return {number[]} order of visited vertices
 */
function dfs(graph, start) {
  // Your code here
}

console.log(JSON.stringify(dfs([[1,2],[0,3],[0,3],[1,2]], 0)));
// Expected: [0,1,3,2]
`,
    testCases: [
      { input: "graph=[[1,2],[0,3],[0,3],[1,2]] start=0", expected: "[0,1,3,2]", description: "Standard graph" },
      { input: "graph=[[1],[0]] start=0", expected: "[0,1]", description: "Two-node graph" },
      { input: "graph=[[],[]] start=0", expected: "[0]", description: "Isolated vertex" },
    ],
    timeComplexity: "O(V + E) — every vertex and edge visited once.",
    spaceComplexity: "O(V) — visited set and recursion/explicit stack.",
    hint: "Use a visited set and either recursion or an explicit stack. Push the start node, and whenever you pop/visit a node, push its unvisited neighbors.",
    solution: `function dfs(graph, start) {
  const visited = new Set();
  const order = [];
  function visit(node) {
    if (visited.has(node)) return;
    visited.add(node);
    order.push(node);
    for (const neighbor of graph[node]) {
      visit(neighbor);
    }
  }
  visit(start);
  return order;
}`,
  },
  {
    id: "graph-03",
    title: "Breadth First Search (BFS)",
    slug: "breadth-first-search",
    difficulty: "Easy",
    category: "Graphs",
    timeLimit: "20 min",
    description: `Given a graph as an adjacency list and a starting vertex, return the order of vertices visited using **Breadth First Search**.

Visit neighbors level by level using a queue.`,
    examples: [
      { input: "graph = [[1,2],[0,3],[0,3],[1,2]], start = 0", output: "[0,1,2,3]", explanation: "Visit 0, then its direct neighbors 1 and 2, then 3." },
      { input: "graph = [[1],[0,2],[1]], start = 0", output: "[0,1,2]", explanation: "Simple chain graph." },
    ],
    constraints: ["1 <= vertices <= 1000", "Graph may be disconnected"],
    starterCode: `/**
 * @param {number[][]} graph - adjacency list
 * @param {number} start - starting vertex
 * @return {number[]} order of visited vertices
 */
function bfs(graph, start) {
  // Your code here
}

console.log(JSON.stringify(bfs([[1,2],[0,3],[0,3],[1,2]], 0)));
// Expected: [0,1,2,3]
`,
    testCases: [
      { input: "graph=[[1,2],[0,3],[0,3],[1,2]] start=0", expected: "[0,1,2,3]", description: "Standard graph" },
      { input: "graph=[[1],[0,2],[1]] start=0", expected: "[0,1,2]", description: "Chain graph" },
      { input: "graph=[[],[]] start=0", expected: "[0]", description: "Isolated vertex" },
    ],
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) — queue and visited set.",
    hint: "Use a queue. Mark start as visited and enqueue it. While the queue isn't empty, dequeue a node, record it, and enqueue any unvisited neighbors (marking them visited immediately to avoid duplicates).",
    solution: `function bfs(graph, start) {
  const visited = new Set([start]);
  const order = [];
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
  },
  {
    id: "graph-04",
    title: "Number of Connected Components",
    slug: "number-of-connected-components",
    difficulty: "Easy",
    category: "Graphs",
    timeLimit: "20 min",
    description: `Given an undirected graph with **n** vertices and a list of edges, return the **number of connected components**.`,
    examples: [
      { input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2", explanation: "Component {0,1,2} and component {3,4}." },
      { input: "n = 4, edges = []", output: "4", explanation: "No edges — every vertex is its own component." },
    ],
    constraints: ["1 <= n <= 2000", "0 <= edges.length <= 5000"],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
function countComponents(n, edges) {
  // Your code here
}

console.log(countComponents(5, [[0,1],[1,2],[3,4]])); // Expected: 2
`,
    testCases: [
      { input: "n=5 edges=[[0,1],[1,2],[3,4]]", expected: "2", description: "Two components" },
      { input: "n=4 edges=[]", expected: "4", description: "All isolated" },
      { input: "n=3 edges=[[0,1],[1,2],[0,2]]", expected: "1", description: "Fully connected triangle" },
    ],
    timeComplexity: "O(V + E) with DFS/BFS, or O(E log V) with Union-Find.",
    spaceComplexity: "O(V) for visited array or Union-Find parent array.",
    hint: "Build an adjacency list, then run DFS/BFS from every unvisited vertex, incrementing a counter each time you start a new traversal.",
    solution: `function countComponents(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
  const visited = new Array(n).fill(false);
  let count = 0;
  function dfs(node) {
    visited[node] = true;
    for (const next of adj[node]) if (!visited[next]) dfs(next);
  }
  for (let i = 0; i < n; i++) {
    if (!visited[i]) { count++; dfs(i); }
  }
  return count;
}`,
  },
  {
    id: "graph-05",
    title: "Find Path Between Two Nodes",
    slug: "find-path-between-two-nodes",
    difficulty: "Easy",
    category: "Graphs",
    timeLimit: "20 min",
    description: `Given an undirected graph as an adjacency list, and two nodes **src** and **dst**, determine whether a path exists between them. Return the path as an array of vertices if it exists, otherwise return an empty array.`,
    examples: [
      { input: "graph = [[1],[0,2],[1,3],[2]], src = 0, dst = 3", output: "[0,1,2,3]", explanation: "Direct path through the chain." },
      { input: "graph = [[1],[0],[3],[2]], src = 0, dst = 3", output: "[]", explanation: "No path — two disconnected components." },
    ],
    constraints: ["1 <= vertices <= 1000", "src != dst"],
    starterCode: `/**
 * @param {number[][]} graph
 * @param {number} src
 * @param {number} dst
 * @return {number[]} path from src to dst, or [] if none exists
 */
function findPath(graph, src, dst) {
  // Your code here
}

console.log(JSON.stringify(findPath([[1],[0,2],[1,3],[2]], 0, 3)));
// Expected: [0,1,2,3]
`,
    testCases: [
      { input: "graph=[[1],[0,2],[1,3],[2]] src=0 dst=3", expected: "[0,1,2,3]", description: "Connected path" },
      { input: "graph=[[1],[0],[3],[2]] src=0 dst=3", expected: "[]", description: "Disconnected" },
      { input: "graph=[[1],[0]] src=0 dst=1", expected: "[0,1]", description: "Direct edge" },
    ],
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) — visited set and parent map for path reconstruction.",
    hint: "Run BFS or DFS from src, tracking a parent pointer for each visited node. Once dst is reached, walk parent pointers back to src and reverse the result.",
    solution: `function findPath(graph, src, dst) {
  const visited = new Set([src]);
  const parent = new Map();
  const queue = [src];
  while (queue.length) {
    const node = queue.shift();
    if (node === dst) break;
    for (const next of graph[node]) {
      if (!visited.has(next)) {
        visited.add(next);
        parent.set(next, node);
        queue.push(next);
      }
    }
  }
  if (!visited.has(dst)) return [];
  const path = [dst];
  let cur = dst;
  while (cur !== src) {
    cur = parent.get(cur);
    path.push(cur);
  }
  return path.reverse();
}`,
  },

  // ─── MEDIUM ─────────────────────────────────────────────────────────────────
  {
    id: "graph-06",
    title: "Detect Cycle in an Undirected Graph",
    slug: "detect-cycle-undirected-graph",
    difficulty: "Medium",
    category: "Graphs",
    timeLimit: "25 min",
    description: `Given an undirected graph with **n** vertices and a list of edges, determine whether the graph contains a **cycle**.`,
    examples: [
      { input: "n = 4, edges = [[0,1],[1,2],[2,3],[3,0]]", output: "true", explanation: "0-1-2-3-0 forms a cycle." },
      { input: "n = 4, edges = [[0,1],[1,2],[2,3]]", output: "false", explanation: "A simple path, no cycle." },
    ],
    constraints: ["1 <= n <= 2000", "No self-loops"],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
function hasCycleUndirected(n, edges) {
  // Your code here
}

console.log(hasCycleUndirected(4, [[0,1],[1,2],[2,3],[3,0]])); // true
console.log(hasCycleUndirected(4, [[0,1],[1,2],[2,3]])); // false
`,
    testCases: [
      { input: "n=4 edges=[[0,1],[1,2],[2,3],[3,0]]", expected: "true", description: "Simple cycle" },
      { input: "n=4 edges=[[0,1],[1,2],[2,3]]", expected: "false", description: "Tree, no cycle" },
      { input: "n=5 edges=[[0,1],[1,2],[3,4]]", expected: "false", description: "Two disconnected trees" },
    ],
    timeComplexity: "O(V + E) with DFS, or O(E) with Union-Find.",
    spaceComplexity: "O(V) for visited array / parent map.",
    hint: "During DFS, track the parent of each node. If you visit a neighbor that's already visited and it isn't the immediate parent, a cycle exists.",
    solution: `function hasCycleUndirected(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); adj[v].push(u); }
  const visited = new Array(n).fill(false);
  function dfs(node, parent) {
    visited[node] = true;
    for (const next of adj[node]) {
      if (!visited[next]) {
        if (dfs(next, node)) return true;
      } else if (next !== parent) {
        return true;
      }
    }
    return false;
  }
  for (let i = 0; i < n; i++) {
    if (!visited[i] && dfs(i, -1)) return true;
  }
  return false;
}`,
  },
  {
    id: "graph-07",
    title: "Detect Cycle in a Directed Graph",
    slug: "detect-cycle-directed-graph",
    difficulty: "Medium",
    category: "Graphs",
    timeLimit: "25 min",
    description: `Given a directed graph with **n** vertices and a list of directed edges, determine whether the graph contains a **cycle**.`,
    examples: [
      { input: "n = 3, edges = [[0,1],[1,2],[2,0]]", output: "true", explanation: "0→1→2→0 forms a directed cycle." },
      { input: "n = 3, edges = [[0,1],[1,2]]", output: "false", explanation: "A simple directed path." },
    ],
    constraints: ["1 <= n <= 2000", "Edges are directed: [u, v] means u → v"],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
function hasCycleDirected(n, edges) {
  // Your code here
}

console.log(hasCycleDirected(3, [[0,1],[1,2],[2,0]])); // true
console.log(hasCycleDirected(3, [[0,1],[1,2]])); // false
`,
    testCases: [
      { input: "n=3 edges=[[0,1],[1,2],[2,0]]", expected: "true", description: "Directed cycle" },
      { input: "n=3 edges=[[0,1],[1,2]]", expected: "false", description: "Directed path" },
      { input: "n=4 edges=[[0,1],[1,2],[2,3],[3,1]]", expected: "true", description: "Cycle not including start node" },
    ],
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) — color/state array of size 3 (white/gray/black) plus recursion stack.",
    hint: "Use three states per node: unvisited, in-progress (on current DFS stack), and done. If DFS encounters a node that's 'in-progress', that's a back edge — a cycle.",
    solution: `function hasCycleDirected(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) adj[u].push(v);
  const state = new Array(n).fill(0); // 0=unvisited, 1=in-progress, 2=done
  function dfs(node) {
    state[node] = 1;
    for (const next of adj[node]) {
      if (state[next] === 1) return true;
      if (state[next] === 0 && dfs(next)) return true;
    }
    state[node] = 2;
    return false;
  }
  for (let i = 0; i < n; i++) {
    if (state[i] === 0 && dfs(i)) return true;
  }
  return false;
}`,
  },
  {
    id: "graph-08",
    title: "Topological Sort",
    slug: "topological-sort",
    difficulty: "Medium",
    category: "Graphs",
    timeLimit: "30 min",
    description: `Given a **Directed Acyclic Graph (DAG)** with **n** vertices and a list of directed edges, return a valid **topological ordering** of the vertices.

A topological order ensures that for every directed edge u → v, u appears before v in the ordering.`,
    examples: [
      { input: "n = 4, edges = [[0,1],[0,2],[1,3],[2,3]]", output: "[0,1,2,3]", explanation: "0 must precede 1 and 2; both must precede 3." },
      { input: "n = 3, edges = [[0,1],[1,2]]", output: "[0,1,2]", explanation: "A simple chain." },
    ],
    constraints: ["1 <= n <= 2000", "The graph is guaranteed to be acyclic", "Multiple valid orderings may exist; any valid one is accepted"],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[]}
 */
function topologicalSort(n, edges) {
  // Your code here
}

console.log(JSON.stringify(topologicalSort(4, [[0,1],[0,2],[1,3],[2,3]])));
// One valid expected output: [0,1,2,3]
`,
    testCases: [
      { input: "n=4 edges=[[0,1],[0,2],[1,3],[2,3]]", expected: "[0,1,2,3]", description: "Diamond DAG (any valid order accepted)" },
      { input: "n=3 edges=[[0,1],[1,2]]", expected: "[0,1,2]", description: "Simple chain" },
      { input: "n=2 edges=[]", expected: "[0,1]", description: "No edges — any order valid" },
    ],
    timeComplexity: "O(V + E) using Kahn's algorithm (BFS with in-degree tracking).",
    spaceComplexity: "O(V) for in-degree array and queue.",
    hint: "Use Kahn's algorithm: compute in-degree of every node, enqueue all nodes with in-degree 0, then repeatedly dequeue a node, add it to the result, and decrement the in-degree of its neighbors — enqueueing any that reach 0.",
    solution: `function topologicalSort(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  const inDegree = new Array(n).fill(0);
  for (const [u, v] of edges) { adj[u].push(v); inDegree[v]++; }
  const queue = [];
  for (let i = 0; i < n; i++) if (inDegree[i] === 0) queue.push(i);
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const next of adj[node]) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }
  return order;
}`,
  },
  {
    id: "graph-09",
    title: "Bipartite Graph Check",
    slug: "bipartite-graph-check",
    difficulty: "Medium",
    category: "Graphs",
    timeLimit: "25 min",
    description: `Given an undirected graph as an adjacency list, determine whether it is **bipartite** — i.e., whether its vertices can be split into two sets such that every edge connects a vertex in one set to a vertex in the other.`,
    examples: [
      { input: "graph = [[1,3],[0,2],[1,3],[0,2]]", output: "true", explanation: "Can be 2-colored: {0,2} and {1,3}." },
      { input: "graph = [[1,2,3],[0,2],[0,1,3],[0,2]]", output: "false", explanation: "Contains an odd cycle, so it's not bipartite." },
    ],
    constraints: ["1 <= vertices <= 2000", "Graph may be disconnected"],
    starterCode: `/**
 * @param {number[][]} graph - adjacency list
 * @return {boolean}
 */
function isBipartite(graph) {
  // Your code here
}

console.log(isBipartite([[1,3],[0,2],[1,3],[0,2]])); // true
console.log(isBipartite([[1,2,3],[0,2],[0,1,3],[0,2]])); // false
`,
    testCases: [
      { input: "graph=[[1,3],[0,2],[1,3],[0,2]]", expected: "true", description: "Bipartite square graph" },
      { input: "graph=[[1,2,3],[0,2],[0,1,3],[0,2]]", expected: "false", description: "Odd cycle present" },
      { input: "graph=[[1],[0]]", expected: "true", description: "Single edge" },
    ],
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V) — color array.",
    hint: "2-color the graph using BFS/DFS. Assign the start node color 0, then alternate colors for neighbors. If you ever find a neighbor with the same color as the current node, the graph isn't bipartite.",
    solution: `function isBipartite(graph) {
  const n = graph.length;
  const color = new Array(n).fill(-1);
  for (let start = 0; start < n; start++) {
    if (color[start] !== -1) continue;
    color[start] = 0;
    const queue = [start];
    while (queue.length) {
      const node = queue.shift();
      for (const next of graph[node]) {
        if (color[next] === -1) {
          color[next] = 1 - color[node];
          queue.push(next);
        } else if (color[next] === color[node]) {
          return false;
        }
      }
    }
  }
  return true;
}`,
  },
  {
    id: "graph-10",
    title: "Shortest Path in Unweighted Graph",
    slug: "shortest-path-unweighted-graph",
    difficulty: "Medium",
    category: "Graphs",
    timeLimit: "25 min",
    description: `Given an unweighted undirected graph as an adjacency list, and a source vertex, return an array where \`dist[i]\` is the **shortest distance** (number of edges) from the source to vertex i. Unreachable vertices should have distance **-1**.`,
    examples: [
      { input: "graph = [[1,2],[0,3],[0,3],[1,2]], src = 0", output: "[0,1,1,2]", explanation: "0 is the source; 1 and 2 are one edge away; 3 is two edges away." },
      { input: "graph = [[1],[0],[3],[2]], src = 0", output: "[0,1,-1,-1]", explanation: "Vertices 2 and 3 are in a disconnected component." },
    ],
    constraints: ["1 <= vertices <= 2000"],
    starterCode: `/**
 * @param {number[][]} graph
 * @param {number} src
 * @return {number[]}
 */
function shortestPathUnweighted(graph, src) {
  // Your code here
}

console.log(JSON.stringify(shortestPathUnweighted([[1,2],[0,3],[0,3],[1,2]], 0)));
// Expected: [0,1,1,2]
`,
    testCases: [
      { input: "graph=[[1,2],[0,3],[0,3],[1,2]] src=0", expected: "[0,1,1,2]", description: "Connected graph" },
      { input: "graph=[[1],[0],[3],[2]] src=0", expected: "[0,1,-1,-1]", description: "Disconnected component" },
      { input: "graph=[[]] src=0", expected: "[0]", description: "Single isolated vertex" },
    ],
    timeComplexity: "O(V + E) — standard BFS.",
    spaceComplexity: "O(V) — distance array and queue.",
    hint: "BFS naturally computes shortest paths in unweighted graphs because it explores nodes level by level. Initialize all distances to -1 except the source (0), and update distance when first visiting a neighbor.",
    solution: `function shortestPathUnweighted(graph, src) {
  const dist = new Array(graph.length).fill(-1);
  dist[src] = 0;
  const queue = [src];
  while (queue.length) {
    const node = queue.shift();
    for (const next of graph[node]) {
      if (dist[next] === -1) {
        dist[next] = dist[node] + 1;
        queue.push(next);
      }
    }
  }
  return dist;
}`,
  },

  // ─── HARD ────────────────────────────────────────────────────────────────────
  {
    id: "graph-11",
    title: "Dijkstra's Algorithm",
    slug: "dijkstras-algorithm",
    difficulty: "Hard",
    category: "Graphs",
    timeLimit: "35 min",
    description: `Given a weighted, directed graph with **n** vertices (non-negative edge weights) and a source vertex, return the **shortest distance** from the source to every other vertex using **Dijkstra's algorithm**. Unreachable vertices should have distance **Infinity**.`,
    examples: [
      { input: "n = 4, edges = [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5]], src = 0", output: "[0,3,1,4]", explanation: "Shortest path to 1 is via 2 (1+2=3); to 3 is via 2→1 (1+2+1=4)." },
    ],
    constraints: ["1 <= n <= 2000", "Edge weights are non-negative", "edges[i] = [u, v, weight] meaning a directed edge u → v"],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges - [u, v, weight]
 * @param {number} src
 * @return {number[]} shortest distances from src; Infinity if unreachable
 */
function dijkstra(n, edges, src) {
  // Your code here
}

console.log(JSON.stringify(dijkstra(4, [[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5]], 0)));
// Expected: [0,3,1,4]
`,
    testCases: [
      { input: "n=4 edges=[[0,1,4],[0,2,1],[2,1,2],[1,3,1],[2,3,5]] src=0", expected: "[0,3,1,4]", description: "Classic Dijkstra example" },
      { input: "n=2 edges=[] src=0", expected: '[0,null]', description: "Unreachable vertex returns Infinity (serialized as null in JSON)" },
      { input: "n=3 edges=[[0,1,1],[1,2,1]] src=0", expected: "[0,1,2]", description: "Simple chain" },
    ],
    timeComplexity: "O((V + E) log V) using a min-priority queue (binary heap).",
    spaceComplexity: "O(V + E) for the adjacency list and distance array.",
    hint: "Use a min-priority queue (or sort-based simulation) storing (distance, node) pairs. Repeatedly pop the smallest-distance node, and relax its edges — updating a neighbor's distance if a shorter path is found through the current node.",
    solution: `function dijkstra(n, edges, src) {
  const adj = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) adj[u].push([v, w]);
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  // Simple array-based priority queue (sufficient for moderate n)
  const pq = [[0, src]];
  const visited = new Array(n).fill(false);
  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, node] = pq.shift();
    if (visited[node]) continue;
    visited[node] = true;
    for (const [next, weight] of adj[node]) {
      if (d + weight < dist[next]) {
        dist[next] = d + weight;
        pq.push([dist[next], next]);
      }
    }
  }
  return dist;
}`,
  },
  {
    id: "graph-12",
    title: "Bellman-Ford Algorithm",
    slug: "bellman-ford-algorithm",
    difficulty: "Hard",
    category: "Graphs",
    timeLimit: "35 min",
    description: `Given a weighted, directed graph with **n** vertices (edge weights may be **negative**) and a source vertex, return the shortest distances from the source to every vertex using the **Bellman-Ford algorithm**. If the graph contains a **negative-weight cycle** reachable from the source, return \`null\`.`,
    examples: [
      { input: "n = 3, edges = [[0,1,1],[1,2,-1],[2,0,-1]], src = 0", output: "null", explanation: "The cycle 0→1→2→0 has total weight -1, a negative cycle." },
      { input: "n = 3, edges = [[0,1,4],[0,2,5],[1,2,-3]], src = 0", output: "[0,4,1]", explanation: "Shortest path to 2 is via 1: 4 + (-3) = 1." },
    ],
    constraints: ["1 <= n <= 1000", "Edge weights can be negative", "edges[i] = [u, v, weight]"],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges - [u, v, weight]
 * @param {number} src
 * @return {number[] | null} distances, or null if a negative cycle is reachable from src
 */
function bellmanFord(n, edges, src) {
  // Your code here
}

console.log(JSON.stringify(bellmanFord(3, [[0,1,4],[0,2,5],[1,2,-3]], 0)));
// Expected: [0,4,1]
console.log(bellmanFord(3, [[0,1,1],[1,2,-1],[2,0,-1]], 0));
// Expected: null
`,
    testCases: [
      { input: "n=3 edges=[[0,1,4],[0,2,5],[1,2,-3]] src=0", expected: "[0,4,1]", description: "Negative edge, no negative cycle" },
      { input: "n=3 edges=[[0,1,1],[1,2,-1],[2,0,-1]] src=0", expected: "null", description: "Negative cycle detected" },
      { input: "n=2 edges=[[0,1,5]] src=0", expected: "[0,5]", description: "Simple positive edge" },
    ],
    timeComplexity: "O(V * E) — relax all edges V-1 times, then one more pass to detect negative cycles.",
    spaceComplexity: "O(V) for the distance array.",
    hint: "Relax every edge V-1 times: for each edge (u,v,w), if dist[u] + w < dist[v], update dist[v]. After V-1 passes, do one more pass — if any edge can still be relaxed, a negative cycle exists.",
    solution: `function bellmanFord(n, edges, src) {
  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;
  for (let i = 0; i < n - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      return null; // negative cycle reachable from src
    }
  }
  return dist;
}`,
  },
  {
    id: "graph-13",
    title: "Floyd-Warshall Algorithm",
    slug: "floyd-warshall-algorithm",
    difficulty: "Hard",
    category: "Graphs",
    timeLimit: "35 min",
    description: `Given a weighted directed graph with **n** vertices (edge weights may be negative, but no negative cycles), compute the **shortest distance between every pair of vertices** using the **Floyd-Warshall algorithm**. Return the result as an n×n matrix, where unreachable pairs have distance \`Infinity\`.`,
    examples: [
      { input: "n = 3, edges = [[0,1,3],[1,2,1],[0,2,10]]", output: "matrix[0][2] = 4", explanation: "The path 0→1→2 (3+1=4) is shorter than the direct edge 0→2 (10)." },
    ],
    constraints: ["1 <= n <= 300", "No negative cycles", "edges[i] = [u, v, weight]"],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges - [u, v, weight]
 * @return {number[][]} n x n distance matrix
 */
function floydWarshall(n, edges) {
  // Your code here
}

const result = floydWarshall(3, [[0,1,3],[1,2,1],[0,2,10]]);
console.log(result[0][2]); // Expected: 4
`,
    testCases: [
      { input: "n=3 edges=[[0,1,3],[1,2,1],[0,2,10]]", expected: "matrix[0][2] === 4", description: "Shorter path found through intermediate node" },
      { input: "n=2 edges=[[0,1,5]]", expected: "matrix[1][0] === Infinity", description: "No return edge — unreachable" },
      { input: "n=1 edges=[]", expected: "matrix[0][0] === 0", description: "Single vertex, distance to self is 0" },
    ],
    timeComplexity: "O(V^3) — three nested loops over all vertices.",
    spaceComplexity: "O(V^2) for the distance matrix.",
    hint: "Initialize an n×n matrix with 0 on the diagonal and Infinity elsewhere, then set direct edge weights. For each intermediate vertex k, and every pair (i,j), check if going through k is shorter: dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]).",
    solution: `function floydWarshall(n, edges) {
  const dist = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) dist[i][i] = 0;
  for (const [u, v, w] of edges) dist[u][v] = Math.min(dist[u][v], w);
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}`,
  },
  {
    id: "graph-14",
    title: "Minimum Spanning Tree (Kruskal's & Prim's)",
    slug: "minimum-spanning-tree",
    difficulty: "Hard",
    category: "Graphs",
    timeLimit: "40 min",
    description: `Given a weighted, **undirected**, connected graph with **n** vertices, find the total weight of its **Minimum Spanning Tree (MST)** — the subset of edges that connects all vertices with the minimum possible total edge weight and no cycles.

Implement this using **Kruskal's algorithm** (sort edges + Union-Find).`,
    examples: [
      { input: "n = 4, edges = [[0,1,1],[1,2,2],[2,3,3],[0,3,4],[0,2,5]]", output: "6", explanation: "MST uses edges (0,1,1), (1,2,2), (2,3,3) for total weight 6." },
      { input: "n = 2, edges = [[0,1,7]]", output: "7", explanation: "Only one possible edge." },
    ],
    constraints: ["2 <= n <= 2000", "The graph is connected", "edges[i] = [u, v, weight]"],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges - [u, v, weight]
 * @return {number} total weight of the minimum spanning tree
 */
function minimumSpanningTree(n, edges) {
  // Your code here
}

console.log(minimumSpanningTree(4, [[0,1,1],[1,2,2],[2,3,3],[0,3,4],[0,2,5]])); // Expected: 6
`,
    testCases: [
      { input: "n=4 edges=[[0,1,1],[1,2,2],[2,3,3],[0,3,4],[0,2,5]]", expected: "6", description: "Classic MST example" },
      { input: "n=2 edges=[[0,1,7]]", expected: "7", description: "Single edge" },
      { input: "n=3 edges=[[0,1,1],[1,2,1],[0,2,1]]", expected: "2", description: "Triangle, all equal weights" },
    ],
    timeComplexity: "O(E log E) for sorting edges, plus near O(E) for Union-Find with path compression.",
    spaceComplexity: "O(V) for the Union-Find parent/rank arrays.",
    hint: "Sort all edges by weight ascending. Use a Union-Find (Disjoint Set Union) structure: for each edge in sorted order, if its two endpoints are in different sets, union them and add the weight to the total — this avoids creating cycles.",
    solution: `function minimumSpanningTree(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]);
    return parent[x];
  }
  function union(a, b) {
    const ra = find(a), rb = find(b);
    if (ra === rb) return false;
    parent[ra] = rb;
    return true;
  }
  const sorted = [...edges].sort((a, b) => a[2] - b[2]);
  let total = 0;
  for (const [u, v, w] of sorted) {
    if (union(u, v)) total += w;
  }
  return total;
}`,
  },
  {
    id: "graph-15",
    title: "Strongly Connected Components (Kosaraju/Tarjan)",
    slug: "strongly-connected-components",
    difficulty: "Hard",
    category: "Graphs",
    timeLimit: "40 min",
    description: `Given a **directed graph** with **n** vertices, find all **Strongly Connected Components (SCCs)** — maximal sets of vertices where every vertex can reach every other vertex in the same set.

Implement this using **Kosaraju's algorithm** (two-pass DFS with graph transpose). Return the SCCs as an array of arrays; each inner array lists the vertices in one component.`,
    examples: [
      { input: "n = 5, edges = [[0,1],[1,2],[2,0],[1,3],[3,4]]", output: "[[0,1,2],[3],[4]]", explanation: "0,1,2 form a cycle (one SCC); 3 and 4 are each their own SCC." },
    ],
    constraints: ["1 <= n <= 2000", "Order of vertices within an SCC and order of SCCs in the output may vary"],
    starterCode: `/**
 * @param {number} n
 * @param {number[][]} edges - directed edges [u, v]
 * @return {number[][]} list of strongly connected components
 */
function stronglyConnectedComponents(n, edges) {
  // Your code here
}

console.log(JSON.stringify(stronglyConnectedComponents(5, [[0,1],[1,2],[2,0],[1,3],[3,4]])));
// One valid expected output: [[0,1,2],[3],[4]]
`,
    testCases: [
      { input: "n=5 edges=[[0,1],[1,2],[2,0],[1,3],[3,4]]", expected: "[[0,1,2],[3],[4]] (order may vary)", description: "One cycle plus two singleton SCCs" },
      { input: "n=3 edges=[[0,1],[1,2]]", expected: "[[0],[1],[2]] (order may vary)", description: "No cycles — every vertex its own SCC" },
      { input: "n=2 edges=[[0,1],[1,0]]", expected: "[[0,1]] (order may vary)", description: "Two mutually reachable vertices" },
    ],
    timeComplexity: "O(V + E) — two DFS passes (original graph + transpose).",
    spaceComplexity: "O(V + E) for the adjacency lists, transpose graph, and finish-order stack.",
    hint: "Kosaraju's algorithm: (1) run DFS on the original graph, pushing nodes onto a stack in order of finishing time; (2) build the transpose graph (reverse all edges); (3) pop nodes from the stack and run DFS on the transpose graph — each DFS tree found this way is one SCC.",
    solution: `function stronglyConnectedComponents(n, edges) {
  const adj = Array.from({ length: n }, () => []);
  const radj = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) { adj[u].push(v); radj[v].push(u); }

  const visited = new Array(n).fill(false);
  const stack = [];
  function dfs1(node) {
    visited[node] = true;
    for (const next of adj[node]) if (!visited[next]) dfs1(next);
    stack.push(node);
  }
  for (let i = 0; i < n; i++) if (!visited[i]) dfs1(i);

  const visited2 = new Array(n).fill(false);
  const sccs = [];
  function dfs2(node, component) {
    visited2[node] = true;
    component.push(node);
    for (const next of radj[node]) if (!visited2[next]) dfs2(next, component);
  }
  while (stack.length) {
    const node = stack.pop();
    if (!visited2[node]) {
      const component = [];
      dfs2(node, component);
      sccs.push(component);
    }
  }
  return sccs;
}`,
  },
];

export default GRAPH_CHALLENGES;
