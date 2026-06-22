---
id: maximum-ice-cream-bars
title: "Maximum Ice Cream Bars"
sidebar_label: Maximum Ice Cream Bars
description: "Finding the maximum number of ice cream bars that can be bought with a given amount of coins using a greedy approach."
tags: [DSA, leetcode, array, greedy, sorting]
---

## Description:

It is a sweltering summer day, and a boy wants to buy some ice cream bars.

At the store, there are `n` ice cream bars. You are given an array `costs` of length `n`, where `costs[i]` is the price of the `i-th` ice cream bar in coins. The boy initially has `coins` coins to spend, and he wants to buy as many ice cream bars as possible. 

Return the **maximum** number of ice cream bars the boy can buy with `coins` coins.

**Note:** The boy can buy the ice cream bars in any order.

**Example 1:**

Input: `costs = [1,3,2,4,1]`, `coins = 7`
Output: `4`
**Explanation:** The boy can buy ice cream bars at indices 0, 1, 2, 4 for a total price of 1 + 3 + 2 + 1 = 7.

**Example 2:**

Input: `costs = [10,6,8,7,7,8]`, `coins = 5`
Output: `0`
**Explanation:** The boy cannot afford any of the ice cream bars.

**Example 3:**

Input: `costs = [1,6,3,1,2,5]`, `coins = 20`
Output: `6`
**Explanation:** The boy can buy all the ice cream bars for a total price of 1 + 6 + 3 + 1 + 2 + 5 = 18.

---

## Approaches:

### 1. Greedy Approach with Sorting

To maximize the total *number* of items we can buy with a limited budget, we should always prioritize the cheapest items first. This is a classic greedy strategy. 

1. **Sort the Array:** Sort the `costs` array in ascending order. This places the cheapest ice cream bars at the beginning of the array.
2. **Iterate and Subtract:** Loop through the sorted array. For each ice cream bar, check if we have enough `coins` left.
3. **Count:** If we do, subtract the cost from our `coins` and increment our ice cream count. If we don't have enough coins for the current bar, we can immediately `break` out of the loop, because all subsequent bars will only be more expensive.

### Complexity
* **Time Complexity:** $O(N \log N)$ where $N$ is the number of elements in the `costs` array. The dominant operation is sorting the array. The subsequent linear scan takes $O(N)$ time.
* **Space Complexity:** $O(1)$ or $O(N)$ depending on the language's built-in sorting algorithm. Modifying the array in-place keeps auxiliary space complexity minimal (e.g., $O(\log N)$ for quicksort variants).

---

## Solutions:

### C++
#include <vector>
#include <algorithm>

class Solution {
public:
    int maxIceCream(std::vector<int>& costs, int coins) {
        // Sort the costs to pick the cheapest ones first
        std::sort(costs.begin(), costs.end());
        
        int count = 0;
        for (int cost : costs) {
            // If we have enough coins, buy it
            if (coins >= cost) {
                coins -= cost;
                count++;
            } else {
                // If we can't afford this one, we can't afford any of the rest
                break;
            }
        }
        
        return count;
    }
};
```

### Java
```java
import java.util.Arrays;

class Solution {
    public int maxIceCream(int[] costs, int coins) {
        // Sort the costs to pick the cheapest ones first
        Arrays.sort(costs);
        
        int count = 0;
        for (int cost : costs) {
            // If we have enough coins, buy it
            if (coins >= cost) {
                coins -= cost;
                count++;
            } else {
                // If we can't afford this one, we can't afford any of the rest
                break;
            }
        }
        
        return count;
    }
}
```

### Python
```py
class Solution:
    def maxIceCream(self, costs: list[int], coins: int) -> int:
        # Sort the costs to pick the cheapest ones first
        costs.sort()
        
        count = 0
        for cost in costs:
            # If we have enough coins, buy it
            if coins >= cost:
                coins -= cost
                count += 1
            else:
                # If we can't afford this one, we can't afford any of the rest
                break
                
        return count
```

### JavaScript
```js
/**
 * @param {number[]} costs
 * @param {number} coins
 * @return {number}
 */
const maxIceCream = function(costs, coins) {
    // Sort the costs to pick the cheapest ones first (ascending order)
    costs.sort((a, b) => a - b);
    
    let count = 0;
    for (let cost of costs) {
        // If we have enough coins, buy it
        if (coins >= cost) {
            coins -= cost;
            count++;
        } else {
            // If we can't afford this one, we can't afford any of the rest
            break;
        }
    } 
    
    return count;
};
```