---
id: fractional-knapsack
title: "Fractional Knapsack Algorithm"
sidebar_label: "Fractional Knapsack"
description: "In this blog post, we'll explore the Fractional Knapsack problem, a greedy algorithm-based approach to maximize the value of items within a weight limit by taking fractions of items."
tags: [dsa, algorithms, greedy algorithms]
---

The Fractional Knapsack problem is an optimization problem where, given a set of items with specified weights and values, the goal is to maximize the total value within a weight limit by taking fractions of items. The greedy algorithm for this problem prioritizes items based on their value-to-weight ratio, allowing partial items to be selected if they maximize the overall value.

<Ads />

## Characteristics:

### Greedy Approach:
The algorithm selects items based on the highest value-to-weight ratio first. This ensures that the item providing the most value per unit weight is prioritized.

### Optimal Solution:
The greedy approach is optimal for the fractional knapsack problem, as allowing fractional parts of items enables us to maximize the value without exceeding the weight limit.

### Steps Involved:
Calculate Value-to-Weight Ratio:
For each item, calculate the ratio of value to weight. This ratio will be used to prioritize item selection.

### Sort Items by Ratio:
Sort all items in descending order of their value-to-weight ratios to ensure the item providing the most value per unit weight is selected first.

### Select Items Based on Weight Capacity:
Traverse the sorted items, adding them fully if their weight doesn't exceed the remaining capacity. If an item’s weight is too large, take only a fraction of it to fill the remaining capacity.

## Problem Statement:
Given a knapsack with a weight limit of W and a list of items, each with a value vi and weight wi, maximize the total value by selecting items (or fractions thereof) without exceeding W.

## Time Complexity:
Best, Average, and Worst Case: $O(n \log n)$
Where n is the number of items. Sorting items by their value-to-weight ratio takes O(n \log n) time.

## Space Complexity:
Space Complexity: $O(n)$
Space is required to store item information and ratios.

**Example:**
Consider a knapsack with a weight limit of W = 50 and the following items:

Items: {(value: 60, weight: 10), (value: 100, weight: 20), (value: 120, weight: 30)}
Sorted by ratio: {(value: 60, weight: 10), (value: 100, weight: 20), (value: 120, weight: 30)}
Step-by-Step Execution:

Add item with weight 10 (value-to-weight ratio 6):
Total weight = 10, total value = 60.

Add item with weight 20 (value-to-weight ratio 5):
Total weight = 30, total value = 160.

Add 2/3 of item with weight 30 (value-to-weight ratio 4):
Total weight = 50, total value = 240.

Total Value: 240

<Ads />

**C++ Implementation:**

```
cpp

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Structure to represent an item
struct Item {
    int value, weight;
};

// Comparator function to sort items by value-to-weight ratio
bool compare(Item a, Item b) {
    double r1 = (double)a.value / a.weight;
    double r2 = (double)b.value / b.weight;
    return r1 > r2;
}

// Function to perform fractional knapsack
double fractionalKnapsack(int W, vector<Item>& items) {
    // Sort items by descending value-to-weight ratio
    sort(items.begin(), items.end(), compare);

    int curWeight = 0;
    double finalValue = 0.0;

    for (auto item : items) {
        if (curWeight + item.weight <= W) {
            // If the item can be added fully
            curWeight += item.weight;
            finalValue += item.value;
        } else {
            // Take fraction of the item to fill the remaining capacity
            int remainingWeight = W - curWeight;
            finalValue += item.value * ((double)remainingWeight / item.weight);
            break;
        }
    }
    return finalValue;
}

int main() {
    int W = 50; // Weight limit of the knapsack
    vector<Item> items = { {60, 10}, {100, 20}, {120, 30} };

    cout << "Maximum value we can obtain = " << fractionalKnapsack(W, items);
    return 0;
}
```

<Ads />

**Java Implementation:**

```
java

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

class Item {
    int value, weight;

    Item(int value, int weight) {
        this.value = value;
        this.weight = weight;
    }
}

public class FractionalKnapsack {

    // Comparator to sort items by value-to-weight ratio
    static class ItemComparator implements Comparator<Item> {
        public int compare(Item a, Item b) {
            double r1 = (double) a.value / a.weight;
            double r2 = (double) b.value / b.weight;
            return Double.compare(r2, r1);
        }
    }

    // Function to perform fractional knapsack
    public static double fractionalKnapsack(int W, List<Item> items) {
        Collections.sort(items, new ItemComparator());

        int curWeight = 0;
        double finalValue = 0.0;

        for (Item item : items) {
            if (curWeight + item.weight <= W) {
                // Add full item
                curWeight += item.weight;
                finalValue += item.value;
            } else {
                // Add fraction of item
                int remainingWeight = W - curWeight;
                finalValue += item.value * ((double) remainingWeight / item.weight);
                break;
            }
        }
        return finalValue;
    }

    public static void main(String[] args) {
        int W = 50; // Knapsack weight limit
        List<Item> items = new ArrayList<>();
        items.add(new Item(60, 10));
        items.add(new Item(100, 20));
        items.add(new Item(120, 30));

        System.out.println("Maximum value we can obtain = " + fractionalKnapsack(W, items));
    }
}
```

**Summary:**
The Fractional Knapsack algorithm maximizes the total value of items in a knapsack with a weight limit by selecting items (or fractions of them) based on their value-to-weight ratio. This approach is widely applicable in resource allocation, inventory management, and financial investments. While the 0/1 knapsack problem is NP-complete, the fractional variant is solvable in polynomial time, making it efficient and optimal. The greedy algorithm ensures the maximum possible value within the given constraints.
