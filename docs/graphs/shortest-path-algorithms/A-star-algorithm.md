---
id: a-star-algo
title: A*-Algorithm
sidebar_label: A*-Algorithm
description: "In this blog post, we'll explore the A* Algorithm, an efficient method for pathfinding and graph traversal."
tags: [dsa, algorithms, pathfinding, graph traversal]
---

# A* Algorithm

The **A* algorithm** is a popular and efficient pathfinding and graph traversal algorithm used to find the shortest path from a starting node to a goal node in a weighted graph. It combines the advantages of Dijkstra's algorithm and Greedy Best-First Search, making it suitable for various applications in computer science and artificial intelligence.

The A* algorithm employs a heuristic to estimate the cost to reach the goal, allowing it to prioritize promising paths while ensuring optimality.

## Key Features:
- **Time Complexity**: O(b^d), where b is the branching factor and d is the depth of the optimal solution.
- **Space Complexity**: O(b^d) due to maintaining the open and closed lists.
- Guarantees optimal paths if an admissible heuristic is used.

## Applications:
- Robotics for navigation and movement planning.
- Game development for AI character movement.
- GPS systems for route finding.
- Network routing protocols.

# Code in Python

```python
import heapq

def a_star(graph, start, goal):
    # Create a priority queue
    open_set = []
    heapq.heappush(open_set, (0, start))
    
    came_from = {}
    g_score = {node: float('inf') for node in graph}
    g_score[start] = 0
    
    f_score = {node: float('inf') for node in graph}
    f_score[start] = heuristic(start, goal)
    
    while open_set:
        current = heapq.heappop(open_set)[1]
        
        if current == goal:
            return reconstruct_path(came_from, current)
        
        for neighbor in graph[current]:
            tentative_g_score = g_score[current] + graph[current][neighbor]
            
            if tentative_g_score < g_score[neighbor]:
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g_score
                f_score[neighbor] = g_score[neighbor] + heuristic(neighbor, goal)
                
                if neighbor not in [i[1] for i in open_set]:
                    heapq.heappush(open_set, (f_score[neighbor], neighbor))
    
    return []

def heuristic(node, goal):
    # Implement a heuristic function (e.g., Manhattan distance, Euclidean distance)
    pass

def reconstruct_path(came_from, current):
    total_path = [current]

    while current in came_from:
        current = came_from[current]
        total_path.append(current)
    return total_path[::-1]
```
# Code in Java
```java
import java.util.*;

class Node {
    int x, y;
    double g, h;
    Node parent;

    public double f() {
        return g + h;
    }
}

public class AStar {
    public static double heuristic(Node a, Node b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)); // Euclidean distance
    }

    public static List<Node> getNeighbors(Node node) {
        return Arrays.asList(
            new Node(node.x + 1, node.y, 0, 0, null),
            new Node(node.x - 1, node.y, 0, 0, null),
            new Node(node.x, node.y + 1, 0, 0, null),
            new Node(node.x, node.y - 1, 0, 0, null)
        );
    }

    public static List<Node> aStar(Node start, Node goal) {
        PriorityQueue<Node> openList = new PriorityQueue<>(Comparator.comparingDouble(Node::f));
        Set<Node> closedList = new HashSet<>();

        start.g = 0;
        start.h = heuristic(start, goal);
        openList.add(start);

        while (!openList.isEmpty()) {
            Node currentNode = openList.poll();

            if (currentNode.x == goal.x && currentNode.y == goal.y) {
                List<Node> path = new ArrayList<>();
                for (Node n = currentNode; n != null; n = n.parent) {
                    path.add(n);
                }
                Collections.reverse(path);
                return path;
            }

            closedList.add(currentNode);

            for (Node neighbor : getNeighbors(currentNode)) {
                if (closedList.contains(neighbor))
                    continue;

                double tentativeG = currentNode.g + 1; // Assuming a cost of 1 for movement

                if (tentativeG < neighbor.g || neighbor.g == 0) {
                    neighbor.g = tentativeG;
                    neighbor.h = heuristic(neighbor, goal);
                    neighbor.parent = currentNode;

                    openList.add(neighbor);
                }
            }
        }
        return Collections.emptyList(); // Return empty if no path found
    }
}
```
## Time Complexity
The time complexity of A* search algorithm depends on the heuristic used. In the worst case, it can be 
𝑂(𝑏𝑑), where 𝑏 is the branching factor and 
𝑑 is the depth of the solution.

## Space Complexity
The space complexity is 𝑂(𝑏𝑑) as well, since the open list can potentially store all nodes in the search space.

## Conclusion 
The A* search algorithm is a versatile and efficient pathfinding algorithm that effectively balances between cost and heuristic information to find the shortest path. Its performance can vary significantly based on the choice of the heuristic function, making it crucial to choose one that accurately estimates the distance to the goal.