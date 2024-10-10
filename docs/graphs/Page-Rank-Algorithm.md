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

- **Time Complexity: O(N * I)**
  The time complexity of the PageRank algorithm is O(N * I), where N is the number of nodes (pages) and I is the number of iterations until convergence.

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

### Summary:

The PageRank algorithm is an essential tool for determining the importance of web pages based on their link structure. By modeling the browsing behavior of users and using a damping factor, the algorithm effectively ranks pages while minimizing the impact of less relevant pages. It has numerous applications in search engines and network analysis, making it a foundational algorithm in the field of data science and information retrieval.
