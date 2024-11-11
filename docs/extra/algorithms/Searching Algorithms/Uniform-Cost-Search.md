---
id: uniform-cost-search  
sidebar_position: 4  
title: Uniform-Cost Search  
sidebar_label: Uniform-Cost  
---

### Definition:

**Uniform-Cost Search (UCS)** is a search algorithm that expands the node with the lowest cost first, ensuring that it finds the least-cost path in weighted graphs. UCS is similar to Dijkstra's algorithm but is often applied in AI and pathfinding scenarios.

### Characteristics:

- **Lowest Cost Path**: Always expands the node with the lowest path cost.
- **Optimal**: Guarantees an optimal solution for paths with non-negative weights.
- **Uninformed**: Does not use heuristics and is a type of uninformed search.

### How Uniform-Cost Search Works:

1. **Initialize**: Start with the root node.
2. **Expand Node**: Choose the node with the lowest cumulative path cost.
3. **Add Neighbors**: Add unvisited neighbors with updated path costs.
4. **Repeat**: Continue until reaching the goal or emptying the priority queue.

### Time Complexity:

- **Time Complexity**: \(O(b^d)\) where `b` is the branching factor and `d` is the depth of the goal.

### Space Complexity:

- **Space Complexity**: \(O(b^d)\)

### Advantages of Uniform-Cost Search:

- **Optimal Path**: Finds the least-cost path for weighted graphs.
- **No Heuristic Needed**: Effective without heuristic guidance.

### Disadvantages of Uniform-Cost Search:

- **Inefficient for Large Graphs**: Can be slow for large search spaces.
- **High Memory Use**: Stores all frontier nodes in memory.

### Uniform-Cost Search Algorithm (Java Implementation):

```java
import java.util.*;

class GraphNode {
    int id, cost;
    List<GraphNode> neighbors;

    GraphNode(int id, int cost) {
        this.id = id;
        this.cost = cost;
        neighbors = new ArrayList<>();
    }
}

class UniformCostSearch {
    public static int ucs(GraphNode start, GraphNode goal) {
        PriorityQueue<GraphNode> pq = new PriorityQueue<>(Comparator.comparingInt(n -> n.cost));
        Set<GraphNode> visited = new HashSet<>();
        pq.add(new GraphNode(start.id, 0));

        while (!pq.isEmpty()) {
            GraphNode current = pq.poll();
            if (current.id == goal.id) return current.cost;
            visited.add(current);

            for (GraphNode neighbor : current.neighbors) {
                if (!visited.contains(neighbor)) {
                    pq.add(new GraphNode(neighbor.id, current.cost + neighbor.cost));
                }
            }
        }
        return -1; // Goal not reachable
    }
}
```
### Applications of Uniform-Cost Search:
Pathfinding in AI: Used for finding the shortest path in robotics.
Network Routing: Ensures the lowest cost route in weighted networks.
Resource Allocation: Finds optimal paths with resource constraints.
### Summary:
Uniform-Cost Search is optimal and complete for finding the lowest-cost path in weighted graphs, widely used in AI and networking.
