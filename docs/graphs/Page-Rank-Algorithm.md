---
id: page-rank-algorithm
title: PageRank Algorithm
sidebar_label: PageRank Algorithm
description: "In this blog post, we'll explore the PageRank algorithm, a method used to rank web pages based on their link structure."
tags: [dsa, algorithms, graphs, page rank]
---

### Definition:

The **PageRank algorithm** is a **link analysis algorithm** developed by Larry Page and Sergey Brin, which is used to determine the importance of web pages based on their link structure. The algorithm assigns a numerical value (PageRank score) to each page, indicating its relative importance, with higher scores indicating more important pages.

### Characteristics:

- **Graph-Based Algorithm**:

  - The PageRank algorithm treats the web as a directed graph where nodes represent web pages and directed edges represent hyperlinks between them.

- **Random Surfer Model**:

  - The algorithm is based on the concept of a random surfer who randomly clicks on links. The likelihood of landing on a page is influenced by the number and quality of inbound links to that page.

- **Damping Factor**:

  - A damping factor (usually set to around 0.85) is used to model the probability that a user continues clicking on links, with a chance of jumping to a random page. This prevents the score from being skewed by a small number of highly connected pages.

- **Iterative Calculation**:
  - The PageRank scores are calculated iteratively, updating the scores based on the ranks of inbound pages until convergence is achieved.

### Time Complexity:

- **Time Complexity: O(N \* I)**
  The time complexity of the PageRank algorithm is O(N \* I), where N is the number of nodes (pages) and I is the number of iterations until convergence.

### Space Complexity:

- **Space Complexity: O(N)**
  The algorithm requires additional space for storing PageRank scores and adjacency information, leading to a space complexity of O(N).

### Python Implementation:

```python
# Adjacency matrix representation of the graph
adjacency_matrix = [[0, 1, 1], [0, 0, 1], [1, 0, 0]]


class Node:
    def __init__(self, name):
        self.name = name               # Name of the node
        self.inbound_nodes = []        # Links coming to this node
        self.outbound_nodes = []       # Links going from this node

    def add_inbound(self, node):
        """Add a node to the inbound list."""
        self.inbound_nodes.append(node)

    def add_outbound(self, node):
        """Add a node to the outbound list."""
        self.outbound_nodes.append(node)

    def __repr__(self):
        """Return a string representation of the node."""
        return f"<Node(name={self.name}, inbound={self.inbound_nodes}, outbound={self.outbound_nodes})>"


def page_rank(nodes, iterations=3, damping_factor=0.85):
    """
    Calculate the PageRank of each node in the graph.
    """
    ranks = {node.name: 1 for node in nodes}  # Initialize ranks

    outbound_count = {node.name: len(node.outbound_nodes) for node in nodes}  # Count of outbound links

    for i in range(iterations):
        print(f"======= Iteration {i + 1} =======")
        for node in nodes:
            # Calculate new rank based on inbound nodes
            rank_sum = sum(ranks[inbound_node] / outbound_count[inbound_node] for inbound_node in node.inbound_nodes)
            ranks[node.name] = (1 - damping_factor) + damping_factor * rank_sum
        print(f"Current Ranks: {ranks}")  # Print current rank values


def main():
    # Prompt user for node names
    node_names = input("Enter Names of the Nodes (space-separated): ").split()

    nodes = [Node(name) for name in node_names]  # Create Node objects

    # Establish inbound and outbound relationships based on the adjacency matrix
    for row_index, row in enumerate(adjacency_matrix):
        for col_index, value in enumerate(row):
            if value == 1:  # If there is a link
                nodes[col_index].add_inbound(node_names[row_index])
                nodes[row_index].add_outbound(node_names[col_index])

    print("======= Nodes =======")
    for node in nodes:
        print(node)

    # Calculate and display PageRank values
    page_rank(nodes)


if __name__ == "__main__":
    main()
```

### Java Implementation:

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Node {
    int name; // Unique identifier for the node
    ArrayList<Integer> inbound_nodes = new ArrayList<>(); // Links coming to this node
    ArrayList<Integer> outbound_nodes = new ArrayList<>(); // Links going from this node

    public Node(int name) {
        this.name = name; // Node name
    }

    public void add_inbound(int node) {
        inbound_nodes.add(node);
    }

    public void add_outbound(int node) {
        outbound_nodes.add(node);
    }

    @Override
    public String toString() {
        return "Node{name=" + name + ", inbound_nodes=" + inbound_nodes + ", outbound_nodes=" + outbound_nodes + "}";
    }
}

public class Main {

    // PageRank calculation function
    public static void pageRank(ArrayList<Node> nodes, int iterations, double dampingFactor) {
        // Initialize ranks: all nodes start with rank 1
        Map<Integer, Double> ranks = new HashMap<>();
        for (Node node : nodes) {
            ranks.put(node.name, 1.0);
        }

        // Count of outbound links for each node
        Map<Integer, Integer> outboundCount = new HashMap<>();
        for (Node node : nodes) {
            outboundCount.put(node.name, node.outbound_nodes.size());
        }

        for (int i = 0; i < iterations; i++) {
            System.out.println("======= Iteration " + (i + 1) + " =======");
            Map<Integer, Double> newRanks = new HashMap<>();

            for (Node node : nodes) {
                double rankSum = 0.0;

                for (int inboundNodeName : node.inbound_nodes) {
                    if (outboundCount.get(inboundNodeName) != 0) {
                        rankSum += ranks.get(inboundNodeName) / outboundCount.get(inboundNodeName);
                    }
                }

                double newRank = (1 - dampingFactor) + dampingFactor * rankSum;
                newRanks.put(node.name, newRank);
            }

            ranks = newRanks;
            System.out.println("Current Ranks: " + ranks);
        }
    }

    public static void main(String[] args) {
        ArrayList<ArrayList<Integer>> adjacencyMatrix = new ArrayList<>();
        adjacencyMatrix.add(new ArrayList<>(Arrays.asList(0, 1, 1)));
        adjacencyMatrix.add(new ArrayList<>(Arrays.asList(0, 0, 1)));
        adjacencyMatrix.add(new ArrayList<>(Arrays.asList(1, 0, 0)));

        // Initialize nodes
        ArrayList<Node> nodes = new ArrayList<>();
        for (int i = 0; i < adjacencyMatrix.size(); i++) {
            nodes.add(new Node(i));
        }

        // Populate inbound and outbound links based on the adjacency matrix
        for (int rowIndex = 0; rowIndex < adjacencyMatrix.size(); rowIndex++) {
            for (int colIndex = 0; colIndex < adjacencyMatrix.get(rowIndex).size(); colIndex++) {
                if (adjacencyMatrix.get(rowIndex).get(colIndex) == 1) {
                    nodes.get(rowIndex).add_outbound(colIndex);
                    nodes.get(colIndex).add_inbound(rowIndex);
                }
            }
        }

        System.out.println("======= Nodes =======");
        for (Node node : nodes) {
            System.out.println(node);
        }

        // Calculate and display PageRank values
        pageRank(nodes, 3, 0.85);
    }
}
```

#### Output:

```Output
======= Nodes =======
Node{name=0, inbound_nodes=[2], outbound_nodes=[1, 2]}
Node{name=1, inbound_nodes=[0], outbound_nodes=[2]}
Node{name=2, inbound_nodes=[0, 1], outbound_nodes=[0]}
======= Iteration 1 =======
Current Ranks: {0=1.0, 1=0.575, 2=1.4249999999999998}
======= Iteration 2 =======
Current Ranks: {0=1.3612499999999996, 1=0.575, 2=1.06375}
======= Iteration 3 =======
Current Ranks: {0=1.0541874999999998, 1=0.7285312499999999, 2=1.2172812499999996}
```

### Summary:

The PageRank algorithm is an essential tool for determining the importance of web pages based on their link structure. By modeling the browsing behavior of users and using a damping factor, the algorithm effectively ranks pages while minimizing the impact of less relevant pages. It has numerous applications in search engines and network analysis, making it a foundational algorithm in the field of data science and information retrieval.
