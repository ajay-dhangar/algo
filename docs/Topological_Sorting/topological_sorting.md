# Topological Sorting in C++

Topological sorting is an ordering of vertices in a **directed acyclic graph (DAG)** such that for every directed edge `u -> v`, vertex `u` comes before `v` in the ordering. It is particularly useful in scenarios where we need to determine a sequence of tasks or processes with dependencies.

## 1. What is Topological Sorting?
**Topological Sorting** is a linear ordering of vertices in a directed acyclic graph (DAG) where each directed edge `u -> v` implies that `u` comes before `v` in the ordering. It is only possible for DAGs (Directed Acyclic Graphs) because any cycle would prevent defining a consistent order.

## 2. Where to Use Topological Sorting?
Topological sorting is used in scenarios with dependency constraints, such as:
- **Course prerequisites**: Finding an order to take courses given some courses depend on others.
- **Task scheduling**: Scheduling tasks with dependencies, where some tasks need to be completed before others.
- **Build systems**: In build dependencies (e.g., Maven, Gradle), determining the order of compiling files with dependencies on each other.

## 3. How to Use Topological Sorting?
Topological sorting can be performed using two main approaches:
- **DFS (Depth-First Search)**: By performing DFS and adding nodes to the stack after visiting all its adjacent nodes.
- **Kahn's Algorithm (BFS)**: Using in-degrees of nodes, iteratively remove nodes with no incoming edges.

## 4. Applications of Topological Sorting
- **Dependency resolution**: To solve dependency issues in task scheduling, package installation, etc.
- **Compilation order**: In compilers, where certain files need to be compiled before others based on dependencies.
- **Project management**: For task planning where some tasks can only begin after others.

## Sample Code for Topological Sorting using DFS in C++

Here’s how to implement topological sorting using DFS in C++:

```cpp
#include <iostream>
#include <list>
#include <stack>
#include <vector>

class Graph {
    int vertices;  // Number of vertices
    std::list<int> *adj;  // Pointer to an array containing adjacency lists

public:
    // Constructor
    Graph(int vertices) {
        this->vertices = vertices;
        adj = new std::list<int>[vertices];
    }

    // Method to add an edge to the graph
    void addEdge(int u, int v) {
        adj[u].push_back(v);
    }

    // Helper method for topological sorting using DFS
    void topologicalSortUtil(int v, std::vector<bool> &visited, std::stack<int> &Stack) {
        visited[v] = true;  // Mark the current node as visited

        // Recur for all adjacent vertices
        for (int neighbor : adj[v]) {
            if (!visited[neighbor])
                topologicalSortUtil(neighbor, visited, Stack);
        }

        // Push current vertex to stack after visiting all adjacent vertices
        Stack.push(v);
    }

    // Main function to perform topological sort
    std::vector<int> topologicalSort() {
        std::stack<int> Stack;
        std::vector<bool> visited(vertices, false);  // Mark all vertices as not visited

        // Call the recursive helper function for each unvisited vertex
        for (int i = 0; i < vertices; i++) {
            if (!visited[i])
                topologicalSortUtil(i, visited, Stack);
        }

        // Store the sorted order
        std::vector<int> sortedOrder;
        while (!Stack.empty()) {
            sortedOrder.push_back(Stack.top());
            Stack.pop();
        }
        return sortedOrder;
    }
};

int main() {
    Graph graph(6);  // Example with 6 vertices
    graph.addEdge(5, 2);
    graph.addEdge(5, 0);
    graph.addEdge(4, 0);
    graph.addEdge(4, 1);
    graph.addEdge(2, 3);
    graph.addEdge(3, 1);

    std::cout << "Topological Sort of the given graph:\n";
    std::vector<int> sortedOrder = graph.topologicalSort();
    for (int v : sortedOrder)
        std::cout << v << " ";
    std::cout << std::endl;

    return 0;
}


