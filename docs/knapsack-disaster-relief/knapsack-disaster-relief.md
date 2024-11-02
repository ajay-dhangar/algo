---
id: knapsack-disaster-relief
title: "Optimizing Disaster Relief Supply Packing"
sidebar_label: "Knapsack for Disaster Relief"
sidebar_position: 1
description: "Solving the 0/1 Knapsack problem to optimize the packing of supplies for disaster relief missions."
tags: [Knapsack, Dynamic Programming, Disaster Relief, Algorithms]
---

In real-world scenarios, the 0/1 Knapsack Problem can help optimize packing decisions for disaster relief missions. The aim is to maximize the total priority of supplies (such as food, medical kits, and blankets) that can be loaded onto a truck with a limited weight capacity.

<AdsComponent />

## Problem Description

As a member of a disaster relief team, you need to pack a truck with supplies while adhering to a weight limit `W`. There are several types of supplies available, each with:

- **Weight:** The weight of the supply item.
- **Priority score:** An importance score reflecting how critical the supply is for the mission (e.g., medical supplies are prioritized over blankets).

The goal is to maximize the total priority score of the supplies loaded into the truck without exceeding the weight limit.

### Input

- `W` (integer): The maximum weight capacity of the truck.
- A list of `n` supply items, where each item is defined by:
  - `weight[i]`: The weight of the `i`-th supply.
  - `value[i]`: The priority score of the `i`-th supply.

### Output

- The maximum achievable total priority score for the supplies packed within the weight limit.

### Example Scenario

Consider a scenario where the truck's weight limit is **50 kg**, and the available supplies are:

1. Supply 1: Weight = 10 kg, Priority Score = 60
2. Supply 2: Weight = 20 kg, Priority Score = 100
3. Supply 3: Weight = 30 kg, Priority Score = 120

You cannot pack all three supplies because their combined weight (10 + 20 + 30 = 60 kg) exceeds the truck's capacity. The optimal choice would be to pack supplies 2 and 3, resulting in a total weight of 50 kg and a maximum priority score of **220**.

<Ads />

## Algorithm and Solution

The 0/1 Knapsack Problem can be solved efficiently using **Dynamic Programming**. Here's an implementation in C++.

### C++ Code

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Function to solve the 0/1 Knapsack Problem
int knapsack(int W, vector<int>& weights, vector<int>& values, int n) {
    // Create a 2D array to store the maximum priority score for each subproblem
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    // Build the table in a bottom-up manner
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (weights[i - 1] <= w) {
                // Choose the maximum between not including the current item and including it
                dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            } else {
                // If the item's weight exceeds the current weight limit, don't include it
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // Return the maximum priority score for the given weight limit
    return dp[n][W];
}

int main() {
    int W = 50;
    vector<int> weights = {10, 20, 30};
    vector<int> values = {60, 100, 120};
    int n = weights.size();

    // Output the result
    cout << "Maximum priority score: " << knapsack(W, weights, values, n) << endl;
    return 0;
}
```

### Code Explanation

1. **Dynamic Programming Table:**
   - A 2D array `dp[n+1][W+1]` is used to store the maximum priority score achievable for each subproblem.
   - The first dimension represents the number of items considered, and the second represents the weight capacity from 0 to `W`.

2. **Decision Making:**
   - For each item, the algorithm checks if its weight is less than or equal to the current weight limit `w`.
   - If so, it decides whether to include the item by comparing:
     - The maximum score when excluding the item (same as before).
     - The score when including the item (adding its priority score and reducing the available capacity).

3. **Result:**
   - The final answer, which is the maximum achievable priority score, is stored in `dp[n][W]`.
  
### Optimised Approach 

By using a 1D array, we reduce the space complexity to 𝑂(𝑊). Instead of maintaining a table of size `𝑛×𝑊`, we can maintain a single array `dp[W+1]`, updating it from right to left.

### C++ Code 

``` cpp
#include <iostream>
#include <vector>
using namespace std;

// Optimized 0/1 Knapsack Solution with 1D DP array
int knapsack(int W, vector<int>& weights, vector<int>& values, int n) {
    // Create a 1D array to store the maximum priority score for each weight limit
    vector<int> dp(W + 1, 0);

    // Build the array in a bottom-up manner
    for (int i = 0; i < n; i++) {
        // Update the dp array from right to left to avoid overwriting the results
        for (int w = W; w >= weights[i]; w--) {
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }

    // Return the maximum priority score for the given weight limit
    return dp[W];
}

int main() {
    int W = 50;
    vector<int> weights = {10, 20, 30};
    vector<int> values = {60, 100, 120};
    int n = weights.size();

    // Output the result
    cout << "Maximum priority score: " << knapsack(W, weights, values, n) << endl;
    return 0;
}
```
### Code Explanation

1. **1D Array:**
   - We use a 1D array dp of size `W+1` instead of a 2D array.

2. **Right-to-Left Update:**
   - For each item, we iterate through the weight limit W to weights[i] (from right to left). This is to avoid overwriting values in dp that are needed for the current iteration.

3. **Efficiency:**
   - This reduces space complexity from `𝑂(𝑛𝑊)` to `𝑂(𝑊)`, while still keeping the same time complexity `𝑂(𝑛𝑊)`.
