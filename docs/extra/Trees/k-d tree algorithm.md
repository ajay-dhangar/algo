---
id: kd-tree
title: K-D Tree
sidebar_label: K-D Tree
sidebar_position: 3
description: "A K-D Tree is a space-partitioning data structure for organizing points in a k-dimensional space."
tags: [Data Structures, K-D Tree, Algorithms]
---

# K-D Tree

## Overview
A **K-D Tree** (short for k-dimensional tree) is a space-partitioning data structure used for organizing points in a k-dimensional space. K-D Trees are useful for various applications such as range searches and nearest neighbor searches. They are a generalization of binary search trees to multiple dimensions.

## Features
- **Space Partitioning**: Divides the space into nested half-spaces.
- **Efficient Searches**: Supports efficient range and nearest neighbor searches.
- **Balanced Structure**: Can be balanced to ensure efficient operations.

## Table of Contents
- [How It Works](#how-it-works)
- [Operations](#operations)
  - [Insertion](#insertion)
  - [Deletion](#deletion)
  - [Search](#search)
  - [Nearest Neighbor Search](#nearest-neighbor-search)
- [Code Example](#code-example)
- [Applications](#applications)
- [Time Complexity](#time-complexity)

## How It Works
In a K-D Tree:
- Each node represents a k-dimensional point.
- The tree alternates between the k dimensions at each level of the tree.
- The root node splits the space into two half-spaces based on the first dimension, the children of the root split based on the second dimension, and so on.

### Construction
1. **Choose Axis**: Select the axis based on the depth of the node modulo k.
2. **Sort Points**: Sort the points based on the chosen axis.
3. **Median Point**: Choose the median point to ensure balanced partitions.
4. **Recursively Construct**: Recursively construct the left and right subtrees using the points before and after the median.

## Operations

### Insertion
To insert a new point:
1. Start at the root and choose the axis based on the depth.
2. Compare the point with the current node's point based on the chosen axis.
3. Recursively insert the point into the left or right subtree based on the comparison.

### Deletion
To delete a point:
1. Find the node containing the point.
2. Replace the node with a suitable candidate from its subtrees to maintain the K-D Tree properties.
3. Recursively adjust the tree to ensure balance.

### Search
To search for a point:
1. Start at the root and choose the axis based on the depth.
2. Compare the point with the current node's point based on the chosen axis.
3. Recursively search the left or right subtree based on the comparison.

### Nearest Neighbor Search
To find the nearest neighbor:
1. Start at the root and traverse the tree to find the leaf node closest to the target point.
2. Backtrack and check if there are closer points in the other half-spaces.
3. Use a priority queue to keep track of the closest points found.

## Code Example

### Python Example (K-D Tree):

```python
class Node:
    def __init__(self, point, axis, left=None, right=None):
        self.point = point
        self.axis = axis
        self.left = left
        self.right = right

class KDTree:
    def __init__(self, points):
        self.k = len(points[0]) if points else 0
        self.root = self.build_tree(points, depth=0)

    def build_tree(self, points, depth):
        if not points:
            return None

        axis = depth % self.k
        points.sort(key=lambda x: x[axis])
        median = len(points) // 2

        return Node(
            point=points[median],
            axis=axis,
            left=self.build_tree(points[:median], depth + 1),
            right=self.build_tree(points[median + 1:], depth + 1)
        )

    def insert(self, root, point, depth=0):
        if root is None:
            return Node(point, depth % self.k)

        axis = root.axis
        if point[axis] < root.point[axis]:
            root.left = self.insert(root.left, point, depth + 1)
        else:
            root.right = self.insert(root.right, point, depth + 1)

        return root

    def search(self, root, point, depth=0):
        if root is None or root.point == point:
            return root

        axis = root.axis
        if point[axis] < root.point[axis]:
            return self.search(root.left, point, depth + 1)
        else:
            return self.search(root.right, point, depth + 1)

    def nearest_neighbor(self, root, point, depth=0, best=None):
        if root is None:
            return best

        axis = root.axis
        next_best = None
        next_branch = None

        if best is None or self.distance(point, root.point) < self.distance(point, best.point):
            next_best = root
        else:
            next_best = best

        if point[axis] < root.point[axis]:
            next_branch = root.left
            other_branch = root.right
        else:
            next_branch = root.right
            other_branch = root.left

        next_best = self.nearest_neighbor(next_branch, point, depth + 1, next_best)

        if self.distance(point, next_best.point) > abs(point[axis] - root.point[axis]):
            next_best = self.nearest_neighbor(other_branch, point, depth + 1, next_best)

        return next_best

    def distance(self, point1, point2):
        return sum((x - y) ** 2 for x, y in zip(point1, point2)) ** 0.5

# Example usage:
points = [(2, 3), (5, 4), (9, 6), (4, 7), (8, 1), (7, 2)]
kd_tree = KDTree(points)

# Insert a new point
kd_tree.insert(kd_tree.root, (3, 6))

# Search for a point
result = kd_tree.search(kd_tree.root, (5, 4))
print("Found:", result.point if result else "Not found")

# Find the nearest neighbor
nearest = kd_tree.nearest_neighbor(kd_tree.root, (9, 2))
print("Nearest neighbor:", nearest.point if nearest else "None")
```

### Output:
```
Found: (5, 4)
Nearest neighbor: (8, 1)
```

## Applications
- **Databases**: Used for maintaining sorted data in databases where frequent insertions and deletions are required.
- **Memory Management**: Efficiently manage free memory blocks in systems.
- **Auto-completion**: Used in applications that require predictive text suggestions.

## Time Complexity

| Operation            | Average Time | Worst Case Time |
|----------------------|--------------|-----------------|
| **Search**           | O(log n)     | O(n)            |
| **Insertion**        | O(log n)     | O(n)            |
| **Deletion**         | O(log n)     | O(n)            |
| **Nearest Neighbor** | O(log n)     | O(n)            |

> **Note**: The worst-case time complexity arises in unbalanced cases; balanced K-D Trees maintain an average of O(log n) for most operations.

## Conclusion
K-D Trees are powerful data structures for organizing and searching points in multi-dimensional spaces. They are essential for applications that require efficient spatial searches and nearest neighbor queries.
---