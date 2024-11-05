---
id: fenwick-tree
title: "Introduction to Fenwick Tree (Binary Indexed Tree)"
sidebar_label: "Fenwick Tree"
sidebar_position: 1
description: "Information on Fenwick Tree (Binary Indexed Tree) Algorithm"
tags: [Algorithm, Fenwick Tree, Binary Indexed Tree]
---

# Fenwick Tree (Binary Indexed Tree)
## Overview
The Fenwick Tree, also known as a Binary Indexed Tree (BIT), is a data structure used for efficiently calculating prefix sums and updating elements. It offers a significant performance boost when dealing with cumulative frequency tables, making it ideal for scenarios where frequent updates and prefix sum queries are required.

## Use Cases
- **Efficient Range Queries**: Commonly used in situations where range sums and point updates are frequent.
- **Inversion Counting in Arrays**: Used in competitive programming to count inversions in arrays.
- **Data Compression**: Supports cumulative frequency counting, which helps in data compression algorithms.
- **2D Queries**: Fenwick Trees can also be extended to 2D data structures, allowing applications in grid-based problems.

## Algorithm Details
### Key Concepts
1. **Binary Indexed Representation**: Fenwick Trees leverage binary representation for efficient sum and update operations.
2. **Operations**:
   - **Update**: Modify the value of a specific element.
   - **Query**: Compute the cumulative sum up to a specific index.

### Time Complexity
- Both update and query operations are `O(log N)` where `N` is the number of elements, due to the logarithmic depth of the tree.

## Pseudocode

```cpp
// Function to add 'val' to index 'i' (1-based index)
function update(i, val):
    while i <= n:
        BITree[i] += val
        i += (i & -i)

// Function to get sum from index 1 to i (1-based index)
function getSum(i):
    sum = 0
    while i > 0:
        sum += BITree[i]
        i -= (i & -i)
    return sum
```

## Example Code in C++
Here’s a C++ implementation of the Fenwick Tree:

```cpp
#include <iostream>
#include <vector>
using namespace std;

class FenwickTree {
private:
    vector<int> BITree;
    int n;

public:
    // Initialize Fenwick Tree with n elements
    FenwickTree(int size) {
        n = size;
        BITree.resize(n + 1, 0);
    }

    // Update index 'i' with value 'val'
    void update(int i, int val) {
        while (i <= n) {
            BITree[i] += val;
            i += (i & -i);
        }
    }

    // Get cumulative sum from index 1 to 'i'
    int getSum(int i) {
        int sum = 0;
        while (i > 0) {
            sum += BITree[i];
            i -= (i & -i);
        }
        return sum;
    }

    // Get sum from index 'l' to 'r'
    int rangeSum(int l, int r) {
        return getSum(r) - getSum(l - 1);
    }
};

int main() {
    FenwickTree ft(10);
    ft.update(3, 5);   // Update index 3 with +5
    ft.update(5, 2);   // Update index 5 with +2
    cout << "Sum from 1 to 5: " << ft.getSum(5) << endl;
    cout << "Range Sum from 3 to 5: " << ft.rangeSum(3, 5) << endl;
    return 0;
}
```

## Explanation of the Code
- Update Operation: Updates the tree from a specific index by propagating the change to subsequent indices using i += (i & -i).
- Query Operation: Accumulates the sum of elements up to a specific index by traversing backward using i -= (i & -i).
- Range Sum Query: To compute the sum between two indices l and r, the difference of sums up to r and l-1 is used.

## Example Walkthrough
Suppose we have an array of integers and initialize the Fenwick Tree with zeroes. For each update and query operation, the tree adjusts only the necessary indices, significantly improving efficiency.

## Real-World Example
In competitive programming and applications dealing with real-time data processing, such as live leaderboard rankings or real-time transaction data, Fenwick Trees provide a fast and memory-efficient way to maintain cumulative values.
