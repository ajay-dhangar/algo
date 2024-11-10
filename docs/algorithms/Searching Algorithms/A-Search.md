---
id: a-*-search  
sidebar_position: 1  
title: A* Search  
sidebar_label: A*  
---

### Definition:

**A* Search** is a pathfinding and graph traversal algorithm used to find the shortest path from a starting point to a goal. It combines the actual cost from the starting point and a heuristic estimate of the cost to reach the goal, making it both efficient and effective in scenarios where an optimal path is needed.

### Characteristics:

- **Heuristic-Based**: Utilizes heuristics to prioritize nodes.
- **Optimal**: Finds the shortest path if the heuristic is admissible.
- **Complete**: Ensures a solution is found if one exists.

### How A* Works:

1. **Initialize**: Start with the initial node in the open list.
2. **Expand**: Select the node with the lowest estimated total cost.
3. **Explore Neighbors**: For each unvisited neighbor, calculate the cost, update if lower.
4. **Repeat**: Continue until reaching the goal node or the open list is empty.

### Time Complexity:

- **Time Complexity**: \(O(b^d)\), where `b` is the branching factor and `d` is the depth of the solution.

### Space Complexity:

- **Space Complexity**: \(O(b^d)\)

### Advantages of A*:

- **Optimal Path**: Finds the shortest path in a graph.
- **Efficient Exploration**: Heuristic allows focusing on promising paths.

### Disadvantages of A*:

- **Memory Usage**: Can require high memory for large graphs.
- **Dependence on Heuristic**: Performance relies on the quality of the heuristic.

### A* Algorithm (Java Implementation):

```java
import java.util.*;

class Node implements Comparable<Node> {
    int x, y, cost, heuristic;

    Node(int x, int y, int cost, int heuristic) {
        this.x = x;
        this.y = y;
        this.cost = cost;
        this.heuristic = heuristic;
    }

    @Override
    public int compareTo(Node other) {
        return Integer.compare(this.cost + this.heuristic, other.cost + other.heuristic);
    }
}

class AStarAlgorithm {
    public static List<Node> aStarSearch(Node start, Node goal) {
        PriorityQueue<Node> openList = new PriorityQueue<>();
        Set<Node> closedList = new HashSet<>();
        openList.add(start);

        while (!openList.isEmpty()) {
            Node current = openList.poll();
            if (current.equals(goal)) {
                return reconstructPath(goal);
            }
            closedList.add(current);

            for (Node neighbor : getNeighbors(current)) {
                if (closedList.contains(neighbor)) continue;
                int tentativeCost = current.cost + calculateCost(current, neighbor);

                if (!openList.contains(neighbor) || tentativeCost < neighbor.cost) {
                    neighbor.cost = tentativeCost;
                    neighbor.heuristic = calculateHeuristic(neighbor, goal);
                    openList.add(neighbor);
                }
            }
        }
        return null;  // Goal not reached
    }

    // Dummy implementations for path reconstruction, neighbors, and heuristics
    private static List<Node> reconstructPath(Node goal) { return new ArrayList<>(); }
    private static List<Node> getNeighbors(Node node) { return new ArrayList<>(); }
    private static int calculateCost(Node current, Node neighbor) { return 1; }
    private static int calculateHeuristic(Node current, Node goal) { return Math.abs(current.x - goal.x) + Math.abs(current.y - goal.y); }
}
```
### Applications of A*:
Pathfinding: Used in games, robotics, and network routing.
AI for Games: Determines optimal paths in dynamic environments.
Robotics: Helps in navigating obstacles effectively.
### Summary:
A* Search is an optimal, heuristic-based search algorithm with broad applications in AI, robotics, and pathfinding. Its focus on efficient pathfinding while guaranteeing optimality makes it a key algorithm in many fields.
