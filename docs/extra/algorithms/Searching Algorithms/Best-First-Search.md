---
id: best-first-search
sidebar_position: 7
title: Best-First Search
sidebar_label: BFS
---
### Definition:
**Best-First Search (BFS)** is a graph traversal algorithm that selects the most promising node to expand based on a given heuristic. This heuristic is often the estimated cost or distance to the goal, and BFS chooses nodes that appear to lead most directly to the target.
### Characteristics:
- **Greedy Approach:**
  BFS uses a greedy strategy by selecting the node with the lowest heuristic value, aiming to find the goal faster by following the path that seems most promising at each step.
  
- **Heuristic Function:**
  The algorithm uses a heuristic function `h(n)` to estimate the distance from the current node `n` to the goal node. This is central to how the algorithm prioritizes which nodes to explore.
  
- **Priority Queue:**
  BFS uses a priority queue (often a min-heap) to keep track of nodes, where the node with the lowest heuristic value is given priority for exploration.
### How BFS Works:
1. **Initialize the Priority Queue:**
   Start by adding the initial node to the priority queue, assigning it a heuristic value based on how close it appears to be to the goal.
2. **Expand the Most Promising Node:**
   Pop the node with the lowest heuristic value from the priority queue, mark it as visited, and explore its neighbors.
3. **Evaluate Neighbors:**
   For each neighbor of the current node, assign a heuristic value and add it to the priority queue if it hasn’t been visited yet.
4. **Repeat:**
   Repeat the process until the goal node is reached or all reachable nodes have been visited.
### Time Complexity:
- **Time Complexity**: O(V + E log V)  
  Where `V` is the number of vertices and `E` is the number of edges. The additional log factor comes from using the priority queue.
### Space Complexity:
- **Space Complexity**: O(V)  
  The space complexity is proportional to the number of vertices, as the priority queue will store each node once.
### Advantages of BFS:
- **Efficient for Shortest Paths:**
  When combined with an appropriate heuristic, BFS can efficiently find the shortest or most optimal path in many scenarios.
- **Flexibility:**
  Different heuristic functions can tailor BFS to different types of problems, making it versatile.
### Disadvantages of BFS:
- **Not Always Optimal:**
  If the heuristic is not well-designed, BFS may not find the best solution or may get stuck in suboptimal areas.
- **Heuristic Dependency:**
  The performance of BFS is highly dependent on the accuracy of the heuristic function.
### Best-First Search Algorithm (Java Implementation):
```java
import java.util.*;
class Graph {
    private int numVertices;
    private LinkedList<Node> adjList[];
    // Node class with heuristic value
    class Node {
        int vertex;
        int heuristic;
        Node(int v, int h) {
            vertex = v;
            heuristic = h;
        }
    }
    // Constructor
    Graph(int v) {
        numVertices = v;
        adjList = new LinkedList[v];
        for (int i = 0; i < v; ++i)
            adjList[i] = new LinkedList<>();
    }
    // Add edge to the graph
    void addEdge(int v, int w, int h) {
        adjList[v].add(new Node(w, h)); // Add w with heuristic h to v's list.
    }
    // Best-First Search function
    void bestFirstSearch(int start, int goal) {
        // Priority queue to store nodes with priority on heuristic
        PriorityQueue<Node> pq = new PriorityQueue<>((a, b) -> a.heuristic - b.heuristic);
        // Add the starting node to the priority queue
        pq.add(new Node(start, 0));
        // Track visited nodes
        boolean visited[] = new boolean[numVertices];
        // BFS Loop
        while (!pq.isEmpty()) {
            Node current = pq.poll();
            if (visited[current.vertex])
                continue;
            visited[current.vertex] = true;
            System.out.println("Visited node: " + current.vertex);
            // If the goal is reached
            if (current.vertex == goal) {
                System.out.println("Goal reached: " + goal);
                return;
            }
            // Explore neighbors
            for (Node neighbor : adjList[current.vertex]) {
                if (!visited[neighbor.vertex]) {
                    pq.add(new Node(neighbor.vertex, neighbor.heuristic));
                }
            }
        }
    }
    public static void main(String[] args) {
        Graph g = new Graph(5);
        g.addEdge(0, 1, 3);
        g.addEdge(0, 2, 6);
        g.addEdge(1, 3, 2);
        g.addEdge(2, 4, 5);
        g.addEdge(3, 4, 4);
        System.out.println("Best-First Search traversal starting from node 0 to reach node 4:");
        g.bestFirstSearch(0, 4); // Perform BFS from node 0 to node 4
    }
}
```
### Applications of BFS:
- Pathfinding in AI: BFS is widely used in AI for navigating mazes and finding optimal routes.
- Optimization Problems: BFS is useful in optimization problems like the Traveling Salesman Problem when paired with the right heuristic.
- Game Development: It is used in game AI for pathfinding, especially when the terrain or world map is large and complex.
- Network Routing: BFS is helpful in finding efficient routes in communication networks, balancing load, or finding optimal network paths.
### Summary:
Best-First Search is a powerful graph traversal algorithm that uses a heuristic to prioritize which nodes to explore. By selecting the most promising nodes first, BFS is able to efficiently find solutions to problems like pathfinding, optimization, and game AI. However, its success largely depends on the heuristic function used, and it may not always provide optimal solutions.
