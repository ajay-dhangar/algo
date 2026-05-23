---
id: greedy-algorithms-2
title: Greedy Algorithms
sidebar_label: Greedy Algorithms
sidebar_position: 1
description: Greedy algorithms are a class of algorithms that make the optimal choice at each step with the hope of finding the global optimum
tags: [Competitive Programming, greedy approach, optimization]
---
# Greedy Algorithms - Theory

## Introduction

Greedy algorithms are a paradigm for solving optimization problems. The main idea behind a greedy algorithm is to make a sequence of choices, each of which looks the best at the moment. It chooses the optimal solution at every step with the hope that these local optimal choices will lead to a global optimal solution.

Unlike dynamic programming, where you solve every subproblem and then combine the solutions to form the optimal solution for the entire problem, greedy algorithms directly pick what seems to be the best option at each decision point.

### Beginner-Friendly Explanation

A Greedy Algorithm solves a problem step by step.  
At every step, it chooses the option that looks best at that moment.

The main goal is to find an optimal solution quickly by making local best choices.

### Real-Life Example

Imagine you have limited money and want to buy the maximum number of chocolates.

A greedy approach would pick the cheapest chocolate first, then the next cheapest, and so on.  
This strategy tries to maximize the total number of chocolates you can buy.

### Characteristics of Greedy Algorithms

1. **Greedy Choice Property**: A globally optimal solution can be arrived at by making locally optimal choices. The algorithm assumes that by choosing the optimal solution at each step, the overall solution will be optimal.
   
2. **Optimal Substructure**: A problem has an optimal substructure if an optimal solution to the problem can be constructed efficiently from optimal solutions of its subproblems. This is necessary for a greedy algorithm to be valid.

3. **Non-Overlapping Subproblems**: Greedy algorithms generally work well when subproblems don’t overlap (like in dynamic programming), which allows making decisions based only on local information.

### How Greedy Algorithms Work

- **Step 1: Greedy Choice**: At each step, choose the best possible option available. This is a local optimization.
- **Step 2: Reduce Problem Size**: After making the choice, reduce the problem size. The remaining subproblem must also satisfy the properties of the greedy approach.
- **Step 3: Repeat**: Repeat the greedy choice step until the problem is reduced to a simple base case.

### Applications of Greedy Algorithms

Greedy algorithms are applied to a variety of problems, especially in optimization scenarios:

1. **Activity Selection Problem**: Selecting the maximum number of activities that don't overlap.
2. **Huffman Coding**: A compression algorithm used for lossless data compression.
3. **Kruskal's and Prim's Algorithm**: Used to find the Minimum Spanning Tree (MST) in a graph.
4. **Dijkstra's Algorithm**: Used to find the shortest path from one source to all other vertices in a graph.

### Dry Run Example

#### Problem:
Select the maximum number of non-overlapping activities.

| Activity | Start Time | End Time |
|----------|------------|----------|
| A | 1 | 3 |
| B | 2 | 5 |
| C | 4 | 6 |
| D | 6 | 8 |

#### Greedy Approach:
1. Select the activity that finishes earliest.
2. Choose the next activity whose start time is greater than or equal to the previously selected activity's end time.

#### Step-by-Step Selection:
- Select A (1,3)
- Skip B because it overlaps with A
- Select C (4,6)
- Select D (6,8)

#### Final Answer:
Selected Activities → A, C, D

### Time and Space Complexity (Activity Selection)

| Operation | Complexity |
|-----------|------------|
| Sorting | O(n log n) |
| Selection Process | O(n) |
| Overall Time Complexity | O(n log n) |
| Space Complexity | O(1) |


### Advantages of Greedy Algorithms

1. **Simple to Implement**: Greedy algorithms are generally easier to code and understand because they follow a straightforward approach.
2. **Efficient**: They tend to run faster compared to other algorithms like dynamic programming due to their simple structure.
3. **Optimal Solutions (if applicable)**: For certain problems, greedy algorithms do give an optimal solution.

### Limitations

- **Not Always Optimal**: Greedy algorithms do not guarantee an optimal solution for all problems. In some cases, they might only provide a suboptimal solution.
- **Problem-Specific**: Greedy algorithms work well for problems with specific properties, like the greedy choice property and optimal substructure. Without these properties, greedy algorithms may fail to find the best solution.

### Greedy vs. Dynamic Programming

| **Feature**              | **Greedy Algorithm**                          | **Dynamic Programming**                           |
|--------------------------|------------------------------------------------|---------------------------------------------------|
| **Choice**                | Greedy algorithms make a local optimal choice | DP solves all subproblems and combines solutions. |
| **Structure**             | No overlapping subproblems                    | Overlapping subproblems are recomputed.           |
| **Use**                   | Simple and efficient for specific problems    | Used for complex problems where greedy fails.     |
| **Examples**              | Kruskal's MST, Huffman Coding, Dijkstra's     | Longest Common Subsequence, Matrix Chain Multiplication |

### When Greedy Algorithms Fail

Greedy algorithms do not always produce the optimal solution.

For example, in the Coin Change problem, a greedy approach may fail for certain coin systems.

Suppose the available coins are:
1, 3, and 4

To make the value 6:
- Greedy choice: 4 + 1 + 1 = 3 coins
- Optimal solution: 3 + 3 = 2 coins

This shows that choosing the locally best option does not always lead to the globally best solution.

### Conclusion

Greedy algorithms are an efficient approach to solving many problems. However, their applicability is limited to problems that satisfy specific properties like the greedy choice property and optimal substructure. If these properties are absent, dynamic programming or other algorithms should be considered.
