---
id: fractional-knapsack-2
title: Fractional Knapsack Problem 2
sidebar_label: Fractional Knapsack 
description: "In this blog post, we'll explore the Fractional Knapsack Problem, a greedy algorithm used to maximize the value of items that can be carried in a knapsack with a weight limit." 
tags: [dsa, algorithms, greedy algorithms, knapsack problem, javascript, c++]
---


### Definition:

The Fractional Knapsack Problem is a variation of the classic knapsack problem where we can take fractions of an item. The objective is to maximize the total value of items carried in a knapsack with a given capacity. In contrast to the 0/1 Knapsack Problem, where you must either take the entire item or leave it, the fractional knapsack allows you to take any portion of an item.

### Characteristics:

- **Greedy Approach**:
  The greedy approach selects items based on their value-to-weight ratio, taking as much of the item as possible starting with the one that has the highest ratio, until the knapsack reaches its capacity.
  To solve the Fractional Knapsack Problem, we use the greedy approach with the value-to-weight ratio as the heuristic:
1. **Sort Items by Value-to-Weight Ratio:**
  For each item, compute the ratio `v_i / w_i` (value divided by weight). Sort the items in decreasing order of this ratio. Items with a higher value-to-weight ratio will be selected first, as they offer the most value per unit of weight.
2. **Select Items Greedily:**
  Start with the item that has the highest value-to-weight ratio and add it to the knapsack. If the item fits entirely, include it. If it doesn't, take the fraction of the item that fits in the remaining capacity of the knapsack. Continue this process until the knapsack is full or no more items can be added.

- **Fractional Items**:
  - Unlike the 0/1 knapsack, where only whole items can be taken, here fractions of items are allowed. If an item cannot be entirely included, a fraction of it is added proportional to the remaining capacity.

- **Unbounded Solution**:
  - This problem allows for the selection of the most valuable fractions of items, leading to the optimal solution in a greedy manner.

### Problem Statement:

You are given `N` items, each with a given weight `w_i` and value `v_i`, and a knapsack with a maximum capacity `W`. The objective is to maximize the total value of the items placed in the knapsack. However, in the Fractional Knapsack Problem, you are allowed to take fractions of an item. Your goal is to find the optimal way to fill the knapsack to maximize the total value without exceeding the capacity `W`.

### Time Complexity:

- **Best, Average, and Worst Case: $O(N log N)$**  
The dominant operation is sorting the items based on their value-to-weight ratio, which takes $O(N log N)$, where N is the number of items.

### Space Complexity:

- **Space Complexity: $O(N)$**  
Space is required for the list of items and auxiliary data structures for sorting, resulting in $O(N)$ space complexity.

### Example:

Consider the following example where we have three items:

- Item 1: Value = 60, Weight = 10
- Item 2: Value = 100, Weight = 20
- Item 3: Value = 120, Weight = 30
The capacity of the knapsack is `W = 50`.

Step-by-Step Execution:

1.  Value-to-Weight Ratios:
- Item 1: `60/10=6`
- Item 2: `100/20=5`
- Item 3: `120/30=4`

2. Sort by Ratios:
Based on the value-to-weight ratio, the items are already sorted as:
- Item 1 (ratio = 6)
- Item 2 (ratio = 5)
- Item 3 (ratio = 4)

3. Add Items to the Knapsack:
- Item 1: Add the whole item since its weight is 10, which is less than the knapsack's remaining capacity (50). Total weight now = 10, total value = 60.
- Item 2: Add the whole item since its weight is 20. Total weight now = 30, total value = 160.
- Item 3: Only 20 units of weight can be added (since the remaining capacity is 20). So, we take a fraction of Item 3:
`Value added from Item 3 = 120/30 × 20 = 80`
Total weight now = 50, total value = 240.

Thus, the maximum value that can be obtained is 240.

### C++ Implementation:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Item {
    int value, weight;
    Item(int value, int weight) : value(value), weight(weight) {}
};

bool compare(Item a, Item b) {
    double r1 = (double)a.value / a.weight;
    double r2 = (double)b.value / b.weight;
    return r1 > r2;
}

double fractionalKnapsack(int W, vector<Item>& items) {
    sort(items.begin(), items.end(), compare);

    int currentWeight = 0;
    double totalValue = 0.0;

    for (Item item : items) {
        if (currentWeight + item.weight <= W) {
            currentWeight += item.weight;
            totalValue += item.value;
        } else {
            int remainingWeight = W - currentWeight;
            totalValue += item.value * ((double)remainingWeight / item.weight);
            break;
        }
    }

    return totalValue;
}

int main() {
    int W = 50; // Capacity of knapsack
    vector<Item> items = {
        {60, 10}, {100, 20}, {120, 30}
    };

    double maxValue = fractionalKnapsack(W, items);
    cout << "Maximum value we can obtain: " << maxValue << endl;

    return 0;
}
```

### JavaScript Implementation
```js
class Item {
    constructor(value, weight) {
        this.value = value;
        this.weight = weight;
    }
}

// Comparison function to sort items based on value/weight ratio
function compare(a, b) {
    let r1 = a.value / a.weight;
    let r2 = b.value / b.weight;
    return r1 > r2 ? -1 : 1;
}

// Function to calculate the maximum value we can obtain in the fractional knapsack problem
function fractionalKnapsack(W, items) {
    items.sort(compare); // Sort items by value/weight ratio

    let currentWeight = 0;
    let totalValue = 0.0;

    for (let item of items) {
        if (currentWeight + item.weight <= W) {
            currentWeight += item.weight;
            totalValue += item.value;
        } else {
            let remainingWeight = W - currentWeight;
            totalValue += item.value * (remainingWeight / item.weight);
            break;
        }
    }

    return totalValue;
}

// Example Usage
let W = 50; // Capacity of the knapsack
let items = [
    new Item(60, 10),
    new Item(100, 20),
    new Item(120, 30)
];

let maxValue = fractionalKnapsack(W, items);
console.log("Maximum value we can obtain: " + maxValue);

```

### Summary:

The Fractional Knapsack Problem is a classic example of a greedy algorithm. It efficiently maximizes the value of the items that can be carried in the knapsack by selecting items based on their value-to-weight ratio. This algorithm is especially useful when fractional items can be taken and provides the optimal solution with a time complexity of $O(N log N)$. The fractional knapsack finds applications in resource allocation, budget management, and similar optimization problems.
