---
id: a-star
title: A* Algorithm
sidebar_label: A* Algorithm
description: "In this blog post, we'll explore the A* Algorithm, a powerful pathfinding and graph traversal algorithm that efficiently finds the shortest path from a starting node to a target node. By combining the strengths of Dijkstra's algorithm and greedy best-first search, A* uses heuristics to prioritize paths, making it widely used in applications such as game development and robotics."
tags: [dsa, algorithms, pathfinding]
---

# A* Algorithm

## Introduction

The A* (A-star) algorithm is a popular and powerful pathfinding and graph traversal algorithm used in computer science, robotics, and artificial intelligence. It efficiently finds the shortest path from a starting node to a target node by combining the strengths of Dijkstra's algorithm and greedy best-first search. A* uses a heuristic to estimate the cost from the current node to the goal, allowing it to prioritize paths that are likely to lead to the shortest route.

## Implementation

The A* algorithm operates by maintaining a priority queue of nodes to be explored. The key steps involved in the implementation are:

1. **Initialize**:
   - Create an open list (priority queue) to store nodes that need to be evaluated.
   - Create a closed list to store nodes that have already been evaluated.
   - Initialize the starting node with a cost of zero.

2. **Evaluate Nodes**:
   - While there are nodes in the open list:
     - Retrieve the node with the lowest total cost (f = g + h), where:
       - \( g \) is the cost from the start node to the current node.
       - \( h \) is the heuristic estimated cost from the current node to the goal.
     - If this node is the goal, reconstruct and return the path.
     - Otherwise, evaluate its neighbors and update their costs.

3. **Update Costs**:
   - For each neighbor:
     - Calculate tentative \( g \) cost.
     - If this path is better than any previously recorded path, update costs and add the neighbor to the open list.

## Code in Java

Here’s a sample implementation of the A* algorithm in Java:

```java
import java.util.*;

class Node implements Comparable<Node> {
    int x, y;
    double gCost; // Cost from start node
    double hCost; // Heuristic cost
    double fCost; // Total cost
    Node parent;

    public Node(int x, int y) {
        this.x = x;
        this.y = y;
    }

    @Override
    public int compareTo(Node other) {
        return Double.compare(this.fCost, other.fCost);
    }
}

public class AStarAlgorithm {
    private static final int[][] DIRECTIONS = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}}; // Up, Right, Down, Left

    public static List<Node> aStar(Node start, Node goal, int[][] grid) {
        PriorityQueue<Node> openList = new PriorityQueue<>();
        boolean[][] closedList = new boolean[grid.length][grid.length];

        start.gCost = 0;
        start.hCost = heuristic(start, goal);
        start.fCost = start.gCost + start.hCost;
        openList.add(start);

        while (!openList.isEmpty()) {
            Node current = openList.poll();
            if (current.equals(goal)) {
                return reconstructPath(current);
            }

            closedList[current.x][current.y] = true;

            for (int[] direction : DIRECTIONS) {
                int newX = current.x + direction;
                int newY = current.y + direction;

                if (isValid(newX, newY, grid) && !closedList[newX][newY]) {
                    Node neighbor = new Node(newX, newY);
                    double tentativeGCost = current.gCost + 1; // Assuming uniform cost for simplicity

                    if (tentativeGCost < neighbor.gCost || !openList.contains(neighbor)) {
                        neighbor.gCost = tentativeGCost;
                        neighbor.hCost = heuristic(neighbor, goal);
                        neighbor.fCost = neighbor.gCost + neighbor.hCost;
                        neighbor.parent = current;

                        if (!openList.contains(neighbor)) {
                            openList.add(neighbor);
                        }
                    }
                }
            }
        }
        return Collections.emptyList(); // No path found
    }

    private static double heuristic(Node a, Node b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); // Manhattan distance
    }

    private static boolean isValid(int x, int y, int[][] grid) {
        return x >= 0 && x < grid.length && y >= 0 && y < grid.length && grid[x][y] == 0; // 0 represents walkable cell
    }

    private static List<Node> reconstructPath(Node goal) {
        List<Node> path = new ArrayList<>();
        for (Node at = goal; at != null; at = at.parent) {
            path.add(at);
        }
        Collections.reverse(path);
        return path;
    }

    public static void main(String[] args) {
        int[][] grid = {
            {0, 0, 0, 0},
            {1, 1, 0, 1},
            {0, 0, 0, 0},
            {0, 1, 1, 0}
        };

        Node start = new Node(0, 0);
        Node goal = new Node(2, 3);
        
        List<Node> path = aStar(start, goal, grid);
        
        System.out.println("Path from start to goal:");
        for (Node node : path) {
            System.out.println("(" + node.x + ", " + node.y + ")");
        }
    }
}
```

## Time Complexity and Space Complexity

### Time Complexity

The time complexity of the A* algorithm is \( O(E) \), where \( E \) is the number of edges. In practice, this can vary based on the heuristic used and how many nodes are explored.

### Space Complexity

The space complexity is also \( O(E) \), as it stores all nodes in memory during execution.

## Points to Remember

1. **Heuristic Function**: The choice of heuristic significantly affects performance; common heuristics include Manhattan distance and Euclidean distance.
2. **Optimality**: A* is guaranteed to find an optimal solution if the heuristic is admissible (never overestimates).
3. **Applications**: Widely used in AI for game development and robotics for navigation tasks.
4. **Trade-offs**: Balances between Dijkstra's exhaustive search and greedy best-first search efficiency.
5. **Grid-Based Pathfinding**: Particularly effective in grid-based systems where movement costs are uniform.