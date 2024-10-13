---
id: fenwick-tree
sidebar_position: 3
title: Fenwick Tree (Binary Indexed Tree)
sidebar_label: Fenwick Tree
description: "Fenwick Tree (Binary Indexed Tree) is a more space-efficient data structure for cumulative frequency tables."
tags: [fenwick tree, binary indexed tree, advance data structures]
---

# Fenwick Tree (Binary Indexed Tree)

The **Fenwick Tree**, also known as the **Binary Indexed Tree (BIT)**, is a data structure that provides efficient methods for maintaining cumulative frequency tables. It allows for both updates and prefix sum calculations to be performed in logarithmic time.

## Purpose

The Fenwick Tree is used in situations where you need to efficiently perform the following operations:

- **Update**: Update an element in the array.
- **Query**: Calculate the sum of elements from the start of the array to a given index.

It is particularly useful in scenarios involving cumulative frequency tables, such as in statistical computations, game score calculations, and in various algorithms requiring range queries.

## Operations

1. **Update**: Increment an element at a specific index by a given value.
2. **Query**: Compute the sum of the elements from the start of the array to a given index.

## Time Complexity

- **Time Complexity**: O(log n) for both update and query operations, where n is the number of elements in the array.

## Space Complexity

- **Space Complexity**: O(n) for storing the tree, where n is the number of elements.

## Implementations

### C++

```cpp
#include <iostream>
#include <vector>
using namespace std;

class FenwickTree {
    vector<int> tree;
    int n;

public:
    FenwickTree(int size) {
        n = size;
        tree.resize(n + 1, 0);
    }

    void update(int index, int value) {
        for (; index <= n; index += index & -index) {
            tree[index] += value;
        }
    }

    int query(int index) {
        int sum = 0;
        for (; index > 0; index -= index & -index) {
            sum += tree[index];
        }
        return sum;
    }
};
```
### Java
```java
class FenwickTree {
    private int[] tree;
    private int n;

    public FenwickTree(int size) {
        n = size;
        tree = new int[n + 1];
    }

    public void update(int index, int value) {
        for (; index <= n; index += index & -index) {
            tree[index] += value;
        }
    }

    public int query(int index) {
        int sum = 0;
        for (; index > 0; index -= index & -index) {
            sum += tree[index];
        }
        return sum;
    }
}
```
### Python
```python
class FenwickTree:
    def __init__(self, size):
        self.size = size
        self.tree = [0] * (size + 1)

    def update(self, index, value):
        while index <= self.size:
            self.tree[index] += value
            index += index & -index

    def query(self, index):
        sum = 0
        while index > 0:
            sum += self.tree[index]
            index -= index & -index
        return sum
```
### Pseudo Code
```
function FenwickTree(size):
    tree = array of size (size + 1)
    initialize all elements to 0

function update(index, value):
    while index <= size:
        tree[index] += value
        index += index & -index

function query(index):
    sum = 0
    while index > 0:
        sum += tree[index]
        index -= index & -index
    return sum
```
### Conclusion
The Fenwick Tree (Binary Indexed Tree) is a powerful data structure for efficiently managing cumulative frequency tables and performing range queries. Its ability to update and query sums in logarithmic time makes it a valuable tool in various algorithmic applications.