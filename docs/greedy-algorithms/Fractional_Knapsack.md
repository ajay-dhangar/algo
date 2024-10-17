
---
id: fractional-knapsack  
title: Fractional Knapsack Problem  
sidebar_label: Fractional Knapsack  
description: "In this post, we'll explore the Fractional Knapsack Problem, a greedy algorithm used to maximize the value of items that can be fit into a knapsack with a weight limit."  
tags: [dsa, algorithms, greedy algorithms, optimization problems]
---

### Definition:
The Fractional Knapsack Problem is an optimization problem that aims to maximize the total value of items placed in a knapsack of fixed capacity, where the items can be divided into smaller fractions. Unlike the 0/1 Knapsack Problem, where items must either be fully taken or left, in the fractional version, parts of an item can be taken to fill the knapsack optimally.

### Characteristics:
- **Greedy Approach**:  
  The fractional knapsack problem is solved using a greedy algorithm. Items are selected based on their value-to-weight ratio, prioritizing items with the highest ratio until the knapsack is full.

- **Divisibility**:  
  In this problem, items can be broken into smaller pieces, meaning you can take fractions of an item if it helps in maximizing the total value.

### Steps Involved:
1. **Sort by Value-to-Weight Ratio**:  
   First, sort the items in decreasing order of their value-to-weight ratio.
   
2. **Greedily Add Items**:  
   Starting from the item with the highest ratio, add as much of it as possible to the knapsack.
   
3. **Fractional Item Addition**:  
   If an item can't fit entirely, add the fraction of it that fits, and stop when the knapsack is full.

### Problem Statement:
Given `n` items, each with a weight and value, determine the maximum value that can be obtained by filling a knapsack with a capacity of `W` using the fractional approach.

### Time Complexity:
- **Best, Average, and Worst Case: $O(n \log n)$**  
  The time complexity is dominated by the sorting step, where `n` is the number of items.

### Space Complexity:
- **Space Complexity: $O(n)$**  
  The space complexity arises from storing the weights, values, and fractions of the items.

### Example:
Consider the following items:
- Items: `{(value, weight)} = {(60, 10), (100, 20), (120, 30)}`
- Knapsack capacity: `W = 50`

Step-by-Step Execution:

1. **Sort by value-to-weight ratio**:
   - Item 1: `60/10 = 6`
   - Item 2: `100/20 = 5`
   - Item 3: `120/30 = 4`
   Sorted order: Item 1, Item 2, Item 3.

2. **Add items to knapsack**:
   - Add all of Item 1 (weight 10, value 60).
   - Add all of Item 2 (weight 20, value 100).
   - Add 2/3 of Item 3 (weight 20, value 80).

Total value = 60 + 100 + 80 = 240.

### C++ Implementation:
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Item {
    int value, weight;
    Item(int v, int w) : value(v), weight(w) {}
};

// Comparator function to sort by value-to-weight ratio
bool compare(Item a, Item b) {
    double r1 = (double)a.value / a.weight;
    double r2 = (double)b.value / b.weight;
    return r1 > r2;
}

double fractionalKnapsack(int W, vector<Item>& items) {
    sort(items.begin(), items.end(), compare);
    double totalValue = 0.0;

    for (Item& item : items) {
        if (W >= item.weight) {
            totalValue += item.value;
            W -= item.weight;
        } else {
            totalValue += item.value * ((double) W / item.weight);
            break;
        }
    }
    return totalValue;
}

int main() {
    int W = 50;
    vector<Item> items = {{60, 10}, {100, 20}, {120, 30}};
    cout << "Maximum value in Knapsack = " << fractionalKnapsack(W, items);
    return 0;
}
```

### Summary:
The Fractional Knapsack Problem is an efficient optimization problem that can be solved using a greedy approach. By selecting items with the highest value-to-weight ratio, the total value in the knapsack can be maximized. This algorithm is useful in resource allocation and financial investments where fractional quantities are allowed.
